/* prettier-ignore */
/* tslint:disable */

import "./TopMenu.scss"
import React, { ReactElement } from "react"
import { AppState } from "../state"
import { Link } from "react-router-dom"

import ThemeChanger from "./ThemeChanger"

import Web3Status from "./Web3Status"
import classNames from "classnames"
import logoDark from "../assets/icons/logo-dark.svg"
import logoLight from "../assets/icons/logo-light.svg"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

interface Props {
  activeTab: string
}

function TopMenu({ activeTab }: Props): ReactElement {
  const { t } = useTranslation()

  const { userDarkMode } = useSelector((state: AppState) => state.user)
  const themedLogo = userDarkMode ? logoDark : logoLight

  return (
    <header className="top">
      <h1>
        <Link to="/">
          <img
            className="logo"
            alt="logo"
            src={themedLogo}
            style={{ width: "190px", height: "80px", marginTop: "40px" }}
          />
        </Link>
      </h1>
      <ul className="nav">
        <li>
          <Link to="/" className={classNames({ active: activeTab === "swap" })}>
            {t("swap")}
          </Link>
        </li>
        <li>
          <Link
            to="/deposit"
            className={classNames({ active: activeTab === "deposit" })}
          >
            {t("deposit")}
          </Link>
        </li>
        <li>
          <Link
            to="/withdraw"
            className={classNames({ active: activeTab === "withdraw" })}
          >
            {t("withdraw")}
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={classNames({ active: activeTab === t("risk") })}
          >
            {t("risk")}
          </Link>
        </li>
        <li>
          <Link
            to="/tokenomics"
            className={classNames({ active: activeTab === t("DRV") })}
          >
            {t("DRV")}
          </Link>
        </li>        
      </ul>
      <Web3Status />
      <ThemeChanger />
    </header>
  )
}

export default TopMenu
