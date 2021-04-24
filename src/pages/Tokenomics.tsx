import "./Risk.scss"

import React, { ReactElement } from "react"

import TopMenu from "../components/TopMenu"
import { useTranslation } from "react-i18next"

function Tokenomics(): ReactElement {
  const { t } = useTranslation()

  return (
    <div className="riskpage">
      <TopMenu activeTab={t("DRV")} />

      <div className="content">
        <p>
        <h3>{t("tokenomicsIntro")}</h3>
          {t("tokenomics1")}{" "}
          <a href="https://bscscan.com/token/0x4aC8B09860519d5A17B6ad8c86603aa2f07860d6" target="_blank" rel="noreferrer">
          {t("tokenomics2")}{" "}
          </a>
        </p>
        <h3>{t("supply")} </h3>
        <p>{t("totalSupply")}<b>{"3.03b"}</b> {t("totalSupply2")}</p>
        <br />
        <ul style={{marginLeft:"5%",}} >
            <li><b>62%</b> to community liquidity providers</li>
            <li><b>30%</b> to shareholders (team and investors) with 2-4 years vesting</li>
            <li><b>3%</b>  to employees with 2 years vesting</li>
            <li><b>5%</b>  to the community reserve</li>
        </ul>
        <br />
        <p>{t("initialSupply")} <b>{"1.3b"}</b> {t("initialSupply2")}</p>
        <br />
        <ul style={{marginLeft:"5%",}} >
            <li><b>30%</b> to shareholders (team and investors) with 2-4 years vesting</li>
            <li><b>5%</b> to employees with 2 years vesting</li>
            <li><b>8%</b>  to the community reserve</li>
        </ul>
        <br />
        <p>{"The circulating supply will be 0 at launch and the initial release rate will be around "} <b>{"14m"}</b> {"DRV per week. By the end of the first year, the circulating supply should be around"} <b>{"750m"}</b> {"DRV."}</p>
        <h3>{"How to get DRV?"}</h3>
        <p>{"Liquidity providers on the Derive platform receive DRV incentives for doing so. This ensures the protocol offers low fees and extremely low slippage. "}</p>
        <h3>{"Escrow contracts"}</h3>
        <p>{"DRV are subject to a 2-4 years vesting period on our escrow contracts. The escrow contracts source code is available on our "}<a href="https://bscscan.com/token/0x4aC8B09860519d5A17B6ad8c86603aa2f07860d6" target="_blank" rel="noreferrer">{"Github"}</a></p>        
        <h3>{"The DAO"}</h3>
        <p>{"WIP - Coming soon"}</p>
      </div>
    </div>
  )
}

export default Tokenomics
