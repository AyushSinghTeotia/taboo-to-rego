import { useCallback, useEffect, useState } from 'react'
import { useMasterChefContract, useMiniChefV2Contract } from '../../../../hooks/useContract'
import _ from 'lodash'

function useFarms(){
    const masterChefContract = useMasterChefContract() // withSigner
    async function poolLen(){
        let len= await masterChefContract?.poolLength();
        return parseInt(len._hex)
    }
    
    const [farms_, setFarms_] = useState<any | undefined>()
    const farmData= useCallback(async ()=>{
        let len= await poolLen();
        let pa:any[]=[]
        let i;
        for( i=0;i<len;i++){
            pa[i]= await  masterChefContract?.lpToken(i);  
        }
        const result = await Promise.all(pa);
        console.log("ADdress", result);

        return result;
    },[])
    useEffect(() => {
        const fetchData = async () => {
            const results = await Promise.all([farmData()])
            const combined = _.concat(results[0])
            // const sorted = orderBy(combined, ['pid'], ['desc'])
            setFarms_(combined)
        }
        fetchData()
    }, [farmData])

    return farms_
}

export default useFarms