import { BTC_POOL_TOKENS, STABLECOIN_POOL_TOKENS, VENUS_POOL_TOKENS } from "../constants"

import { AppDispatch } from "../state"
import retry from "async-retry"
import { updateTokensPricesUSD } from "../state/application"

const coinGeckoAPI = "https://api.coingecko.com/api/v3/simple/price"

interface CoinGeckoReponse {
  [tokenSymbol: string]: {
    usd: number
  }
}

export default function fetchTokenPricesUSD(dispatch: AppDispatch): void {
  const tokens = BTC_POOL_TOKENS
  .concat(STABLECOIN_POOL_TOKENS)
  .concat(VENUS_POOL_TOKENS)
  
  const tokenIds = tokens
    .map(({ geckoId }) => geckoId)
    .concat(["binancecoin", "bitcoin", "oikos"])
    console.log(tokenIds)
  void retry(
    () =>
      fetch(`${coinGeckoAPI}?ids=${encodeURIComponent(
        tokenIds.join(","),
      )}&vs_currencies=usd
    `)
        .then((res) => res.json())
        .then((body: CoinGeckoReponse) => {
          const result = tokens.reduce(
            (acc, token) => {
              return { ...acc, [token.symbol]: body?.[token.geckoId]?.usd }
            },
            {
              BNB: body?.binancecoin?.usd,
              BTC: body?.bitcoin?.usd,
              OIKOS: body?.oikos?.usd,
            },
          )
          //@ts-ignore
          result.VBUSD = result.VUSDC
          dispatch(updateTokensPricesUSD(result))
        }),
    { retries: 3 },
  )
}
