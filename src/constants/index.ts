import { BigNumber } from "@ethersproject/bignumber"
import daiLogo from "../assets/icons/dai.svg"
import deriveLogo from "../assets/icons/logo-dark.svg"
import renbtcLogo from "../assets/icons/renbtc.svg"
import sbtcLogo from "../assets/icons/sbtc.svg"
import tbtcLogo from "../assets/icons/tbtc.svg"
import usdcLogo from "../assets/icons/usdc.svg"
import usdtLogo from "../assets/icons/usdt.svg"
import wbtcLogo from "../assets/icons/wbtc.svg"

export const NetworkContextName = "NETWORK"
export const BTC_POOL_NAME = "BTC Pool"
export const STABLECOIN_POOL_NAME = "Stablecoin Pool"
export type PoolName = typeof BTC_POOL_NAME | typeof STABLECOIN_POOL_NAME

export enum ChainId {
  MAINNET = 56,
  TESTNET = 97,
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
  [ChainId.MAINNET]: "0xc4BA33879BcFbAbccF11627d2f60565Fc3c90Fe8",
  [ChainId.TESTNET]: "0xdeadbeef",
}

export const BTC_SWAP_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0xbe2E5b1Dc1d2c9aB38B505Aaee093a63db20550e",
  [ChainId.TESTNET]: "0xdeadbeef",
}

export const MERKLETREE_DATA: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "mainnetTestAccounts.json",
  [ChainId.TESTNET]: "hardhat.json",
}

export const STABLECOIN_SWAP_TOKEN_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: "0x2A61Fb982D829831743c712eE9A4Ab2ABe5FD6d5",
  [ChainId.TESTNET]: "0xdeadbeef",
}

export const BTC_SWAP_TOKEN_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: "0x84f82d2bF719fc3b721b4270bc349f0356345c2e",
  [ChainId.TESTNET]: "0xdeadbeef",
}

export const BTC_SWAP_TOKEN = new Token(
  BTC_SWAP_TOKEN_CONTRACT_ADDRESSES,
  18,
  "deriveBTC",
  "derivebtc",
  "derive BTC/RENBTC/OBTC",
  deriveLogo,
)

export const STABLECOIN_SWAP_TOKEN = new Token(
  STABLECOIN_SWAP_TOKEN_CONTRACT_ADDRESSES,
  18,
  "deriveUSD",
  "deriveusd",
  "derive DAI/USDC/USDT/OUSD",
  deriveLogo,
)

// Stablecoins
const DAI_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
  [ChainId.TESTNET]: "0xdeadbeef",
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
  [ChainId.TESTNET]: "0xdeadbeef",
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
  [ChainId.MAINNET]: "0x55d398326f99059ff775485246999027b3197955",
  [ChainId.TESTNET]: "0xdeadbeef",
}
export const USDT = new Token(
  USDT_CONTRACT_ADDRESSES,
  18,
  "USDT",
  "tether",
  "Tether",
  usdtLogo,
)

const OUSD_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x6bf2be9468314281cd28a94c35f967cafd388325",
  [ChainId.TESTNET]: "0xdeadbeef",
}
export const OUSD = new Token(
  OUSD_CONTRACT_ADDRESSES,
  18,
  "OUSD",
  "ousd",
  "Oikos USD",
  // TODO: ousd logo
  usdtLogo,
)

export const STABLECOIN_POOL_TOKENS = [DAI, USDC, USDT, OUSD]

// Tokenized BTC
const TBTC_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x8daebade922df735c38c80c7ebd708af50815faa",
  [ChainId.TESTNET]: "0xdeadbeef",
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
  [ChainId.MAINNET]: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
  [ChainId.TESTNET]: "0xdeadbeef",
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
  [ChainId.MAINNET]: "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
  [ChainId.TESTNET]: "0xdeadbeef",
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
  [ChainId.MAINNET]: "0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6",
  [ChainId.TESTNET]: "0xdeadbeef",
}
export const SBTC = new Token(
  SBTC_CONTRACT_ADDRESSES,
  18,
  "SBTC",
  "sbtc",
  "sBTC",
  sbtcLogo,
)

export const BTC_POOL_TOKENS = [TBTC, WBTC, RENBTC, SBTC]

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
  [ChainId.TESTNET]: 0,
}

export const POOL_STATS_URL: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "https://ipfs.derive.exchange/pool-stats.json",
  [ChainId.TESTNET]:
    "https://mehmeta-team-bucket.storage.fleek.co/pool-stats-dev.json",
}

export const SWAP_CONTRACT_GAS_ESTIMATES_MAP = {
  swap: BigNumber.from("200000"), // 157807
  addLiquidity: BigNumber.from("400000"), // 386555
  removeLiquidityImbalance: BigNumber.from("350000"), // 318231
  removeLiquidityOneToken: BigNumber.from("250000"), // 232947
}
