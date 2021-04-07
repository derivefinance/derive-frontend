import daiLogo from "../assets/icons/dai.svg"
import renbtcLogo from "../assets/icons/renbtc.svg"
import deriveLogo from "../assets/icons/logo-dark.svg"
import sbtcLogo from "../assets/icons/ousd.svg"
import tbtcLogo from "../assets/icons/tbtc.svg"
import usdcLogo from "../assets/icons/usdc.svg"
import usdtLogo from "../assets/icons/usdt.svg"
import wbtcLogo from "../assets/icons/wbtc.svg"

export const NetworkContextName = "NETWORK"
export const BTC_POOL_NAME = "Oikos Pool"
export const STABLECOIN_POOL_NAME = "Stablecoin Pool"
export type PoolName = typeof BTC_POOL_NAME | typeof STABLECOIN_POOL_NAME

export enum ChainId {
  //MAINNET = 1,
  MAINNET = 56,
  //MAINNET = 1,
  // ROPSTEN = 3,
  // RINKEBY = 4,
  // GÖRLI = 5,
  // KOVAN = 42,
  HARDHAT = 31337,
}

export class Token {
  readonly addresses: { [chainId in ChainId]: string }
  readonly decimals: number
  readonly symbol: string
  readonly name: string
  readonly icon: string
  readonly geckoId: string

  constructor(
    addresses: { [chainId in ChainId]: string },
    decimals: number,
    symbol: string,
    geckoId: string,
    name: string,
    icon: string,
  ) {
    this.addresses = addresses
    this.decimals = decimals
    this.symbol = symbol
    this.geckoId = geckoId
    this.name = name
    this.icon = icon
  }
}

export const BLOCK_TIME = 15000

export const STABLECOIN_SWAP_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x6D963444F2a60bd13999F2C1B1DddA6a1a05a1F2",
  [ChainId.HARDHAT]: "0x856e4424f806D16E8CBC702B3c0F2ede5468eae5",
}

export const BTC_SWAP_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "",
  [ChainId.HARDHAT]: "0x0B306BF915C4d645ff596e518fAf3F9669b97016",
}

export const MERKLETREE_DATA: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "mainnetTestAccounts.json",
  [ChainId.HARDHAT]: "hardhat.json",
}

export const STABLECOIN_SWAP_TOKEN_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: "0x659A6C73Fb5c68Ab8ad4105B980a1f97a60c03C3",
  [ChainId.HARDHAT]: "0x63f84713F52422Af2F8E18b56703b0f80CCcCBcE",
}

export const BTC_SWAP_TOKEN_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: "",
  [ChainId.HARDHAT]: "0x524F04724632eED237cbA3c37272e018b3A7967e",
}

export const BTC_SWAP_TOKEN = new Token(
  BTC_SWAP_TOKEN_CONTRACT_ADDRESSES,
  18,
  "deriveOUSD",
  "deriveousd",
  "derive DAI/USDC/USDT/OUSD",
  deriveLogo,
)

export const STABLECOIN_SWAP_TOKEN = new Token(
  STABLECOIN_SWAP_TOKEN_CONTRACT_ADDRESSES,
  18,
  "deriveUSD",
  "deriveusd",
  "derive DAI/USDC/USDT",
  deriveLogo,
)

// Stablecoins
const DAI_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
  [ChainId.HARDHAT]: "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE",
}
export const DAI = new Token(
  DAI_CONTRACT_ADDRESSES,
  18,
  "DAI",
  "dai",
  "Dai",
  daiLogo,
)

const USDC_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
  [ChainId.HARDHAT]: "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c",
}
export const USDC = new Token(
  USDC_CONTRACT_ADDRESSES,
  18,
  "USDC",
  "usd-coin",
  "USDC Coin",
  usdcLogo,
)

const USDT_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x55d398326f99059fF775485246999027B3197955",
  [ChainId.HARDHAT]: "0x59b670e9fA9D0A427751Af201D676719a970857b",
}
export const USDT = new Token(
  USDT_CONTRACT_ADDRESSES,
  18,
  "USDT",
  "tether",
  "Tether",
  usdtLogo,
)

export const STABLECOIN_POOL_TOKENS = [DAI, USDC, USDT]

// Tokenized BTC
const TBTC_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "",
  [ChainId.HARDHAT]: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
}
export const TBTC = new Token(
  TBTC_CONTRACT_ADDRESSES,
  18,
  "TBTC",
  "tbtc",
  "tBTC",
  tbtcLogo,
)

const WBTC_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "",
  [ChainId.HARDHAT]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
}
export const WBTC = new Token(
  WBTC_CONTRACT_ADDRESSES,
  8,
  "WBTC",
  "wrapped-bitcoin",
  "WBTC",
  wbtcLogo,
)

const RENBTC_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "",
  [ChainId.HARDHAT]: "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e",
}
export const RENBTC = new Token(
  RENBTC_CONTRACT_ADDRESSES,
  8,
  "RENBTC",
  "renbtc",
  "renBTC",
  renbtcLogo,
)

const SBTC_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "",
  [ChainId.HARDHAT]: "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82",
}
export const SBTC = new Token(
  SBTC_CONTRACT_ADDRESSES,
  18,
  "SBTC",
  "sbtc",
  "sBTC",
  sbtcLogo,
)

const OUSD_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x6BF2Be9468314281cD28A94c35f967caFd388325",
  [ChainId.HARDHAT]: "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82",
}
export const OUSD = new Token(
  OUSD_CONTRACT_ADDRESSES,
  18,
  "OUSD",
  "ousd",
  "oUSD",
  sbtcLogo,
)

export const BTC_POOL_TOKENS = [DAI, USDC, USDT, OUSD]

// maps a symbol string to a token object
export const TOKENS_MAP: {
  [symbol: string]: Token
} = STABLECOIN_POOL_TOKENS.concat(BTC_POOL_TOKENS).reduce(
  (acc, token) => ({ ...acc, [token.symbol]: token }),
  {},
)

export const POOLS_MAP: {
  [poolName in PoolName]: {
    lpToken: Token
    poolTokens: Token[]
  }
} = {
  [BTC_POOL_NAME]: {
    lpToken: BTC_SWAP_TOKEN,
    poolTokens: BTC_POOL_TOKENS,
  },
  [STABLECOIN_POOL_NAME]: {
    lpToken: STABLECOIN_SWAP_TOKEN,
    poolTokens: STABLECOIN_POOL_TOKENS,
  },
}

export const TRANSACTION_TYPES = {
  DEPOSIT: "DEPOSIT",
  WITHDRAW: "WITHDRAW",
  SWAP: "SWAP",
}

export const POOL_FEE_PRECISION = 10

export const DEPLOYED_BLOCK: { [chainId in ChainId]: number } = {
  [ChainId.MAINNET]: 11656944,
  [ChainId.HARDHAT]: 0,
}

export const POOL_STATS_URL: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "https://ipfs.derive.exchange/pool-stats.json",
  [ChainId.HARDHAT]:
    "https://mehmeta-team-bucket.storage.fleek.co/pool-stats-dev.json",
}
