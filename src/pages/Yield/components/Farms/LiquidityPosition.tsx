import React, { useState } from 'react'
import { formattedNum, formattedPercent } from '../../../../utils'
import { DoubleLogo, Paper } from '../../components'
import DEFAULT_TOKEN_LIST from 'quest-tabooswap-default-token-list'
import { MasterChefV1Details, MasterChefV2Details, MiniChefDetails } from '../Details'
import { useActiveWeb3React } from '../../../../hooks/useActiveWeb3React'
import { ChainId } from 'quest-taboo-sdk'
import AsyncTokenIcon from '../../../../kashi/components/AsyncTokenIcon'

type LiquidiPositionProps={
    farm: any,
    index: number,
}

const LiquidityPosition = (props:LiquidiPositionProps) => {
    const [expand, setExpand] = useState<boolean>(false)
    const { chainId } = useActiveWeb3React()

    return (
        <>
            {props.farm.type='LP' && (
                <Paper className="bg-dark-800">
                    {process.env.NODE_ENV === 'development' && (
                        <div className="text-xs">
                            {/* <div>{props.farm.tokens[0].address}</div>
                            <div>{props.farm.tokens[1].address}</div> */}
                        </div>
                    )}
                    <div
                        className="bg-dark-850 grid grid-cols-3 md:grid-cols-4 px-4 py-2  cursor-pointer select-none rounded rounded-b-none"
                        onClick={() => setExpand(!expand)}
                    >

                        <div className="text-sm sm:text-base font-semibold">
                            {props.farm && props.farm.tokens[0].symbol + '-' + props.farm.tokens[1].symbol+ ' '+ props.index}
                        </div> 
                        <div className="hidden md:block text-sm sm:text-base ml-4 text-gray-500 text-right">
                            {/* TODO: remove hard coding */}
                            {props.farm && props.farm.contract === 'masterchefv2' ? 'SUSHI & ALCX' : 'SUSHI'}
                        </div>
                        <div className="text-gray-500 text-sm sm:text-base text-right">
                            {formattedNum(props.farm.tvl, true)}
                        </div>
                        <div className="font-semibold text-sm sm:text-base text-right">
                            {props.farm.roiPerYear > 100 ? '10000%+' : formattedPercent(props.farm.roiPerYear * 100)}
                        </div>
                    </div>
                    <div
                        className="grid grid-cols-3 md:grid-cols-4 py-4 px-4 cursor-pointer select-none rounded text-sm"
                        onClick={() => setExpand(!expand)}
                    >
                        <div className="col-span-1 flex items-center">
                            {chainId === ChainId.MATIC ? (
                                <div className="md:col-span-3 flex flex-col space-y-2">
                                    <div className="mr-4 flex flex-row space-x-2 items-center">
                                        <div>
                                            <AsyncTokenIcon
                                                address={props.farm.tokens[0].address}
                                                chainId={chainId}
                                                className="block w-10 h-10 rounded-sm"
                                            />
                                        </div>
                                        <div>
                                            <AsyncTokenIcon
                                                address={props.farm.tokens[1].address}
                                                chainId={chainId}
                                                className="block w-10 h-10 rounded-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="mr-4">
                                    <DoubleLogo
                                        a0={props.farm.tokens[0].symbol}
                                        a1={props.farm.tokens[1].symbol}
                                        size={40}
                                        margin={true}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="md:col-span-1 hidden md:flex flex-row space-x-2 justify-end items-center ml-4">
                            <div>
                                {/* TODO: remove hard coding */}
                                {props.farm && (
                                    <>
                                        {/* <div className="text-gray-500 text-right font-semibold text-xs">
                                            {formattedNum(props.farm.sushiRewardPerDay)} SUSHI per day
                                        </div>
                                        <div className="text-gray-500 text-right font-semibold text-xs">
                                            {formattedNum(props.farm.secondaryRewardPerDay)} WMATIC per day
                                        </div> */}
                                    </>
                                )}
                                {props.farm &&(
                                    <>
                                        {/* <div className="text-gray-500 text-right font-semibold text-xs">
                                            {formattedNum(props.farm.sushiRewardPerDay)} SUSHI per day
                                        </div>
                                        <div className="text-gray-500 text-right font-semibold text-xs">
                                            {formattedNum(props.farm.secondaryRewardPerDay)} ALCX per day
                                        </div> */}
                                    </>
                                )}
                                {props.farm  && (
                                    <>
                                        <div className="text-gray-500 text-right font-semibold text-sm sm:text-sm">
                                            {formattedNum(props.farm.sushiRewardPerDay)} TABOO
                                        </div>
                                        <div className="text-gray-500 text-right text-xs">per day</div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="md:col-span-1 flex justify-end items-center">
                            <div>
                                <div className="text-right">{formattedNum(props.farm.tvl, true)} </div>
                                <div className="text-gray-500 text-right font-semibold text-sm sm:text-sm">
                                    {formattedNum(props.farm.slpBalance / 1e18, false)} SLP
                                </div>
                                <div className="text-gray-500 text-right text-xs">Market Staked</div>
                            </div>
                        </div>
                        <div className="md:col-span-1 flex justify-end items-center">
                            <div>
                                <div className="text-gray-500 text-right font-semibold text-base sm:text-lg">
                                    {props.farm.roiPerYear > 100 ? '10000%+' : formattedPercent(props.farm.roiPerYear * 100)}
                                    {/* {formattedPercent(farm.roiPerMonth * 100)}{' '} */}
                                </div>
                                <div className="text-gray-500 text-right text-xs">annualized</div>
                                {/* <div className="text-gray-500 text-right text-xs">per month</div> */}
                            </div>
                        </div>
                    </div>

                    {expand && (
                        <MasterChefV1Details
                            pid={0}
                            pairAddress={props.farm.liquidityToken.address}
                            pairSymbol={props.farm.tokens[0].symbol}
                            token0Address={props.farm.tokens[0].address}
                            token1Address={props.farm.tokens[1].address}
                            type={'LP'}
                        />
                    )}
                    {expand && props.farm.contract === 'masterchefv2' && (
                        <MasterChefV2Details
                            pid={props.farm.pid}
                            pairAddress={props.farm.liquidityToken.address}
                            pairSymbol={props.farm.symbol}
                            token0Address={props.farm.liquidityPair.token0.id}
                            token1Address={props.farm.liquidityPair.token1.id}
                            type={'SLP'}
                        />
                    )}
                    {expand && props.farm.contract === 'minichef' && (
                        <MiniChefDetails
                            pid={props.farm.pid}
                            pairAddress={props.farm.pairAddress}
                            pairSymbol={props.farm.symbol}
                            token0Address={props.farm.liquidityPair.token0.id}
                            token1Address={props.farm.liquidityPair.token1.id}
                            type={'SLP'}
                        />
                    )}
                </Paper>
            )}
        </>
    )
}

export default LiquidityPosition
