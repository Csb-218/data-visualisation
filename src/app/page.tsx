
'use client'

import { useUser, } from '@auth0/nextjs-auth0/client'
import  HorBar  from "@/components/charts/hor_bar";
import  Line_chart  from "@/components/charts/line_chart";
import UserCard from "@/components/miscellaneous/UserCard";
import Link from "next/link";
import { redirect} from 'next/navigation'


import CookieModal from '@/components/miscellaneous/CookieModal'


export default function Home() {

  const { user, isLoading, error } = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (!user) redirect("/api/auth/login");

  if (error) return <div>{error.message}</div>;

  return (
    (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center ">

          <CookieModal />
          <UserCard />
          <Link href="/api/auth/logout">Logout</Link>

          <HorBar />
          <Line_chart />


        </main>

      </div>
    )

  );
}

