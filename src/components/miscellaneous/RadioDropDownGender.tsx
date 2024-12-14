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
import {setCookie,hasCookie} from 'cookies-next'


export function RadioDropDownGender() {
 
  const router = useRouter()

  const dispatch:AppDispatch = useDispatch()

  const {selectedGender} = useSelector((state:RootState)=> state.barChart)

  const set_Gender = (gender:string | null) =>{

    const url:string = (gender ? updateQueryParam('gender', gender ) : removeQueryParam('gender'))
    dispatch(setGender(gender))
    router.push(url,{scroll:false})

    if(hasCookie('gender')){
      // if cookie permitted
      setCookie('gender',gender,{
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
        <DropdownMenuLabel>Select Gender</DropdownMenuLabel>
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
