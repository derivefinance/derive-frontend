import "./Risk.scss"

import React, { ReactElement } from "react"

import TopMenu from "../components/TopMenu"
import { useTranslation } from "react-i18next"

function Risk(): ReactElement {
  const { t } = useTranslation()

  return (
    <div className="riskpage">
      <TopMenu activeTab={t("risk")} />
      <div className="content">
        <p>
          {t("riskIntro")}{" "}
          <a href="https://github.com/derive-finance/derive-contract">
            {t("riskIntro2")}
          </a>{" "}
          {t("riskIntro3")}{" "}
          <a href="https://t.me/derivefinance">
          {t("riskIntro4")}{" "}
          </a>
          {t("riskIntro5")}
        </p>
        <h3>{t("adminKeys")}</h3>
        <p>{t("riskAdminKeys")}</p>
        <h3>{t("lossOfPeg")}</h3>
        <p>{t("riskLossOfPeg")}</p>
        <h3>{t("smartContracts")}</h3>
        <p>{t("smartContractsInfo")}
        <a href="https://github.com/derivefinance" target="_blank" rel="noreferrer" >
          {t("github")}{" "}
        </a>  
        {t("verified")}{" "}
        <a href="https://bscscan.com/address/0xA726A51b8Fe5f027ce5039E6400864Fd0BDCB10F#code" target="_blank" rel="noreferrer" > 
        {t("stablecoin")}{" "}
        </a>
        </p>
        <h3>{t("audits")}</h3>
        <p>
          {t("riskAudits")}{" "}
        </p>
        <h3>{t("contact")}</h3>
        <p>{t("contactInfo")}  
        <a href="mailto:support@derive.fi">
          {t("email")}{" "}
          </a> 
          {t("staffInfo")}  
        <a href="https://t.me/derivefinance" target="_blank" rel="noreferrer" >
          {t("telegram")}
          </a> 
          {t("twitter")}{" "}
          <a href="https://twitter.com/derivefinance" target="_blank" rel="noreferrer">
          {t("twitterInfo")}
          </a>
          </p>          
      </div>
    </div>
  )
}

export default Risk
