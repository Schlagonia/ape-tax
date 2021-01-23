import yVaultV2 from './abi/yVaultV2.json'
import LidoVault from './abi/LidoVault.json'

// Main config file for common parameters
export default Object.freeze({
    'yusdcidle' : { // route path
        TITLE: "USDc Idle",
        LOGO: "🏆🚀",
        VAULT_ABI: yVaultV2,
        VAULT_TYPE: 'yearn',
        VAULT_ADDR: "0x33bd0f9618cf38fea8f7f01e1514ab63b9bde64b",
        WANT_ADDR: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        WANT_SYMBOL: "USDC",
        COINGECKO_SYMBOL: "usd-coin",
        VAULT_DEV : "emilianobonassi",
        BLOCK_ACTIVATED: 1606599919,
    },
    'devhugger' : {
        TITLE: "DEV Hugger",
        LOGO: "👾🤗",
        VAULT_ABI: yVaultV2,
        VAULT_TYPE: 'yearn',
        VAULT_ADDR: "0xFeD651936Af7e98F7F2A93c03B1E28a2DA7dfaD4",
        WANT_ADDR: "0x5cAf454Ba92e6F2c929DF14667Ee360eD9fD5b26",
        WANT_SYMBOL: "DEV",
        COINGECKO_SYMBOL: "dev",
        VAULT_DEV : "devprtcl",
        BLOCK_ACTIVATED: 1606599919,
    },
    'apetrumpet' : {
        TITLE: "apeTrump(et)",
        LOGO: "🦧🎺",
        VAULT_ABI: yVaultV2,
        VAULT_TYPE: 'experiment',
        VAULT_ADDR: "0xba81fb02d5e7b94b341e82d1959c372590b852be",
        WANT_ADDR: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        WANT_SYMBOL: "nTrump",
        COINGECKO_SYMBOL: "nTrump",
        VAULT_DEV : "arbingsam",
        BLOCK_ACTIVATED: 1606599919,
    },
    'icecreath2' : {
        TITLE: "iceCREATH2",
        LOGO: "🍦TH2",
        VAULT_ABI: yVaultV2,
        VAULT_TYPE: 'yearn',
        VAULT_ADDR: "0x20Eb2A369b71C29FC4aFCddBbc1CAB66CCfcB062",
        WANT_ADDR: "0xcBc1065255cBc3aB41a6868c22d1f1C573AB89fd",
        WANT_SYMBOL: "CRETH2",
        COINGECKO_SYMBOL: "CRETH2",
        VAULT_DEV : "arbingsam",
        BLOCK_ACTIVATED: 1606599919,
        VAULT_STATUS: "withdraw",
    },
    'zzzvault' : {
        TITLE: "zLOT yVault",
        LOGO: "💤🌖",
        VAULT_ABI: yVaultV2,
        VAULT_TYPE: 'yearn',
        VAULT_ADDR: "0xCA6C9fB742071044247298Ea0dBd60b77586e1E8",
        WANT_ADDR: "0xA8e7AD77C60eE6f30BaC54E2E7c0617Bd7B5A03E",
        WANT_SYMBOL: "zLOT",
        COINGECKO_SYMBOL: "zLOT",
        VAULT_DEV : "macarse",
        BLOCK_ACTIVATED: 1606599919,
    },
    'sushirocket' : {
        TITLE: "yvSushi YFI-ETH",
        LOGO: "🍣🍬",
        VAULT_ABI: yVaultV2,
        VAULT_TYPE: 'yearn',
        VAULT_ADDR: "0x27Eb83254D900AB4F9b15d5652d913963FeC35e3",
        WANT_ADDR: "0x088ee5007C98a9677165D78dD2109AE4a3D04d0C",
        WANT_SYMBOL: "SLP",
        COINGECKO_SYMBOL: "SLP",
        VAULT_DEV : "andy8052",
        BLOCK_ACTIVATED: 1606599919,
    },
    'daihard' : {
        TITLE: "DAI Hard yVault",
        LOGO: "🏅💪",
        VAULT_ABI: yVaultV2,
        VAULT_TYPE: 'yearn',
        VAULT_ADDR: "0xBFa4D8AA6d8a379aBFe7793399D3DdaCC5bBECBB",
        WANT_ADDR: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        WANT_SYMBOL: "DAI",
        COINGECKO_SYMBOL: "DAI",
        VAULT_DEV : "arbingsam",
        BLOCK_ACTIVATED: 1606599919,
        VAULT_STATUS: "use_production",
    },
    'usdc' : {
        TITLE: "USd Coin yVault",
        LOGO: "🇺🇸🪙",
        VAULT_ABI: yVaultV2,
        VAULT_TYPE: 'yearn',
        VAULT_ADDR: "0xe2f6b9773bf3a015e2aa70741bde1498bdb9425b",
        WANT_ADDR: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        WANT_SYMBOL: "USDC",
        COINGECKO_SYMBOL: "USDC",
        VAULT_DEV : "arbingsam",
        BLOCK_ACTIVATED: 1606599919,
        VAULT_STATUS: "use_production",
    },
    'yvsteth' : {
        TITLE: "Lido St. Ether Vault",
        LOGO: "👼🏦",
        VAULT_ABI: LidoVault,
        VAULT_TYPE: 'experiment',
        VAULT_ADDR: "0x15a2B3CfaFd696e1C783FE99eed168b78a3A371e",
        WANT_ADDR: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
        WANT_SYMBOL: "stETH",
        COINGECKO_SYMBOL: "staked-ether",
        VAULT_DEV : "bantg",
        BLOCK_ACTIVATED: 1606599919,
    },
    'daiironbank' : {
        TITLE: "DAI Ironbank",
        LOGO: "🦾🏦",
        VAULT_ABI: yVaultV2,
        VAULT_TYPE: 'yearn',
        VAULT_ADDR: "0x07dbC20B84fF63F3cc542F6A22E5a71cbA5670A4",
        WANT_ADDR: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        WANT_SYMBOL: "DAI",
        COINGECKO_SYMBOL: "dai",
        VAULT_DEV : "arbingsam",
        BLOCK_ACTIVATED: 1606599919,
    },
    'wethmaker' : {
        TITLE: "WETH Maker",
        LOGO: "🖲🏰",
        VAULT_ABI: yVaultV2,
        VAULT_TYPE: 'yearn',
        VAULT_ADDR: "0x6392e8fa0588CB2DCb7aF557FdC9D10FDe48A325",
        WANT_ADDR: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        WANT_SYMBOL: "WETH",
        COINGECKO_SYMBOL: "WETH",
        VAULT_DEV : "orbxball",
        BLOCK_ACTIVATED: 1606599919,
    },
    'stecrv' : {
        TITLE: "st. Ether-ETH Pool",
        LOGO: "💧🎱",
        VAULT_ABI: yVaultV2,
        VAULT_TYPE: 'yearn',
        VAULT_ADDR: "0xdCD90C7f6324cfa40d7169ef80b12031770B4325",
        WANT_ADDR: "0x06325440D014e39736583c165C2963BA99fAf14E",
        WANT_SYMBOL: "steCRV",
        COINGECKO_SYMBOL: "ethereum",
        VAULT_DEV : "arbingsam",
        BLOCK_ACTIVATED: 1606599919,
    },
})