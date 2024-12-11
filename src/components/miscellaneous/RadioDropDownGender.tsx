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
import { updateQueryParam ,removeQueryParam } from "@/lib/utils"
// states
import {useDispatch,useSelector} from 'react-redux'
import {AppDispatch,RootState} from '@/lib/store'
import {setGender} from '@/lib/store/barChartSlice'
import {setCookie} from 'cookies-next'


export function RadioDropDownGender() {
 
  const router = useRouter()

  const dispatch:AppDispatch = useDispatch()

  const {selectedGender} = useSelector((state:RootState)=> state.barChart)

  const set_Gender = (gender:string | null) =>{

    if(gender){
      const url = updateQueryParam('gender', gender )
      dispatch(setGender(gender))
      router.push(url,{scroll:false})
      setCookie('gender',gender,{
        maxAge:43200,
        path:'/',
      })

    }else{
      const url =  removeQueryParam('gender')
      dispatch(setGender(gender))
      router.push(url,{scroll:false})
      setCookie('gender','',{
        maxAge:43200,
        path:'/',
      })
    }
    
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{!selectedGender? "Gender" : selectedGender}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedGender?selectedGender:'Gender'} onValueChange={setGender}>
          <DropdownMenuRadioItem value="Gender" onClick={() => set_Gender(null)}>All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Male" onClick={() => set_Gender('Male')}>Male</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Female" onClick={() => set_Gender('Female')}>Female</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
