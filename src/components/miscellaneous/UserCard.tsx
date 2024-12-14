'use client'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCookie ,CookieValueTypes } from 'cookies-next'
import { user } from '@/types'


const UserCard = () => {

  const [user, setUser] = useState<user | null>(null)



  useEffect(() => {

    async function getCredential() {

      const credential:CookieValueTypes = await getCookie('credential') 

      if (credential && !user) {
        const user:user = JSON.parse(credential)
        console.log(user)
        setUser(user)
      }
    }
    getCredential()
  }, [user])

  


  return (
    user &&
    <>
      <Avatar>
        <AvatarImage src={`${user.picture}`} width={100} height={100} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <p className='font-semibold'> Hey { user.name }! 👋🏻</p>
      <h1 className='text-2xl font-bold'> Welcome to Charts 📈</h1>
    </>
  )
}

export default UserCard