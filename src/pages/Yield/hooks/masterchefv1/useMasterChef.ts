import { ethers } from 'ethers'
import { useActiveWeb3React } from '../../../../hooks/useActiveWeb3React'
import { useMasterChefContract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useTransactionAdder } from '../../../../state/transactions/hooks'

const useMasterChef = () => {
    const addTransaction = useTransactionAdder()
    const masterChefContract = useMasterChefContract() // withSigner
    // const m =async ()=>{
    //     const l =await masterChefContract?.lpToken(1)
    //     console.log("smdsa", l);
        
    // }
    // m();
    
    const { account, chainId } = useActiveWeb3React()
    // Deposit
    const deposit = useCallback(
        async (pid: number, amount: string, name: string, decimals = 18) => {
            // KMP decimals depend on asset, SLP is always 18
            // console.log('depositing...', pid, amount)
            try {
                const tx = await masterChefContract?.deposit(pid, ethers.utils.parseUnits(amount, decimals), account)
                return addTransaction(tx, { summary: `Deposit ${name}` })
            } catch (e) {
                console.error(e)
                return e
            }
        },
        [addTransaction, masterChefContract]
    )

    // Withdraw
    const withdraw = useCallback(
        async (pid: number, amount: string, name: string, decimals = 18) => {
            try {
                const tx = await masterChefContract?.withdraw(pid, ethers.utils.parseUnits(amount, decimals), account)
                return addTransaction(tx, { summary: `Withdraw ${name}` })
            } catch (e) {
                console.error(e)
                return e
            }
        },
        [addTransaction, masterChefContract]
    )

    const harvest = useCallback(
        async (pid: number, name: string) => {
            try {
                const tx = await masterChefContract?.deposit(pid, '0', account)
                return addTransaction(tx, { summary: `Harvest ${name}` })
            } catch (e) {
                console.error(e)
                return e
            }
        },
        [addTransaction, masterChefContract]
    )

    return { deposit, withdraw, harvest }
}

export default useMasterChef
