import { InjectedConnector } from "@web3-react/injected-connector"
import { NetworkConnector } from "@web3-react/network-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import { WalletLinkConnector } from "@web3-react/walletlink-connector"
import { Web3Provider } from "@ethersproject/providers"
import { BscConnector } from "@binance-chain/bsc-connector"
 
const NETWORK_URL = process.env.REACT_APP_NETWORK_URL
export const NETWORK_CHAIN_ID: number = parseInt(
  process.env.REACT_APP_CHAIN_ID ?? "56",
)

if (typeof NETWORK_URL === "undefined") {
  throw new Error(
    `REACT_APP_NETWORK_URL must be a defined environment variable`,
  )
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL },
})

// eslint-disable-next-line @typescript-eslint/unbound-method
const { getProvider } = network

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(getProvider))
}

export const injected = new InjectedConnector({
  // mainnet, ropsten, rinkeby, goerli, kovan, local buidler
  // see: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md
  supportedChainIds: [56, 97, 1337],
})

export const bsc = new BscConnector({
  supportedChainIds: [56, 97],
})

export const walletconnect = new WalletConnectConnector({
  rpc: { [NETWORK_CHAIN_ID]: NETWORK_URL },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  // pollingInterval: POLLING_INTERVAL / 12000
})

export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: "derive",
})
