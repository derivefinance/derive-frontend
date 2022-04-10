import { BTC_POOL_NAME, STABLECOIN_POOL_NAME, STABLECOIN_4_ASSETS_POOL_NAME, VENUS_POOL_NAME } from "../constants"
import React, { ReactElement } from "react"

import PoolOverview from "../components/PoolOverview"
import TopMenu from "../components/TopMenu"
import styles from "./Pools.module.scss"
import usePoolData from "../hooks/usePoolData"
import { useTranslation } from "react-i18next"

function Pools({
  action,
}: {
  action: "deposit" | "withdraw"
}): ReactElement | null {
  const [btcPoolData, btcUserShareData] = usePoolData(BTC_POOL_NAME)
  const [usdPoolData, usdUserShareData] = usePoolData(STABLECOIN_POOL_NAME)
  const [usd4AssetsPoolData, usd4AssetsUserShareData] = usePoolData(STABLECOIN_4_ASSETS_POOL_NAME)

  const [venusPoolData, venusUserShareData] = usePoolData(VENUS_POOL_NAME)

  const { t } = useTranslation()

  return (
    <div className={styles.poolsPage}>
      <TopMenu activeTab={action} />
      <div className={styles.content}>
        <h3 className={styles.title}>{t("selectAPool")}</h3>
        <PoolOverview
          poolData={usdPoolData}
          to={`/${action}/usd`}
          userShareData={usdUserShareData}
        />
        <PoolOverview
          poolData={usd4AssetsPoolData}
          to={`/${action}/usd4assets`}
          userShareData={usd4AssetsUserShareData}
        />
        <PoolOverview
          poolData={venusPoolData}
          to={`/${action}/venus`}
          userShareData={venusUserShareData}
        />   
        <PoolOverview
          poolData={btcPoolData}
          to={`/${action}/btc`}
          userShareData={btcUserShareData}
        />
      </div>
    </div>
  )
}

export default Pools
