import { BigNumber } from "@ethersproject/bignumber"
import daiLogo from "../assets/icons/dai.svg"
import deriveLogo from "../assets/icons/logo-dark.svg"
import ousdLogo from "../assets/icons/ousd.svg"
import renbtcLogo from "../assets/icons/renbtc.svg"
import sbtcLogo from "../assets/icons/obtc.svg"
import tbtcLogo from "../assets/icons/btcb.svg"
import usdcLogo from "../assets/icons/usdc.svg"
import usdtLogo from "../assets/icons/usdt.svg"
import vbusdLogo from "../assets/icons/vBUSD.svg"
import vusdcLogo from "../assets/icons/vBUSD.svg"
import vusdtLogo from "../assets/icons/vBUSD.svg"

import { REWARD_ESCROW_ABI } from "../helpers/abi/RewardEscrow.js"


export const NetworkContextName = "NETWORK"
export const BTC_POOL_NAME = "BTC Pool"
export const STABLECOIN_POOL_NAME = "Stablecoin Pool"
export const VENUS_POOL_NAME = "vTokens Pool"

export type PoolName = typeof BTC_POOL_NAME | typeof STABLECOIN_POOL_NAME | typeof VENUS_POOL_NAME

export const THIS_REWARD_ESCROW_ABI = REWARD_ESCROW_ABI

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

export class RewardEscrow {
  readonly addresses: { [chainId in ChainId]: string }
  readonly icon: string

  constructor(
    addresses: { [chainId in ChainId]: string },
    icon: string,
  ) {
    this.addresses = addresses
    this.icon = icon
  }
}


export const BLOCK_TIME = 15000

export const STABLECOIN_SWAP_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0xA726A51b8Fe5f027ce5039E6400864Fd0BDCB10F",
  [ChainId.TESTNET]: "0xdeadbeef",
}

export const VENUS_SWAP_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0xF6cAf057F6c91E7aB2e5F84714075CaCBB986f47",
  [ChainId.TESTNET]: "0xdeadbeef",
}
export const BTC_SWAP_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0xF01EF8d5601f0275edE73e1cA67141e680bfDdbd",
  [ChainId.TESTNET]: "0xdeadbeef",
}

export const MERKLETREE_DATA: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "mainnetTestAccounts.json",
  [ChainId.TESTNET]: "hardhat.json",
}

export const STABLECOIN_SWAP_TOKEN_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: "0x2f2B80e513aCe1F0F5a4D0aF6c5eDfAb75BC0De9",
  [ChainId.TESTNET]: "0xdeadbeef",
}

export const VENUS_SWAP_TOKEN_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: "0xFd05Ca89560F3F6D80b82e1158EcAfb45031ACFf",
  [ChainId.TESTNET]: "0xdeadbeef",
}

export const DERIVE_DAO_REWARD_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: "0xdeadbeef",
  [ChainId.TESTNET]: "0xdeadbeef",
}

export const DERIVE_DAO_REWARD_ESCROW_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: "0x7972ad6e5f080177ca7095d276f6fa8972ee7968",
  [ChainId.TESTNET]: "0xdeadbeef",
}


export const BTC_SWAP_TOKEN_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: "0x950CCeD347Ad08Ff845b8d807a49050D33fB2d40",
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

export const VENUS_SWAP_TOKEN = new Token(
  VENUS_SWAP_TOKEN_CONTRACT_ADDRESSES,
  18,
  "deriveV",
  "derivev",
  "d-Venus",
  deriveLogo,
)

const PANCAKE_DRV_CONTRACT_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x2ee9c2ce331feb7ae40ab2d5667dfde09a80f99e",
  [ChainId.TESTNET]: "0xdeadbeef",
}
export const PANCAKE_DRV_CONTRACT = new Token(
  PANCAKE_DRV_CONTRACT_ADDRESS,
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

const VBUSD_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x95c78222b3d6e262426483d42cfa53685a67ab9d",
  [ChainId.TESTNET]: "0xdeadbeef",
}
export const VBUSD = new Token(
  VBUSD_CONTRACT_ADDRESSES,
  8,
  "VBUSD",
  "venus-busd",
  "(v)BUSD",
  vbusdLogo,
)

const VUSDC_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0xeca88125a5adbe82614ffc12d0db554e2e2867c8",
  [ChainId.TESTNET]: "0xdeadbeef",
}
export const VUSDC = new Token(
  VUSDC_CONTRACT_ADDRESSES,
  8,
  "VUSDC",
  "venus-usdc",
  "(v)USDC",
  vusdcLogo,
)

const VUSDT_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0xfd5840cd36d94d7229439859c0112a4185bc0255",
  [ChainId.TESTNET]: "0xdeadbeef",
}
export const VUSDT = new Token(
  VUSDT_CONTRACT_ADDRESSES,
  8,
  "VUSDT",
  "venus-usdt",
  "(v)USDT",
  vusdtLogo,
)

