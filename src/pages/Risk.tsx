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
        <h3>{t("audits")}</h3>
        <p>
          {t("riskAudits")}{" "}
        </p>
        <h3>{t("adminKeys")}</h3>
        <p>{t("riskAdminKeys")}</p>
        <h3>{t("lossOfPeg")}</h3>
        <p>{t("riskLossOfPeg")}</p>
      </div>
    </div>
  )
}

export default Risk
