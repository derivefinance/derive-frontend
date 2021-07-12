
import { AddressZero, Zero } from "@ethersproject/constants"
import {
  BTC_POOL_NAME,
  POOLS_MAP,
  PoolName,
  TRANSACTION_TYPES,
  VENUS_POOL_NAME,
} from "../constants"
import { formatBNToPercentString, getContract } from "../utils"
import { useEffect, useState } from "react"

import { AppState } from "../state"
import { BigNumber } from "@ethersproject/bignumber"
import LPTOKEN_GUARDED_ABI from "../constants/abis/lpTokenGuarded.json"
import LPTOKEN_UNGUARDED_ABI from "../constants/abis/lpTokenUnguarded.json"
import { LpTokenGuarded } from "../../types/ethers-contracts/LpTokenGuarded"
import { LpTokenUnguarded } from "../../types/ethers-contracts/LpTokenUnguarded"
import { parseUnits } from "@ethersproject/units"
import { useActiveWeb3React } from "."
import { useSelector } from "react-redux"
import { useSwapContract } from "./useContract"
import { useAllContracts } from "./useContract"
import { uniswapDRV } from '../constants/abis';
import { ethers, getDefaultProvider } from 'ethers';
const provider = getDefaultProvider('https://bsc-dataseed.binance.org');

interface TokenShareType {
  percent: string
  symbol: string
  value: BigNumber
}

export interface PoolDataType {
  adminFee: BigNumber
  apy: string // TODO: calculate
  name: string
  reserve: BigNumber
  swapFee: BigNumber
  tokens: TokenShareType[]
  totalLocked: BigNumber
  utilization: string // TODO: calculate
  virtualPrice: BigNumber
  volume: string // TODO: calculate
  oikosApr: BigNumber
  lpTokenPriceUSD: BigNumber
}

export interface UserShareType {
  avgBalance: BigNumber
  currentWithdrawFee: BigNumber
  lpTokenBalance: BigNumber
  name: string // TODO: does this need to be on user share?
  share: BigNumber
  tokens: TokenShareType[]
  usdBalance: BigNumber
  value: BigNumber
}

export type PoolDataHookReturnType = [PoolDataType, UserShareType | null]

const emptyPoolData = {
  adminFee: Zero,
  apy: "",
  name: "",
  reserve: Zero,
  swapFee: Zero,
  tokens: [],
  totalLocked: Zero,
  utilization: "",
  virtualPrice: Zero,
  volume: "",
  oikosApr: Zero,
  lpTokenPriceUSD: Zero,
} as PoolDataType

