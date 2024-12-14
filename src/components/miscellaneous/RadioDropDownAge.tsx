"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter} from 'next/navigation'
import { updateQueryParam,removeQueryParam } from "@/lib/utils"
// states
import {useDispatch,useSelector} from 'react-redux'
import {AppDispatch,RootState} from '@/lib/store'
import {setAge} from '@/lib/store/barChartSlice'
import {setCookie,hasCookie} from 'cookies-next'

export function RadioDropDownAge() {

  const router = useRouter()

  const dispatch:AppDispatch = useDispatch()

  const {selectedAge} = useSelector((state:RootState)=> state.barChart)

  const set_Age = (age:string | null) =>{

    const url:string = (age ?  updateQueryParam('age', age )  : removeQueryParam('age'));
    dispatch(setAge(age))
    router.push(url,{scroll:false})

    if(hasCookie('age')){
       // if cookie permitted
      setCookie('age',age,{
        maxAge:43200,
        path:'/',
      })
    }
  }



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{!selectedAge? "Age" : selectedAge}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select age</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedAge?selectedAge:'Age'} onValueChange={setAge}>
          <DropdownMenuRadioItem value="Age" onClick={() => set_Age(null)}>All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="15-25" onClick={() => set_Age('15-25')}>15-25</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value=">25" onClick={() => set_Age('>25')}>&gt;25</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
