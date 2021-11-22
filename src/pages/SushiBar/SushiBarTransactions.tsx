import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import BalanceCard from './BalanceCard'
import { Button } from '../../components'
import { ChevronLeft } from 'react-feather'
import { ChainId } from 'quest-taboo-sdk'
import { SUSHI, XSUSHI, xTABOO ,TABOO} from '../../constants'
import useTokenBalance from '../../hooks/useTokenBalance'
import { useHistory } from 'react-router-dom'
import TransactionsPanel from './TransactionsPanel'

const mock = {
    totalGain: 75.72,
    avgBalStaked: 468.48
}

export default function SushiBarTransactions() {
    const theme = useContext(ThemeContext)

    const sushiBalance = useTokenBalance(TABOO[ChainId.ROPSTEN]?.address ?? '')
    const xSushiBalance = useTokenBalance(xTABOO[ChainId.ROPSTEN]?.address ?? '')

    const history = useHistory()

    return (
        <div style={{ flexBasis: 'fit-content' }} className="flex flex-col w-full">
            <div className="flex justify-center w-full">
                <div className="flex flex-col w-full max-w-screen-md">
                    <div className="mb-8 md:mb-3">
                        <Button size="small" className="flex items-center pl-0" onClick={() => history.goBack()}>
                            <ChevronLeft strokeWidth={2} size={18} color={theme.white} />
                            <span className="ml-1 text-high-emphesis">Go Back</span>
                        </Button>
                    </div>

                    <div className="md:hidden w-full max-w-xl mb-10">
                        <BalanceCard sushiBalance={sushiBalance} xSushiBalance={xSushiBalance} />
                    </div>

                    <div className="text-h5 mb-5 md:mb-3 text-high-emphesis">Your History</div>
                </div>
                <div className="hidden md:block w-72 h-full" />
            </div>
            <div className="flex flex-nowrap justify-center flex-row-reverse w-full">
                <div className="hidden md:block h-full w-72 mb-10 ml-6 mt-16">
                    <BalanceCard sushiBalance={sushiBalance} xSushiBalance={xSushiBalance} />
                </div>

                <div className="flex flex-1 max-w-screen-md flex-col mb-20 md:mb-0">
                    <TransactionsPanel />

                    <div className="hidden md:flex justify-between text-caption mt-4">
                        <div className="flex items-center">
                            <p className="text-primary font-bold">Total gain:&nbsp;</p>
                            <p className="text-high-emphesis font-bold">{`${mock.totalGain} TABOO`}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="text-primary">Time weighted average balance staked:&nbsp;</p>
                            <p className="text-high-emphesis font-bold">{`${mock.avgBalStaked} TABOO`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
