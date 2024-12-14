'use client'
import {useEffect} from 'react';

// import Cover from '../../Assets/Images/Cover.jpg'
import {GoogleLogin } from '@react-oauth/google';
import jwt from 'jsonwebtoken'
import {setCookie,hasCookie} from 'cookies-next'
import {useRouter} from 'next/navigation'
import {user} from '../../types'
const Login = () => {

  const router = useRouter()
  const credential = hasCookie('credential')

  
  useEffect(()=>{
    console.log(credential)
    if(credential){
      setCookie('credential',credential)
      router.replace('/',{scroll:false})
    }

  },[credential,router])

  return (
    <>
    <div className="flex flex-wrap w-full">
      <div className="flex flex-col w-full ">

        <div className="flex flex-col justify-center px-8 pt-8 my-auto items-center  ">
          <p className="text-3xl text-center">
            Welcome to Charts
          </p>
          <form className="flex flex-col pt-3 md:pt-8" >

            <div className='my-2  flex flex-row justify-center '>

              <GoogleLogin
                onSuccess={async(credentialResponse) => {
                  const {email,name,picture} = jwt.decode(credentialResponse.credential!) as {[key:string]:string}
                  const {credential} = credentialResponse

                  if(credential){
                    const user:user = {
                    name :name,
                    email:email,
                    picture:picture,
                    credential:credential.toString()
                    }
                    console.log(user)

                    console.log(credentialResponse);
                    await setCookie('credential',user)
                    router.replace('/',{scroll:false})
                  }

                }}
                onError={() => {
                  console.log('Login Failed')
                }}
              />


            </div>

          </form>
          <div className="pt-12 pb-12 text-center">
            <p>
             Please login using Google
            </p>
          </div>
        </div>
      </div>
     
    </div>
    </>

    

  );
};

export default Login;