
import "./Risk.scss"
import "../components/PoolInfoCard.scss"
import { useAllContracts } from "../hooks/useContract"


import TopMenu from "../components/TopMenu"
import { useTranslation } from "react-i18next"

import React, { ReactElement, Fragment, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import { formatEther, parseUnits } from "@ethersproject/units"
import { AbiItem, toWei } from 'web3-utils';
import ConfirmTransaction from "../components/ConfirmTransaction"
import InfiniteApprovalField from "../components/InfiniteApprovalField"
import { Schedule } from "../components/Schedule"

import classNames from "classnames"
import { useToast } from "../hooks/useToast"
import checkAndApproveTokenForTrade from "../utils/checkAndApproveTokenForTrade"
import { ethers, getDefaultProvider } from 'ethers'
import { addEmitHelpers } from "typescript"

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Container,
    Grid,
    GridItem,
    Box
} from "@chakra-ui/react"

import {
    THIS_REWARD_ESCROW_ABI,
    DERIVE_DAO_REWARD_ESCROW_ADDRESSES,
  } from "../constants"

//@ts-ignore
const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner()

function DAO(): ReactElement {

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

    const [allData, setAllData] = useState<any>({})
    const [lps, setLps] = useState<any>({})

    const { addToast, clearToasts } = useToast()
     
    useEffect(() => {
        async function fetchBalance() {
        setLps({ loading: true });    
        
        // @ts-ignore
        const balance = await OikosRewards?.balanceOf(account)
        // @ts-ignore
        const staked = await DrvRewards?.balanceOf(account)
        // @ts-ignore
        const rewards = await DrvRewards?.earned(account)
        // @ts-ignore
        const oldRewards = await OldDrvRewards?.earned(account)        
        // @ts-ignore
        const drvBalance = await DRV?.balanceOf(account)

        // @ts-ignore
        const LPBalance = formatEther(balance)
        // @ts-ignore
        const Staked = formatEther(staked)
        // @ts-ignore
        const Rewards = formatEther(rewards)
        // @ts-ignore
        const OldRewards = formatEther(oldRewards)
        // @ts-ignore
        const DrvBalance = formatEther(drvBalance)

        // @ts-ignore
        const PoolName = "Stablecoin Pool"

        //@ts-ignore
        setLps({ LPBalance, Staked, Rewards, OldRewards, DrvBalance, PoolName, DrvRewards, OldDrvRewards});
        }
        void fetchBalance()
        //@ts-ignore
        //setInterval(fetchBalance, 30000); 
    }, [])

    useEffect(() => {        
        //@ts-ignore
        const bigNumberFormatter = value => Number(ethers.utils.formatEther(value));

        const getVestingData = async () => {
                const RewardEscrowContract = new ethers.Contract(
                    DERIVE_DAO_REWARD_ESCROW_ADDRESSES[56], 
                    THIS_REWARD_ESCROW_ABI, 
                    signer
                )
                const schedule = [];
                let total = 0;
                let canVest = false;
                const currentUnixTime = new Date().getTime();
                setAllData({ loading: true });
                const result = await RewardEscrowContract.checkAccountSchedule(account) 
                for (let i = 0; i < result.length; i += 2) {
                    const quantity = bigNumberFormatter(result[i + 1]);
                    total += Number(quantity);
                    if (!result[i].isZero() && quantity) {
                        if (result[i] * 1000 < currentUnixTime) {
                            canVest = true;
                        }
                        schedule.push({
                            date: new Date(Number(result[i]) * 1000),
                            quantity,
                        });
                    }
                }
                setAllData({ schedule, total, loading: false, canVest, RewardEscrowContract});
            };
            getVestingData().catch(err => {
                console.error(err)
            })
        }, [])


    const renderContent = () => {
        //@ts-ignore
    	if (allData.loading || lps.loading) {
            return (
                <>
                <TopMenu activeTab={"DAO"} />
                    <Container maxW="container.lg">
                        <div><br /><br/>{"Loading"}</div>
                    </Container>
                </>
            );
        }
        return (
            <>
                <TopMenu activeTab={"DAO"} />
                    <Container maxW="container.lg">
                        <Schedule data={allData} lps={lps} />
                    </Container>
            </>
        )
    }

    return (
        <div> 
            <div className="content">{renderContent()}</div>
        </div>
    )
}

export default DAO