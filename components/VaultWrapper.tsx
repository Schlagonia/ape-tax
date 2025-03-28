import {type ReactElement, useCallback, useEffect, useState} from 'react';
import InfoMessage from 'components/InfoMessage';
import VaultActions from 'components/VaultActions';
import VaultDetails from 'components/VaultDetails';
import VaultStrategies from 'components/VaultStrategies';
import VaultWallet from 'components/VaultWallet';
import {ethers} from 'ethers';
import STRATEGY_V3_BASE_ABI from 'utils/ABI/tokenizedStrategyV3.abi';
import {YVAULT_ABI} from 'utils/ABI/yVaultv2.abi';
import {YVAULT_V3_BASE_ABI} from 'utils/ABI/yVaultV3Base.abi';
import {type ContractFunctionConfig, maxUint256} from 'viem';
import {erc20ABI, fetchBalance, multicall, readContract} from '@wagmi/core';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import {toAddress} from '@yearn-finance/web-lib/utils/address';
import {decodeAsBigInt} from '@yearn-finance/web-lib/utils/decoder';
import {formatToNormalizedValue, toNormalizedBN} from '@yearn-finance/web-lib/utils/format.bigNumber';
import {isZero} from '@yearn-finance/web-lib/utils/isZero';

import type {TCoinGeckoPrices} from 'schemas/coinGeckoSchemas';
import type {TVault, TVaultData} from 'utils/types';
import type {TNDict} from '@yearn-finance/web-lib/types';

const		defaultVaultData: TVaultData = {
	loaded: false,
	depositLimit: toNormalizedBN(0),
	totalAssets: toNormalizedBN(0),
	availableDepositLimit: toNormalizedBN(0),
	coinBalance: toNormalizedBN(0),
	balanceOf: toNormalizedBN(0),
	wantBalance: toNormalizedBN(0),
	allowance: toNormalizedBN(0),
	allowanceYRouter: toNormalizedBN(0),
	allowanceZapOut: toNormalizedBN(0),
	pricePerShare: toNormalizedBN(1),
	decimals: 18,
	totalAUM: 0,
	balanceOfValue: 0,
	wantPrice: 0,
	wantPriceError: false,
	progress:  0,
	apiVersion: '-'
};

