import "../styles/global.scss"

import { BLOCK_TIME, BTC_POOL_NAME, STABLECOIN_POOL_NAME } from "../constants"
import React, {
  ReactElement,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react"
import { Route, Switch, useLocation } from "react-router-dom"

import { AppDispatch } from "../state"
import ConnectWallet from "../components/ConnectWallet"
import Deposit from "./Deposit"
import Modal from "../components/Modal"
import Pools from "./Pools"
import Risk from "./Risk"
import Swap from "./Swap"
import Tokenomics from "./Tokenomics"
import Claim from "./Claim"
import ToastsProvider from "../providers/ToastsProvider"
import Web3ReactManager from "../components/Web3ReactManager"
import Withdraw from "./Withdraw"
import fetchGasPrices from "../utils/updateGasPrices"
import fetchTokenPricesUSD from "../utils/updateTokenPrices"
import { useActiveWeb3React } from "../hooks/"
import { useDispatch } from "react-redux"
import usePoller from "../hooks/usePoller"
import styled from 'styled-components';
import { useSelector } from "react-redux"
import { AppState } from "../state"
import logoDark from "../assets/icons/logo-dark.svg"
import logoLight from "../assets/icons/logo-light.svg"
export default function App(): ReactElement {
  const dispatch = useDispatch<AppDispatch>()
  const { pathname } = useLocation()
  const { account } = useActiveWeb3React()
  const [isModalOpen, setIsModalOpen] = useState(false)
  // show ConnectWallet modal on each new page if not connected to wallet
  useEffect(() => {
    const shouldShowModal = !account && pathname !== "/about" && pathname !== "/tokenomics"
    setIsModalOpen(shouldShowModal)
  }, [pathname, account])

  const fetchAndUpdateGasPrice = useCallback(() => {
    void fetchGasPrices(dispatch)
  }, [dispatch])
  const fetchAndUpdateTokensPrice = useCallback(() => {
    fetchTokenPricesUSD(dispatch)
  }, [dispatch])
  usePoller(fetchAndUpdateGasPrice, BLOCK_TIME)
  usePoller(fetchAndUpdateTokensPrice, BLOCK_TIME * 3)

  const Announcement = styled.div`
	width: 100%;
	display: block;
	background-color: #0E0D14;
	border-bottom: 2px solid #000;
	text-align: center;
	color: #46bf89;
	font-size: 1em;
	font-weight: bold;
	& a {
		padding-top: 10px;
		padding-bottom: 10px;
		display: block;
		color: #46bf89;
		font-weight: bold;
		text-decoration: none;
	}`;

  const { userDarkMode } = useSelector((state: AppState) => state.user)

	const bgColor = userDarkMode ? '#0E0D14' : 'white';
	const border = `2px solid ${ userDarkMode ? '#0E0D14' : 'white'}`;
  return (
    <Suspense fallback={null}>
      <Web3ReactManager>
        <ToastsProvider>
        <Announcement style={{ backgroundColor:`${bgColor}`, borderBottom: `${border}`}} >
					<a href="https://bit.ly/3e4jKjt" target="_blank" rel="noreferrer">
						DRV Token holder? Earn up to 350% APR by staking your tokens, read more by clicking here.
					</a>
				</Announcement>			
          <Modal
            isOpen={isModalOpen}
            onClose={(): void => setIsModalOpen(false)}
          >
            <ConnectWallet onClose={(): void => setIsModalOpen(false)} />
          </Modal>
          <Switch>
            <Route exact path="/" component={Swap} />
            <Route
              exact
              path="/deposit"
              render={(props) => <Pools {...props} action="deposit" />}
            />
            <Route
              exact
              path="/deposit/usd"
              render={(props) => (
                <Deposit {...props} poolName={STABLECOIN_POOL_NAME} />
              )}
            />
            <Route
              exact
              path="/deposit/btc"
              render={(props) => (
                <Deposit {...props} poolName={BTC_POOL_NAME} />
              )}
            />
            <Route
              exact
              path="/withdraw"
              render={(props) => <Pools {...props} action="withdraw" />}
            />
            <Route
              exact
              path="/withdraw/btc"
              render={(props) => (
                <Withdraw {...props} poolName={BTC_POOL_NAME} />
              )}
            />
            <Route
              exact
              path="/withdraw/usd"
              render={(props) => (
                <Withdraw {...props} poolName={STABLECOIN_POOL_NAME} />
              )}
            />
            <Route exact path="/about" component={Risk} />
            <Route exact path="/tokenomics" component={Tokenomics} />
            <Route exact path="/claim" component={Claim} />

          </Switch>
        </ToastsProvider>
      </Web3ReactManager>
    </Suspense>
  )
}
