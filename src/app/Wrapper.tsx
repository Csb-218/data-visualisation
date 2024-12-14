
'use client'

import {useEffect,Suspense} from 'react'
import { useSearchParams } from 'next/navigation';
import { setAge , setGender } from '@/lib/store/barChartSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch} from '@/lib/store'

function WrapperComponent({ children }: {
    children: React.ReactNode
  }) {

   const searchParams = useSearchParams();
   const dispatch:AppDispatch = useDispatch()

  const paramGender = searchParams.get('gender');
  const paramAge = searchParams.get('age');


    useEffect(()=>{
  
        if(paramAge) dispatch(setAge(paramAge))
        if(paramGender) dispatch(setGender(paramGender))

    },[paramAge,paramGender,dispatch])

  return <>{children}</>

}

export default function Wrapper({ children }: {
    children: React.ReactNode
  }){

    return(
         <Suspense>
            <WrapperComponent>
                {children}
            </WrapperComponent>
        </Suspense>
    )
}
