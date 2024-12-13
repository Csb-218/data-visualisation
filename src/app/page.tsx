
'use client'

// import { useUser, } from '@auth0/nextjs-auth0/client'
import  HorBar  from "@/components/charts/hor_bar";
import  Line_chart  from "@/components/charts/line_chart";
import UserCard from "@/components/miscellaneous/UserCard";
// import Link from "next/link";
import { Button } from "@/components/ui/button"
import {  signIn,signOut,useSession } from 'next-auth/react'

import CookieModal from '@/components/miscellaneous/CookieModal'


export default function Home() {

  const {status} = useSession()



  if (status === 'loading') return <div>Loading...</div>;

  if (status === 'unauthenticated') 
    return(
    <div >
      <Button variant="secondary"  onClick={()=>signIn()}>Login</Button>
      
    </div>
  )
    



  return (
    (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center ">

          <CookieModal />
          <UserCard />
          <Button variant="secondary"  onClick={()=>signOut()}>Logout</Button>
          <HorBar />
          <Line_chart />


        </main>

      </div>
    )

  );
}

