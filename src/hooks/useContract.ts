import {
  BTCB,
  BTC_POOL_NAME,
  BTC_SWAP_ADDRESSES,
  BTC_SWAP_TOKEN,
  DAI,
  OBTC,
  OUSD,
  PoolName,
  RENBTC,
  STABLECOIN_POOL_NAME,
  STABLECOIN_SWAP_ADDRESSES,
  STABLECOIN_SWAP_TOKEN,
  Token,
  RewardEscrow,
  USDC,
  USDT,
  OIKOS_TOKENS,
  REWARD_CONTRACTS,
  DERIVE_TOKENS,
  PANCAKE_CONTRACTS,
  OLD_DRV_REWARD,
  VENUS_SWAP_ADDRESSES,
  VENUS_POOL_NAME,
  VENUS_SWAP_TOKEN,
  VBUSD,
  VUSDC,
  VUSDT,
  DERIVE_DAO_REWARD_ADDRESSES,
  DERIVE_DAO_REWARD_ESCROW_ADDRESSES,
} from "../constants"
import { useMemo, useState } from "react"

import { Contract } from "@ethersproject/contracts"
import ERC20_ABI from "../constants/abis/erc20.json"
import { Erc20 } from "../../types/ethers-contracts/Erc20"
import LPTOKEN_GUARDED_ABI from "../constants/abis/lpTokenGuarded.json"
import LPTOKEN_UNGUARDED_ABI from "../constants/abis/lpTokenUnguarded.json"
import { LpTokenGuarded } from "../../types/ethers-contracts/LpTokenGuarded"
import { LpTokenUnguarded } from "../../types/ethers-contracts/LpTokenUnguarded"
import SWAP_FLASH_LOAN_ABI from "../constants/abis/swapFlashLoan.json"
import SWAP_GUARDED_ABI from "../constants/abis/swapGuarded.json"
import { SwapFlashLoan } from "../../types/ethers-contracts/SwapFlashLoan"
import { SwapGuarded } from "../../types/ethers-contracts/SwapGuarded"
import { getContract } from "../utils"
import { useActiveWeb3React } from "./index"
import { REWARD_ESCROW_ABI } from "../helpers/abi/RewardEscrow.js"

const PANCAKE_ABI = [
  ...ERC20_ABI,
  {
    "constant": true,
    "inputs": [],
    "name": "getReserves",
    "outputs": [
    {
      "name": "_reserve0",
      "type": "uint112",
    },
    {
      "name": "_reserve1",
      "type": "uint112",
    },
    {
      "name": "_blockTimestampLast",
      "type": "uint32",
    },
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
  },
]

const OIKOS_ERC20_ABI = [
  ...ERC20_ABI,
  {
    "constant": true,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      }
    ],
    "name": "transferableSynths",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]

const OIKOS_REWARD_ABI = [
  ...ERC20_ABI,
  {
    "constant": true,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      }
    ],
    "name": "transferableSynths",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{ "name": "amount", "type": "uint256" }],
    "name": "stake",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "constant": false,
    "inputs": [{ "name": 'amount', "type": 'uint256' }],
    "name": 'withdraw',
    "outputs": [],
    "payable": false,
    "stateMutability": 'nonpayable',
    "type": 'function',
  },
  {
    "constant": true,
    "inputs": [{ "internalType": 'address', "name": 'account', "type": 'address' }],
    "name": 'earned',
    "outputs": [{ "internalType": 'uint256', "name": '', "type": 'uint256' }],
    "payable": false,
    "stateMutability": 'view',
    "type": 'function',
  },
  {
    "constant": false,
    "inputs": [],
    "name": 'getReward',
    "outputs": [],
    "payable": false,
    "stateMutability": 'nonpayable',
    "type": 'function',
  },
  {
    "constant": false,
    "inputs": [],
    "name": 'exit',
    "outputs": [],
    "payable": false,
    "stateMutability": 'nonpayable',
    "type": 'function',
  },   
]

// returns null on errors
function useContract(
  address: string | undefined,
  ABI: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  withSignerIfPossible = true,
): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined,
      )
    } catch (error) {
      console.error("Failed to get contract", error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(
  t: Token,
  withSignerIfPossible?: boolean,
): Contract | null {
  const { chainId } = useActiveWeb3React()
  const tokenAddress = chainId ? t.addresses[chainId] : undefined
  const isOikosToken = OIKOS_TOKENS.includes(t)
  const isRewardsContract = REWARD_CONTRACTS.includes(t)
  const isPancakeContract = PANCAKE_CONTRACTS.includes(t)
  /* eslint-disable */
  let abi = isOikosToken ? OIKOS_ERC20_ABI : ERC20_ABI ;
  abi = isRewardsContract ? OIKOS_REWARD_ABI : abi;
  abi = isPancakeContract ? PANCAKE_ABI : abi;

  const contract = useContract(tokenAddress, abi, withSignerIfPossible)
  return contract
}

export function useRewardEscrowContract(
  t: RewardEscrow,
  withSignerIfPossible?: boolean,
): Contract | null {
  const { chainId } = useActiveWeb3React()
  const contractAddress = chainId ? t.addresses[chainId] : undefined
  /* eslint-disable */
  let abi = REWARD_ESCROW_ABI;

  const contract = useContract(contractAddress, abi, withSignerIfPossible)
  return contract
}

export function useSwapBTCContract(): SwapGuarded | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId ? BTC_SWAP_ADDRESSES[chainId] : undefined,
    SWAP_GUARDED_ABI,
  ) as SwapGuarded
}

export function useSwapUSDContract(): SwapFlashLoan | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId ? STABLECOIN_SWAP_ADDRESSES[chainId] : undefined,
    SWAP_FLASH_LOAN_ABI,
  ) as SwapFlashLoan
}

