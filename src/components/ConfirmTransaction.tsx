import "./ConfirmTransaction.scss"

import React, { ReactElement } from "react"
import { useTranslation } from "react-i18next"
import logo from "../assets/icons/logo-dark.svg"

function ConfirmTransaction(): ReactElement {
  const { t } = useTranslation()

  return (
    <div className="confirmTransaction">
      <img src={logo} style={{width:"200px"}} />

      <h3>
        {t("confirmTransaction")
          .split("\n")
          .map((line, key) => (
            <span key={key}>
              {line}
              <br />
            </span>
          ))}
      </h3>
    </div>
  )
}

export default ConfirmTransaction