const OUSD_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x6bf2be9468314281cd28a94c35f967cafd388325",
  [ChainId.TESTNET]: "0xdeadbeef",
}
export const OUSD = new Token(
  OUSD_CONTRACT_ADDRESSES,
  18,
  "OUSD",
  "dai", // TODO: use actual oUSD rate when it is supported by coingecko?
  "oUSD",
  // TODO: ousd logo
  ousdLogo,
)

const DRV_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x4ac8b09860519d5a17b6ad8c86603aa2f07860d6",
  [ChainId.TESTNET]: "0xdeadbeef",
}
export const DRV = new Token(
  DRV_CONTRACT_ADDRESSES,
  18,
  "DRV",
  "dai", // TODO: use actual oUSD rate when it is supported by coingecko?
  "Derive DAO Token",
  // TODO: ousd logo
  ousdLogo,
)

const OIKOS_REWARD_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x8559AeF12e2C40E66f0eb600d0Dd8ae5CeA419D7",
  [ChainId.TESTNET]: "0xdeadbeef",
}
export const OIKOS_REWARD = new Token(
  OIKOS_REWARD_CONTRACT_ADDRESSES,
  18,
  "OIKOSREWARD",
  "dai", // TODO: use actual oUSD rate when it is supported by coingecko?
  "OIKOSREWARD",
  // TODO: ousd logo
  ousdLogo,
)

const OLD_DRV_REWARD_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x4D756b9c83b5F3F37450B0aE30f42f043cA9Ccb3",// "0xf0DC62233E87Cb63EF2C85bf28E1CC0F9edB63eE",
  [ChainId.TESTNET]: "0xdeadbeef",
}
export const OLD_DRV_REWARD = new Token(
  OLD_DRV_REWARD_CONTRACT_ADDRESSES,
  18,
  "DRVREWARD",
  "dai", // TODO: use actual oUSD rate when it is supported by coingecko?
  "DRVREWARD",
  // TODO: ousd logo
  ousdLogo,
)

const DRV_REWARD_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x0555746f7104DB313660c09E38bF8a1dbdcd3681", 
  [ChainId.TESTNET]: "0xdeadbeef",
}
export const DRV_REWARD = new Token(
  DRV_REWARD_CONTRACT_ADDRESSES,
  18,
  "DRVREWARD",
  "dai", // TODO: use actual oUSD rate when it is supported by coingecko?
  "DRVREWARD",
  // TODO: ousd logo
  ousdLogo,
)


export const STABLECOIN_POOL_TOKENS = [DAI, USDC, USDT, OUSD]
export const VENUS_POOL_TOKENS = [VBUSD, VUSDC, VUSDT]

// Tokenized BTC
const BTCB_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
  [ChainId.TESTNET]: "0xdeadbeef",
}
export const BTCB = new Token(
  BTCB_CONTRACT_ADDRESSES,
  18,
  "BTCB",
  "binance-bitcoin", // coingecko id
  "BTCB",
  tbtcLogo,
)

const OBTC_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x19e0E8413DEe3AfFd94bdd42519d01935a0CF0c2",
  [ChainId.TESTNET]: "0xdeadbeef",
}
export const OBTC = new Token(
  OBTC_CONTRACT_ADDRESSES,
  18,
  "OBTC",
  "bitcoin", // TODO: use actual oBTC rate when it is supported by coingecko?
  "oBTC",
  // TODO: oikos bitcoin logo
  sbtcLogo,
)

const RENBTC_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0xfce146bf3146100cfe5db4129cf6c82b0ef4ad8c",
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

export const BTC_POOL_TOKENS = [BTCB, RENBTC, OBTC]

// maps a symbol string to a token object
export const TOKENS_MAP: {
  [symbol: string]: Token
} = STABLECOIN_POOL_TOKENS.concat(BTC_POOL_TOKENS).concat(VENUS_POOL_TOKENS).reduce(
  (acc, token) => ({ ...acc, [token.symbol]: token }),
  {},
)

export const POOLS_MAP: {
  [poolName in PoolName]: {
    lpToken: Token
    poolTokens: Token[]
  }
} = {
  [STABLECOIN_POOL_NAME]: {
    lpToken: STABLECOIN_SWAP_TOKEN,
    poolTokens: STABLECOIN_POOL_TOKENS,
  },
  [BTC_POOL_NAME]: {
    lpToken: BTC_SWAP_TOKEN,
    poolTokens: BTC_POOL_TOKENS,
  },
  [VENUS_POOL_NAME]: {
    lpToken: VENUS_SWAP_TOKEN,
    poolTokens: VENUS_POOL_TOKENS,
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

export const DERIVE_TOKENS = [DRV]
export const OIKOS_TOKENS = [OBTC, OUSD]
export const REWARD_CONTRACTS = [OIKOS_REWARD, DRV_REWARD, OLD_DRV_REWARD]
export const PANCAKE_CONTRACTS = [PANCAKE_DRV_CONTRACT]