export function useSwapVENUSContract(): SwapFlashLoan | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId ? VENUS_SWAP_ADDRESSES[chainId] : undefined,
    SWAP_FLASH_LOAN_ABI,
  ) as SwapFlashLoan
}

export function useSwapContract<T extends PoolName>(
  poolName: T,
): T extends typeof BTC_POOL_NAME ? SwapGuarded | null : SwapFlashLoan | null
export function useSwapContract(
  poolName: PoolName,
): SwapGuarded | SwapFlashLoan | null {
  const usdSwapContract = useSwapUSDContract()
  const btcSwapContract = useSwapBTCContract()
  const venusSwapContract = useSwapVENUSContract()

  if (poolName === BTC_POOL_NAME) {
    return btcSwapContract
  } else if (poolName === STABLECOIN_POOL_NAME) {
    return usdSwapContract
  }else if (poolName === VENUS_POOL_NAME) {
    return venusSwapContract
  }

  return null
}

export function useLPTokenContract<T extends PoolName>(
  poolName: T,
): T extends typeof BTC_POOL_NAME
  ? LpTokenGuarded | null
  : LpTokenUnguarded | null
export function useLPTokenContract(
  poolName: PoolName,
): LpTokenUnguarded | LpTokenGuarded | null {
  const swapContract = useSwapContract(poolName)
  const [lpTokenAddress, setLPTokenAddress] = useState("")
  void swapContract
    ?.swapStorage()
    .then(({ lpToken }: { lpToken: string }) => setLPTokenAddress(lpToken))
  const lpTokenGuarded = useContract(
    lpTokenAddress,
    LPTOKEN_GUARDED_ABI,
  ) as LpTokenGuarded
  const lpTokenUnguarded = useContract(
    lpTokenAddress,
    LPTOKEN_UNGUARDED_ABI,
  ) as LpTokenUnguarded
  return poolName === BTC_POOL_NAME ? lpTokenGuarded : lpTokenUnguarded
}

interface AllContractsObject {
  [x: string]: LpTokenGuarded | LpTokenUnguarded | Erc20 | null
}
export function useAllContracts(): AllContractsObject | null {
  const btcbContract = useTokenContract(BTCB) as Erc20
  const renbtcContract = useTokenContract(RENBTC) as Erc20
  const obtcContract = useTokenContract(OBTC) as Erc20
  const daiContract = useTokenContract(DAI) as Erc20
  const usdcContract = useTokenContract(USDC) as Erc20
  const usdtContract = useTokenContract(USDT) as Erc20
  const ousdContract = useTokenContract(OUSD) as Erc20
  const vbusdContract = useTokenContract(VBUSD) as Erc20
  const vusdcContract = useTokenContract(VUSDC) as Erc20
  const vusdtContract = useTokenContract(VUSDT) as Erc20  
  const oikosRewardContract = useTokenContract(REWARD_CONTRACTS[0]) as Erc20
  const drvRewardContract = useTokenContract(REWARD_CONTRACTS[1]) as Erc20
  const drvContract = useTokenContract(DERIVE_TOKENS[0]) as Erc20
  const pancakeDRVContract = useTokenContract(PANCAKE_CONTRACTS[0]) as Erc20
  const oldDrvRewardContract = useTokenContract(REWARD_CONTRACTS[2]) as Erc20
  const btcSwapTokenContract = useTokenContract(
    BTC_SWAP_TOKEN,
  ) as LpTokenGuarded
  const stablecoinSwapTokenContract = useTokenContract(
    STABLECOIN_SWAP_TOKEN,
  ) as LpTokenUnguarded
  const venusSwapTokenContract = useTokenContract(
    VENUS_SWAP_TOKEN,
  ) as LpTokenUnguarded
  return useMemo(() => {
    if (
      ![
        btcbContract,
        renbtcContract,
        obtcContract,
        daiContract,
        usdcContract,
        usdtContract,
        ousdContract,
        vbusdContract,
        vusdcContract,
        vusdtContract,
        oikosRewardContract,
        drvRewardContract,
        btcSwapTokenContract,
        stablecoinSwapTokenContract,
        venusSwapTokenContract,
        drvContract,
        pancakeDRVContract,
        oldDrvRewardContract
      ].some(Boolean)
    )
      return null
    return {
      [BTCB.symbol]: btcbContract,
      [RENBTC.symbol]: renbtcContract,
      [OBTC.symbol]: obtcContract,
      [DAI.symbol]: daiContract,
      [USDC.symbol]: usdcContract,
      [USDT.symbol]: usdtContract,
      [OUSD.symbol]: ousdContract,
      [VBUSD.symbol]: vbusdContract,
      [VUSDC.symbol]: vusdcContract,
      [VUSDT.symbol]: vusdtContract,      
      ["OikosRewards"]: oikosRewardContract,
      ["DrvRewards"]: drvRewardContract,
      ["OldDrvRewards"]: oldDrvRewardContract,
      ["DRV"]: drvContract,
      ["PancakeDRV"]: pancakeDRVContract,
      [BTC_SWAP_TOKEN.symbol]: btcSwapTokenContract,
      [STABLECOIN_SWAP_TOKEN.symbol]: stablecoinSwapTokenContract,
      [VENUS_SWAP_TOKEN.symbol]: venusSwapTokenContract,
    }
  }, [
    btcbContract,
    renbtcContract,
    obtcContract,
    ousdContract,
    daiContract,
    usdcContract,
    usdtContract,
    vusdtContract,
    vusdcContract,
    vbusdContract,
    oikosRewardContract,
    drvRewardContract,
    btcSwapTokenContract,
    stablecoinSwapTokenContract,
    venusSwapTokenContract,
    drvContract,
    pancakeDRVContract,
    oldDrvRewardContract
  ])
}
