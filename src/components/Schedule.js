/* eslint-disable react/prop-types */
import "./Schedule.scss"

import React, {
    useState,
    useEffect,
    Component 
} from 'react';

import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"

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
    Box,
    Button
} from "@chakra-ui/react"

import { LPs } from "../components/LPs"

const commify = (number) => {
    var nf = new Intl.NumberFormat()
    return nf.format(number)
}

export const Schedule = ({
        ...props
    }) => {


    const { account } = useWeb3React()
    const gasOptions = { from:account, gasPrice:"5000000000", gasLimit:1e6 }

    return (
        <div className="escrow">
            <br />
            <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <Box w="100%" h="auto"  >
                    <br />
                    <h4 className="title">{"DAO Dashboard"}</h4></Box>
                <Box w="100%" h="10"  />
            </Grid>
            <br />
            <LPs lps={props.lps} />
            <Grid templateColumns="repeat(1, 1fr)" gap={2}>
                <Box w="100%" h="auto"   >
                    <br />
                        <h4 className="title">{"Reward Escrow"}</h4>
                        <br />
                        <span className="subtitle">{"Vest your DRV staking rewards in escrow"}</span>
                    <br /><br />
                    {!props.data.total || props.data.total.length === 0 ? <><hr ></hr><br />No escrowed rewards</>: 
                        <Table variant="simple" width="100%"> 
                        <Thead>
                            <Tr>
                                <Th>Vesting date</Th>
                                <Th className="alignRight">Quantity</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {props.data && props.data.schedule ? props.data.schedule.map((row, i) => {
                            return (
                                <Tr key={i}>
                                    <Td>
                                        {(row.date).toDateString()}
                                    </Td>
                                    <Td className="alignRight">
                                        {commify(Number(row.quantity).toFixed(3).toString()) } 
                                    </Td>
                                    <Td>{"DRV"}</Td>
                                </Tr>
                            );
                        }): null}
                        </Tbody>
                    </Table>                
                    }
                    { //props.data.canVest ? 
                        <div>
                            <br />
                            <Button
                                variant="primary"
                                size="lg"
                                className="btnVest"
                                disabled={!props.data.canVest}
                                onClick={(): void => {
                                    // @ts-ignore
                                    void props.data.RewardEscrowContract?.vest( gasOptions )
                                }}                                                   
                                >
                                {"Vest all"}
                            </Button>                
                        </div> /*: <></> */}
                </Box>
            </Grid>        
            <br />
        </div>
    );
}