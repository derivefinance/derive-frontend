
import "./Risk.scss"
import "../components/PoolInfoCard.scss"
import { useAllContracts } from "../hooks/useContract"

import React, { ReactElement, useState, useEffect } from "react"
import { Button, Center } from "@chakra-ui/react"

import TopMenu from "../components/TopMenu"
import { useTranslation } from "react-i18next"

import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import { formatEther, parseUnits } from "@ethersproject/units"
import { AbiItem, toWei } from 'web3-utils';
import ConfirmTransaction from "../components/ConfirmTransaction"
import InfiniteApprovalField from "../components/InfiniteApprovalField"
import classNames from "classnames"
import { useToast } from "../hooks/useToast"
import checkAndApproveTokenForTrade from "../utils/checkAndApproveTokenForTrade"

function Claim(): ReactElement {
    const { t } = useTranslation()
    const { account } = useWeb3React()
    
    const allContracts = useAllContracts() 
    // @ts-ignore
    const OikosRewards = allContracts.OikosRewards
    // @ts-ignore
    const DrvRewards = allContracts.DrvRewards
    // @ts-ignore
    const OldDrvRewards = allContracts.OldDrvRewards
    // @ts-ignore
    const DRV = allContracts.DRV
     
    const [LPBalance, setLPBalance] = useState<any>(0)
    const [StakedBalance, setStakedBalance] = useState<any>(0)
    const [Rewards, setRewards] = useState<any>(0)
    const [oldRewards, setoldRewards] = useState<any>(0)

    const [DRVBalance, setDRVBalance] = useState<any>(0)

    const { addToast, clearToasts } = useToast()
 
    const gasOptions = { from:account, gasPrice:"5000000000", gasLimit:1e6 }

    useEffect(() => {
        async function fetchBalance() {
        // @ts-ignore
        const balance = await OikosRewards?.balanceOf(account)
        // @ts-ignore
        const staked = await DrvRewards?.balanceOf(account)
        console.log(staked?.toString())
        // @ts-ignore
        const rewards = await DrvRewards?.earned(account)
        // @ts-ignore
        const oldRewards = await OldDrvRewards?.earned(account)        
        // @ts-ignore
        const drvBalance = await DRV?.balanceOf(account)

        // @ts-ignore
        setLPBalance(formatEther(balance))
        // @ts-ignore
        setStakedBalance(formatEther(staked))
        // @ts-ignore
        setRewards(formatEther(rewards))
        // @ts-ignore
        setoldRewards(formatEther(oldRewards))        
        // @ts-ignore
        setDRVBalance(formatEther(drvBalance))
        }
        void fetchBalance()
    }, [])

    useEffect(() => {
        async function checkForApproval() {
        // @ts-ignore

        }
        void checkForApproval()
    }, [])
        console.log(oldRewards)
    return (
        <div className="riskpage">
        <TopMenu activeTab={"Claim"} />

        <div className="content">

        
            <p>Are you a stablecoin LP provider? Maximize your yield farming by staking your Oikos LP tokens and obtain DRV rewards.
            Here you can stake your tokens, claim rewards and exit completely. <br /><br /><label style={{color:"red",fontWeight:"bold"}}>Warning, do not unstake your deriveUSD from Oikos Minter while staking on this page. Your rewards would be reset and you would lose your earnings.</label></p>

            <div className="poolInfoCard">
        <h4>{"Dashboard"}</h4>
        <div className="info">
            <div className="infoItem">
            <span className="label bold">{`${"Your balance"}: `}</span>
            <span className="value">{Number(LPBalance).toFixed(6)} {" LP"}</span>
            </div>
            <div className="infoItem">
            <span className="label bold">{`${"Currently staked"}: `}</span>
            <span className="value">{Number(StakedBalance).toFixed(6)}  {" LP"}</span>
            </div>
            <div className="infoItem">
            <span className="label bold">{`${"Rewards available"}: `}</span>
            <span className="value">{Number(Rewards).toFixed(6)}  {" DRV"}</span>
            </div>
            <div className="infoItem">
            <span className="label bold">{`${"Your DRV balance"}: `}</span>
            <span className="value">{Number(DRVBalance).toFixed(6)}  {" DRV"}</span>
            </div>          
            
            <div className="twoColumnA" >
            <div className="infoItem">
                    <Button
                        variant="primary"
                        size="lg"
                        width="160px"
                        disabled={Number(LPBalance) == 0 || Number(StakedBalance) > 0} 
                        onClick={(): void => {
                            // @ts-ignore
                            void checkAndApproveTokenForTrade(
                                // @ts-ignore
                                OikosRewards,
                                "0xe29eFb8D9a3499e25521705c17b10FA4B390A27c",
                                account,
                                parseUnits(`${LPBalance}`),
                                false,
                                {
                                  onTransactionStart: () => {
                                    // @ts-ignore
                                    return addToast(
                                      {
                                        type: "pending",
                                        title: `Approving spend for ${
                                          "OIKOS-LP"
                                        }`,
                                      },
                                      {
                                        autoDismiss: false, // TODO: be careful of orphan toasts on error
                                      },
                                    )
                                  },
                                  onTransactionSuccess: () => {
                                    DrvRewards?.stake( toWei(`${LPBalance}`), gasOptions )
                                    return addToast({
                                      type: "success",
                                      title: `Successfully approved spend for ${
                                        "OIKOS-LP"
                                      }`,
                                    })
                                    
                                  },
                                  onTransactionError: () => {
                                    //throw new Error("Your transaction could not be completed")
                                    console.log("Your transaction could not be completed")
                                    clearToasts()
                                    return addToast({
                                        type: "error",
                                        title: `Your transaction could not be completed`
                                        ,
                                      })
                                  },
                                },
                              ) 
                              
                          
                            
                        }}                        
                        >
                    {"Stake"}
                    </Button>
            </div>
            <div className="infoItem">
                    <Button
                        variant="primary"
                        size="lg"
                        width="160px"
                        disabled={Number(Rewards) == 0}
                        onClick={(): void => {
                            // @ts-ignore
                            DrvRewards?.getReward( gasOptions )
                        }}                        
                        >
                    {"Claim"}
                    </Button>
            </div> 
            <div className="infoItem">
                    <Button
                        variant="primary"
                        size="lg"
                        width="160px"
                        disabled={Number(StakedBalance) == 0}
                        onClick={(): void => {
                            // @ts-ignore
                            DrvRewards?.withdraw( toWei(`${StakedBalance}`), gasOptions )
                        }}                           
                        >
                    {"Unstake"}
                    </Button>
            </div>
            {/*<div className="infoItem">
                    <Button
                        variant="primary"
                        size="lg"
                        width="160px"
                        disabled={Number(StakedBalance) == 0}
                        onClick={(): void => {
                            // @ts-ignore
                            DrvRewards?.exit( gasOptions )
                        }}                                                   
                        >
                    {"Exit"}
                    </Button>




                      </div>   */}       
            </div>
            <br />
            { oldRewards > 0 ? <div>
                <p>The old contract suffered from a bug and we deployed a new version. It appears you still have unclaimed rewards on the old contract, claim now and stake again.</p>
                <br />
                <Button
                        variant="primary"
                        size="lg"
                        width="160px"
                        onClick={(): void => {
                            // @ts-ignore
                            OldDrvRewards?.exit( gasOptions )
                        }}                                                   
                        >
                        {"Claim All"}
                    </Button>                
                
            </div> : <></> }
        </div>
       
        <div className="divider"></div>
        <br />

        </div>
        </div>
        </div>
    )
}

export default Claim