export default function usePoolData(
  poolName: PoolName,
): PoolDataHookReturnType {
   
  const { account, library } = useActiveWeb3React()
  const swapContract = useSwapContract(poolName)
  const { tokenPricesUSD, lastTransactionTimes } = useSelector(
    (state: AppState) => state.application,
  )
  const lastDepositTime = lastTransactionTimes[TRANSACTION_TYPES.DEPOSIT]
  const lastWithdrawTime = lastTransactionTimes[TRANSACTION_TYPES.WITHDRAW]
  const lastSwapTime = lastTransactionTimes[TRANSACTION_TYPES.SWAP]
  const POOL = POOLS_MAP[poolName]

  const [poolData, setPoolData] = useState<PoolDataHookReturnType>([
    {
      ...emptyPoolData,
      name: poolName,
      tokens: POOL.poolTokens.map((token) => ({
        symbol: token.symbol,
        percent: "0",
        value: Zero,
      })),
    },
    null,
  ])

  useEffect(() => {
    
    async function getSwapData(): Promise<void> {


      if (
        poolName == null ||
        swapContract == null ||
        tokenPricesUSD == null ||
        library == null ||
        account == null
      )
        return


      // Swap fees, price, and LP Token data
      const [userCurrentWithdrawFee, swapStorage] = await Promise.all([
        swapContract.calculateCurrentWithdrawFee(account || AddressZero),
        swapContract.swapStorage(), // will fail without account
      ])
      const { adminFee, lpToken: lpTokenAddress, swapFee } = swapStorage
      let lpTokenContract
      if (poolName === BTC_POOL_NAME) {
        lpTokenContract = getContract(
          lpTokenAddress,
          LPTOKEN_GUARDED_ABI,
          library,
          account ?? undefined,
        ) as LpTokenGuarded
      } else {
        lpTokenContract = getContract(
          lpTokenAddress,
          LPTOKEN_UNGUARDED_ABI,
          library,
          account ?? undefined,
        ) as LpTokenUnguarded
      }

      const [userLpTokenBalance, totalLpTokenBalance] = await Promise.all([
        lpTokenContract.balanceOf(account || AddressZero),
        lpTokenContract.totalSupply(),
      ])

      const virtualPrice = totalLpTokenBalance.isZero()
        ? BigNumber.from(10).pow(18)
        : await swapContract.getVirtualPrice()

      // Pool token data
      const tokenBalances: BigNumber[] = await Promise.all(
        POOL.poolTokens.map(async (token, i) => {
          const balance = await swapContract.getTokenBalance(i)
          return BigNumber.from(10)
            .pow(18 - token.decimals) // cast all to 18 decimals
            .mul(balance)
        }),
      )

      const uniswapDRVContract = new ethers.Contract(uniswapDRV.address, uniswapDRV.abi, provider);
      const reserves = await uniswapDRVContract.getReserves();
  		const drvPriceUsd = ((reserves[0] / reserves[1]) *  tokenPricesUSD.OIKOS).toFixed(4) ;
      //console.log(drvPriceUsd)

      const tokenBalancesSum: BigNumber = tokenBalances.reduce((sum, b) =>
        sum.add(b),
      )
      const tokenBalancesUSD = POOL.poolTokens.map((token, i) => {
        const balance = tokenBalances[i]
      console.log(parseUnits(String(tokenPricesUSD[token.symbol] || 0), 18))

         return balance
          .mul(parseUnits(String(tokenPricesUSD[token.symbol] || 0), 18))
          .div(BigNumber.from(10).pow(18))
      })

      const tokenBalancesUSDSum: BigNumber = tokenBalancesUSD.reduce((sum, b) =>
        sum.add(b),
      )
      const lpTokenPriceUSD = tokenBalancesSum.isZero()
        ? Zero
        : tokenBalancesUSDSum
            .mul(BigNumber.from(10).pow(18))
            .div(tokenBalancesSum)

      //rewards for pool
      let oksRewards, _drvRewards, extra
      if (poolName === BTC_POOL_NAME || poolName === VENUS_POOL_NAME)  {
        oksRewards = 0;
        extra = 0;
        _drvRewards = 0;
      } else {
        oksRewards = 240000;
        _drvRewards = 340000;
      }
      // (weeksPerYear * OIKOSPerWeek * OIKOSPrice) / (BTCPrice * BTCInPool)
      const comparisonPoolToken = POOL.poolTokens[0]
      // @ts-ignore
      let oikosAPRNumerator,
          oikosAPRDenominator,
          drvRewards, 
          oikosApr

      if (poolName === "Stablecoin Pool") {
        oikosAPRNumerator = BigNumber.from((52 * oksRewards)) 
        .mul(BigNumber.from(10).pow(18))
        .mul(parseUnits(String(tokenPricesUSD.OIKOS || 0), 18))
        const _drvPrice = Number(drvPriceUsd).toFixed(4)
  
        console.log(parseUnits(String(tokenPricesUSD.OIKOS || 0), 18))
        console.log(`DRV price is ${_drvPrice}`);
        
        drvRewards = BigNumber.from((52 * _drvRewards))
        .mul(BigNumber.from(10).pow(18))
        .mul(parseUnits(String(_drvPrice || 0), 18))
        oikosAPRNumerator = oikosAPRNumerator.add(drvRewards)
        
        console.log(parseUnits(String(_drvPrice || 0), 18))
        oikosAPRDenominator = totalLpTokenBalance
          .mul(
            parseUnits(
              String(tokenPricesUSD[comparisonPoolToken.symbol] || 0),
              6,
            ),
          )
          .div(1e6)
  
        console.log(parseUnits(
          String(tokenPricesUSD[comparisonPoolToken.symbol] || 0),
          6,
        ))
        oikosApr = totalLpTokenBalance.isZero()
          ? oikosAPRNumerator
          : oikosAPRNumerator.div(oikosAPRDenominator)
        console.log(`Oikos APR is ${oikosApr}`)

        //console.log(`Oikos APR is ${oikosApr.toString()} oikosAPRNumerator ${oikosAPRNumerator} oikosAPRdenominator ${oikosAPRDenominator}` )
   
      } else if (poolName === "vTokens Pool") {
        //@ts-ignore
        const fetchAPR = async() => {
          let apr = 0;
          const urls = [
            'https://api.venus.io/api/market_history/graph?asset=0x95c78222b3d6e262426483d42cfa53685a67ab9d&type=1hr&limit=1',
            'https://api.venus.io/api/market_history/graph?asset=0xeca88125a5adbe82614ffc12d0db554e2e2867c8&type=1hr&limit=1',
            'https://api.venus.io/api/market_history/graph?asset=0xfd5840cd36d94d7229439859c0112a4185bc0255&type=1hr&limit=1'
          ];
          //@ts-ignore
          const responses = await Promise.all(urls.map(u => {
            const response = fetch(u)
            //@ts-ignore
            return response
          }))
          //@ts-ignore
          const json = await Promise.all(responses.map(res => {
            return res.json()
          })) 
          json.forEach(res => {
            if (typeof res.data.result !== "undefined") {
              //@ts-ignore
              res.data.result.map((result) => {
                apr = apr + Number(result.supplyApy)
              })
            } 
          })
          return apr
        }

        const o = await fetchAPR() ;
        let apr2Str = o.toString();
        apr2Str = apr2Str.replace(".", "");

        oikosApr = BigNumber.from(apr2Str).mul(10);

      } else {
        oikosApr = BigNumber.from(0).pow(18);

      }

      // User share data
      const userShare = userLpTokenBalance
        .mul(BigNumber.from(10).pow(18))
        .div(
          totalLpTokenBalance.isZero()
            ? BigNumber.from("1")
            : totalLpTokenBalance,
      )
      const userPoolTokenBalances = tokenBalances.map((balance) => {
        return userShare.mul(balance).div(BigNumber.from(10).pow(18))
      })
      const userPoolTokenBalancesSum: BigNumber = userPoolTokenBalances.reduce(
        (sum, b) => sum.add(b),
      )
      const userPoolTokenBalancesUSD = tokenBalancesUSD.map((balance) => {
        return userShare.mul(balance).div(BigNumber.from(10).pow(18))
      })
      const userPoolTokenBalancesUSDSum: BigNumber = userPoolTokenBalancesUSD.reduce(
        (sum, b) => sum.add(b),
      )

      const poolTokens = POOL.poolTokens.map((token, i) => ({
        symbol: token.symbol,
        percent: formatBNToPercentString(
          tokenBalances[i]
            .mul(10 ** 5)
            .div(
              totalLpTokenBalance.isZero()
                ? BigNumber.from("1")
                : tokenBalancesSum,
            ),
          5,
        ),
        value: tokenBalances[i],
      }))
      const userPoolTokens = POOL.poolTokens.map((token, i) => ({
        symbol: token.symbol,
        percent: formatBNToPercentString(
          tokenBalances[i]
            .mul(10 ** 5)
            .div(
              totalLpTokenBalance.isZero()
                ? BigNumber.from("1")
                : tokenBalancesSum,
            ),
          5,
        ),
        value: userPoolTokenBalances[i],
      }))
      const poolData = {
        name: poolName,
        tokens: poolTokens,
        reserve: tokenBalancesUSDSum,
        totalLocked: totalLpTokenBalance,
        virtualPrice: virtualPrice,
        adminFee: adminFee,
        swapFee: swapFee,
        volume: "XXX", // TODO
        utilization: "XXX", // TODO
        apy: String(oikosApr), //oikosApr TODO
        oikosApr,
        lpTokenPriceUSD,
      }
      //poolName === BTC_POOL_NAME ? oikosApr : Zero,
      const userShareData = account
        ? {
            name: poolName,
            share: userShare,
            value: userPoolTokenBalancesSum,
            usdBalance: userPoolTokenBalancesUSDSum,
            avgBalance: userPoolTokenBalancesSum,
            tokens: userPoolTokens,
            currentWithdrawFee: userCurrentWithdrawFee,
            lpTokenBalance: userLpTokenBalance,
          }
        : null
        //@ts-ignore
      setPoolData([poolData, userShareData])
    }
    void getSwapData()
  }, [
    lastDepositTime,
    lastWithdrawTime,
    lastSwapTime,
    poolName,
    swapContract,
    tokenPricesUSD,
    account,
    library,
    POOL.poolTokens,
  ])

  return poolData
}
