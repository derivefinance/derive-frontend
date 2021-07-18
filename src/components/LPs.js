/* eslint-disable react/prop-types */
import "./LPs.scss"

import React, {
    useState,
    useEffect
} from 'react';

import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import { AbiItem, toWei } from 'web3-utils';

import {
    Table,
    Tr,
    Grid,
    GridItem,
    Box,
    Tbody,
    Button,
    Center
} from "@chakra-ui/react"

const commify = (number) => {
    var nf = new Intl.NumberFormat()
    return nf.format(number)
}
    
export const LPs = ({
        ...props
    }) => {
        const { account } = useWeb3React()
        const gasOptions = { from:account, gasPrice:"5000000000", gasLimit:1e6 }
        return (
            props.lps.LPBalance > 0 ? 
            <div className="content">
            <div className="poolInfoCard">
            <Grid templateColumns="repeat(1, 1fr)" gap={0}>
                <Box className="infoBox" w="100%" h="auto">
                    <Table>
                        <Tbody>
                            <Tr>
                                <td colSpan="2">
                                    <span className="header">{"Voting power"}</span>
                                </td>
                            </Tr>
                            <Tr>
                                <td colSpan="2">&nbsp;</td>
                            </Tr>
                            <Tr>
                                <td colSpan="2">{commify(Number(props.lps.DrvBalance).toFixed(3))} {"DRV"}</td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Box>
            </Grid>
            <h4>{"Staking"}</h4>
            <div className="info">
                <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                    <Box w="100%" h="auto" className="infoBox" >
                        <Table>
                            <Tbody>
                                <Tr>
                                    <td colSpan="2">
                                        <span style={{fontSize:"20px"}}>
                                            {props.lps.PoolName}
                                        </span>
                                    </td>
                                    </Tr>
                                <Tr>
                                    <td colSpan="2">&nbsp;</td>
                                </Tr>
                                <Tr>
                                    <td><b>Balance</b>&nbsp;</td>
                                    <td>
                                        {commify(Number(props.lps.LPBalance).toFixed(3))} {"LP"}
                                    </td>
                                </Tr>
                                <Tr>
                                    <td>
                                        <b>Staked</b>&nbsp;
                                    </td>
                                    <td>
                                        {commify(Number(props.lps.Staked).toFixed(3))} {"LP"}
                                    </td>
                                </Tr>
                                <Tr>
                                    <td>
                                        <b>Rewards</b>&nbsp;
                                    </td>
                                    <td>
                                        {commify(Number(props.lps.Rewards).toFixed(3))} {"DRV"}
                                    </td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </Box>
                    <Box w="100%" h="auto" bg="var(--background-element)" className="infoBoxBtn"  >
                    <div className="twoColumnA" >
                        <div className="infoItem">
                        
                            <Button 
                                variant="primary"
                                size="lg"
                                className="btn"
                                disabled={Number(props.lps.LPBalance) == 0 || Number(props.lps.Staked) > 0} 
                                // @ts-ignore
                                onClick={(): void => {
                                    // @ts-ignore
                                    void props.lps.DrvRewards?.stake( toWei(`${props.lps.LPBalance}`), gasOptions )
                                }}                        
                            >
                            {"Stake"}
                            </Button>
                        </div>
                        <div className="infoItem">
                            <Button
                                variant="primary"
                                size="lg"
                                className="btn"
                                disabled={Number(props.lps.Rewards) == 0}
                                onClick={(): void => {
                                    // @ts-ignore
                                    void props.lps.DrvRewards?.getReward( gasOptions )
                                }}                        
                            >
                            {"Claim"}
                            </Button>
                        </div> 
                        <div className="infoItem">
                            <Button
                                variant="primary"
                                size="lg"
                                className="btn"
                                disabled={Number(props.lps.Staked) == 0}
                                onClick={(): void => {
                                    // @ts-ignore
                                    void props.lps.DrvRewards?.withdraw( toWei(`${props.lps.Staked}`), gasOptions )
                                }}                           
                            >
                            {"Unstake"}
                            </Button>
                        </div>
                        <div className="infoItem">
                        { props.lps.OldRewards > 0 ? 
                            <div>
                            <Button
                                variant="primary"
                                size="lg"
                                className="btnRed"
                                onClick={(): void => {
                                    // @ts-ignore
                                    void props.lps.OldDrvRewards?.withdraw( toWei(`${props.lps.Staked}`), gasOptions)
                                }}                                                   
                                >
                                {"Migrate"}
                            </Button>                
                            </div> : <></> }                            
                        </div>

                        {/*<div className="infoItem">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="btn"
                                    disabled={Number(StakedBalance) == 0}
                                    onClick={(): void => {
                                        // @ts-ignore
                                        void props.lps.DrvRewards?.exit( gasOptions )
                                    }}                                                   
                                    >
                                {"Exit"}
                                </Button>
                                </div>   */}       

                        </div>
                        <br />
                        {/* props.lps.oldRewards > 0 ? <div>
                            <p>The old contract suffered from a bug and we deployed a new version. It appears you still have unclaimed rewards on the old contract, claim now and stake again.</p>
                            <br />
                            <Button
                                variant="primary"
                                size="lg"
                                className="btn"
                                onClick={(): void => {
                                    // @ts-ignore
                                    void props.lps.DrvRewards?.exit( gasOptions )
                                }}                                                   
                                >
                                {"Claim All"}
                            </Button>                
                            </div> : <></> */}
                    </Box>
                </Grid>
                { props.lps.OldRewards > 0 ? 
                    <p></p>
                    : <></>
                }

            </div>
           
            <div className="divider"></div>
            <br />
    
            </div>
            </div> : 
                <div className="content">
                    <div className="poolInfoCard">
                        <Grid templateColumns="repeat(1, 1fr)" gap={0}>
                            <Box className="infoBox" w="100%" h="auto">
                                <Table>
                                    <Tbody>
                                        <Tr>
                                            <td colSpan="2">
                                                <span className="header">{"Voting power"}</span>
                                            </td>
                                        </Tr>
                                        <Tr>
                                            <td colSpan="2">&nbsp;</td>
                                        </Tr>
                                        <Tr>
                                            <td colSpan="2">{commify(Number(0).toFixed(3))} {"DRV"}</td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </Box>
                        </Grid>
                    </div>
                </div>
            );
        }