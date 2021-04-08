import { BLOCK_TIME, DAI, STABLECOIN_POOL_NAME, Token } from "../../constants"
import {
  BTCB,
  BTC_POOL_NAME,
  OBTC,
  OUSD,
  PoolName,
  RENBTC,
  USDC,
  USDT,
  OIKOS_TOKENS
} from "../../constants"

import { BigNumber } from "@ethersproject/bignumber"
import { Erc20 } from "../../../types/ethers-contracts/Erc20"
import { Zero } from "@ethersproject/constants"
import { useActiveWeb3React } from "../../hooks"
import { useMemo } from "react"
import usePoller from "../../hooks/usePoller"
import { useState } from "react"
import { useTokenContract } from "../../hooks/useContract"

export function useTokenBalance(t: Token): BigNumber {
  const { account, chainId } = useActiveWeb3React()
  const [balance, setBalance] = useState<BigNumber>(Zero)
  const isOikosToken = OIKOS_TOKENS.includes(t)

  const tokenContract = useTokenContract(t) as Erc20

  usePoller((): void => {
    async function pollBalance(): Promise<void> {
      let newBalance
      try {
        if (!account) {
          newBalance = Zero
        } else if (isOikosToken) {
          /* eslint-disable */
          newBalance = await tokenContract?.transferableSynths(account) as BigNumber
        } else {
          newBalance = await tokenContract?.balanceOf(account)
        }
      } catch (err) {
        console.error("Error fetching balance for token", tokenContract)
        throw err
      }
      if (newBalance !== balance) {
        setBalance(newBalance)
      }
    }
    if (account && chainId) {
      void pollBalance()
    }
  }, BLOCK_TIME)

  return balance
}

export function usePoolTokenBalances(
  poolName: PoolName,
): { [token: string]: BigNumber } | null {
  const btcbTokenBalance = useTokenBalance(BTCB)
  const renbtcTokenBalance = useTokenBalance(RENBTC)
  const obtcTokenBalance = useTokenBalance(OBTC)
  const daiTokenBalance = useTokenBalance(DAI)
  const usdcTokenBalance = useTokenBalance(USDC)
  const usdtTokenBalance = useTokenBalance(USDT)
  const ousdTokenBalance = useTokenBalance(OUSD)
  const btcPoolTokenBalances = useMemo(
    () => ({
      [BTCB.symbol]: btcbTokenBalance,
      [RENBTC.symbol]: renbtcTokenBalance,
      [OBTC.symbol]: obtcTokenBalance,
    }),
    [btcbTokenBalance, renbtcTokenBalance, obtcTokenBalance],
  )
  const stablecoinPoolTokenBalances = useMemo(
    () => ({
      [DAI.symbol]: daiTokenBalance,
      [USDC.symbol]: usdcTokenBalance,
      [USDT.symbol]: usdtTokenBalance,
      [OUSD.symbol]: ousdTokenBalance,
    }),
    [daiTokenBalance, usdcTokenBalance, usdtTokenBalance, ousdTokenBalance],
  )

  if (poolName === BTC_POOL_NAME) {
    return btcPoolTokenBalances
  } else if (poolName === STABLECOIN_POOL_NAME) {
    return stablecoinPoolTokenBalances
  }
  return null
}
