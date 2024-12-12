'use client'
import { useRef,useEffect } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/lib/store'
import { useSearchParams } from 'next/navigation';
import { setAge , setGender } from '@/lib/store/barChartSlice'

export default function StoreProvider({children}: {children: React.ReactNode}) {

  const storeRef = useRef<AppStore | null>(null)
  const searchParams = useSearchParams();

  const paramGender = searchParams.get('gender');
  const paramAge = searchParams.get('age');



  useEffect(()=>{

    if (!storeRef.current) {
      // Create the store instance the first time this renders
      storeRef.current = makeStore()
  
      if(paramAge) storeRef.current.dispatch(setAge(paramAge))
      if(paramGender) storeRef.current.dispatch(setGender(paramGender))
  
    }


  },[paramAge,paramGender,searchParams])

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()

  }

  return <Provider store={storeRef.current}>{children}</Provider>
}