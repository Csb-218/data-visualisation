'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from '@auth0/nextjs-auth0/client';
import { redirect } from "next/navigation";


const UserCard = () => {

  // const { user, isLoading, error } = useUser();
  
  // if (isLoading) return <div>Loading...</div>;

  // if (!user) redirect("/api/auth/login");
  
  // if (error) return <div>{error.message}</div>;


  
  return (
    <>
    <Avatar>
        <AvatarImage src={"https://github.com/shadcn.png"} width={100} height={100} />
        <AvatarFallback>CN</AvatarFallback>
    </Avatar>

    <p className='font-semibold'> Hey {}! 👋🏻</p>
    <h1 className='text-2xl font-bold'> Welcome to Charts 📈</h1>
    </>
  )
}

export default UserCard