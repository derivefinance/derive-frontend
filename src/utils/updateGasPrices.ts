import { AppDispatch } from "../state"
import retry from "async-retry"
import { updateGasPrices } from "../state/application"

interface GenericGasReponse {
  gasStandard: number
  gasFast: number
  gasInstant: number
}
interface POAGasResponse {
  standard: number
  fast: number
  instant: number
  health: boolean
}

interface GasNowGasResponse {
  code: number
  data: {
    rapid: number
    fast: number
    standard: number
  }
}
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const fetchGasPricePOA = (): Promise<GenericGasReponse> =>
  fetch("https://gasprice.poa.network/")
    .then((res) => res.json())
    .then((body: POAGasResponse) => {
      const { standard, fast, instant, health } = body
      if (health) {
        return {
          gasStandard: Math.round(standard),
          gasFast: Math.round(fast),
          gasInstant: Math.round(instant),
        }
      }
      throw new Error("Unable to fetch gas price from POA Network")
    })

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const fetchGasPriceGasNow = (): Promise<GenericGasReponse> =>
  fetch("https://www.gasnow.org/api/v3/gas/price?utm_source=derive")
    .then((res) => res.json())
    .then((body: GasNowGasResponse) => {
      const {
        code,
        data: { rapid, fast, standard },
      } = body
      if (code >= 200 && code < 300) {
        return {
          gasStandard: Math.round(standard / 1e9),
          gasFast: Math.round(fast / 1e9),
          gasInstant: Math.round(rapid / 1e9),
        }
      }
      throw new Error("Unable to fetch gas price from GasNow Network")
    })

// TODO: find API for Binance Smart Chain gas price
/* eslint-disable */
const fetchGasPriceHardcoded = async (): Promise<GenericGasReponse> => ({
  gasStandard: 5,
  gasFast: 10,
  gasInstant: 20,
})

export default async function fetchGasPrices(
  dispatch: AppDispatch,
): Promise<void> {
  await retry(
    () =>
      fetchGasPriceHardcoded().then((gasPrices) => {
        dispatch(updateGasPrices(gasPrices))
      }),
    {
      retries: 3,
    },
  )
}
