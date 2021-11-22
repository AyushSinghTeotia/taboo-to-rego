import { BigNumber } from '@ethersproject/bignumber'
import { Token, TokenAmount } from 'quest-taboo-sdk'
import { useTokenContract } from '../hooks/useContract'
import { useSingleCallResult } from '../state/multicall/hooks'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
export function useTotalTabooSupply(): any | undefined {
    const contract = useTokenContract("0x1BE28AdF4ee250CBC9c6c80f9cAaC378085a440F", false)
    
    const totalSupply = useSingleCallResult(contract, 'balanceOf', ["0x3a660BC261A27b244606368e81C0D79F4b1bdc6e"])?.result?.[0]
    console.log("Called internally ", totalSupply)
    return totalSupply? totalSupply:undefined;
}