function	VaultWrapper({vault, prices}: {vault: TVault; prices: TCoinGeckoPrices;}): ReactElement {
	const	{address, chainID} = useWeb3();
	const	[vaultData, set_vaultData] = useState<TVaultData>(defaultVaultData);

	const	prepareVaultData = useCallback(async (): Promise<void> => {
		if (!vault || !address) {
			return;
		}

		const calls: ContractFunctionConfig[] = [];
		const wantContractMultiCall = {
			address: toAddress(vault.WANT_ADDR),
			abi: erc20ABI
		};
		const vaultV2ContractMultiCall = {
			address: toAddress(vault.VAULT_ADDR),
			abi: YVAULT_ABI
		};
		const vaultV3ContractMultiCall = {
			address: toAddress(vault.VAULT_ADDR),
			abi: YVAULT_V3_BASE_ABI
		};
		const tokenizedStrategyContract = {address: toAddress(vault.VAULT_ADDR), abi: STRATEGY_V3_BASE_ABI};

		const	yearnRouterForChain = (process.env.YEARN_ROUTER as TNDict<string>)[vault.CHAIN_ID];
		const	allowanceSpender = vault.VAULT_ABI.startsWith('v3') ? yearnRouterForChain : vault.VAULT_ADDR;

		calls.push({...vaultV2ContractMultiCall, functionName: 'totalAssets'});
		calls.push({...vaultV2ContractMultiCall, functionName: 'pricePerShare'});
		calls.push({...vaultV2ContractMultiCall, functionName: 'decimals'});
		calls.push({...vaultV2ContractMultiCall, functionName: 'balanceOf', args: [address]});
		calls.push({...wantContractMultiCall, functionName: 'balanceOf', args: [address]});
		calls.push({...wantContractMultiCall, functionName: 'allowance', args: [address, allowanceSpender]});
		calls.push({...vaultV3ContractMultiCall, functionName: 'allowance', args: [address, yearnRouterForChain]});

		if (vault.VAULT_ABI.startsWith('v3')) {
			vault.VAULT_ABI === 'v3-vault' ?
				calls.push({...vaultV3ContractMultiCall, functionName: 'api_version'}) : // v3 vault
				calls.push({...tokenizedStrategyContract, functionName: 'apiVersion'}); // v3 strategy


			calls.push({...vaultV3ContractMultiCall, functionName: 'maxDeposit', args: [address]}); // === depositLimit
			calls.push({...vaultV3ContractMultiCall, functionName: 'maxDeposit', args: [address]}); // ok to have same in this case
		} else {
			calls.push({...vaultV2ContractMultiCall, functionName: 'apiVersion'});
			calls.push({...vaultV2ContractMultiCall, functionName: 'depositLimit'});
			calls.push({...vaultV2ContractMultiCall, functionName: 'availableDepositLimit'});
		}

		const callResult = await multicall({contracts: calls as never[], chainId: chainID});
		const totalAssets = decodeAsBigInt(callResult[0]);
		const pricePerShare = decodeAsBigInt(callResult[1]);
		const decimals = decodeAsBigInt(callResult[2]);
		const balanceOf = decodeAsBigInt(callResult[3]);
		const wantBalance = decodeAsBigInt(callResult[4]);
		const wantAllowance = decodeAsBigInt(callResult[5]);
		const allowanceYRouter = decodeAsBigInt(callResult[6]);
		const apiVersion = callResult[7].result as string;
		const depositLimit = decodeAsBigInt(callResult[8]) >= (maxUint256 - 1n) ?
			decodeAsBigInt(callResult[8]) : decodeAsBigInt(callResult[8]) + totalAssets;
		const availableDepositLimit = decodeAsBigInt(callResult[9]);

		const coinBalance = await fetchBalance({
			address: address
		});

		const	price = prices?.[vault.COINGECKO_SYMBOL.toLowerCase()]?.usd;
		const	numberDecimals = Number(decimals);

		set_vaultData({
			loaded: true,
			apiVersion: apiVersion,
			decimals: numberDecimals,
			depositLimit: toNormalizedBN(depositLimit, numberDecimals),
			totalAssets: toNormalizedBN(totalAssets, numberDecimals),
			availableDepositLimit: toNormalizedBN(availableDepositLimit, numberDecimals),
			pricePerShare: toNormalizedBN(pricePerShare, numberDecimals),
			coinBalance: toNormalizedBN(coinBalance.value, 18),
			balanceOf: toNormalizedBN(balanceOf, numberDecimals),
			balanceOfValue: Number((Number(ethers.utils.formatUnits(balanceOf, numberDecimals)) * Number(ethers.utils.formatUnits(pricePerShare, numberDecimals)) * price).toFixed(2) || 0),
			wantBalance: toNormalizedBN(wantBalance, numberDecimals),
			wantPrice: price,
			totalAUM: formatToNormalizedValue(totalAssets, numberDecimals) * price,
			progress: isZero(depositLimit) ? 1 : (Number(ethers.utils.formatUnits(depositLimit, numberDecimals)) - Number(ethers.utils.formatUnits(availableDepositLimit, numberDecimals))) / Number(ethers.utils.formatUnits(depositLimit, numberDecimals)),
			allowance: toNormalizedBN(wantAllowance, numberDecimals),
			allowanceYRouter: toNormalizedBN(allowanceYRouter, numberDecimals)
		});

		if (vault.ZAP_ADDR) {
			const allowanceZapOut = await readContract({
				abi: YVAULT_ABI,
				address: toAddress(vault.VAULT_ADDR),
				functionName: 'allowance',
				args: [address, toAddress(vault.ZAP_ADDR)]
			});
			set_vaultData((v): TVaultData => ({...v, allowanceZapOut: toNormalizedBN(allowanceZapOut, numberDecimals)}));
		}

	}, [vault, address, chainID, prices]);

	useEffect((): void => {
		prepareVaultData();
	}, [prepareVaultData]);

	useEffect((): void => {
		const	price = prices?.[vault.COINGECKO_SYMBOL.toLowerCase()]?.usd;
		set_vaultData((v): TVaultData => ({
			...v,
			wantPrice: price,
			wantPriceError: false,
			balanceOfValue: Number(v.balanceOf.normalized) * Number(v.pricePerShare.normalized) * price,
			totalAUM: Number(v.totalAssets.normalized) * price
		}));

	}, [prices, vault]);

	return (
		<div className={'mt-8 text-neutral-700'}>
			<div>
				<h1 className={'text-7xl leading-120px'}>{vault.LOGO}</h1>
				<h1 className={'text-3xl font-semibold text-neutral-900'}>{vault.TITLE}</h1>
			</div>
			<InfoMessage
				status={vault.VAULT_STATUS} />
			<VaultDetails
				vault={vault}
				vaultData={vaultData} />
			<VaultStrategies
				vault={vault}
				onUpdateVaultData={set_vaultData} />
			<VaultWallet
				vault={vault}
				vaultData={vaultData} />
			<VaultActions
				vault={vault}
				vaultData={vaultData}
				onUpdateVaultData={set_vaultData} />
		</div>
	);
}

export default VaultWrapper;
