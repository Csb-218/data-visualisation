
'use client'


import  HorBar  from "@/components/charts/hor_bar";
import  Line_chart  from "@/components/charts/line_chart";
import UserCard from "@/components/miscellaneous/UserCard";
import CookieModal from '@/components/miscellaneous/CookieModal'
import {Button} from '@/components/ui/button'
import { Share2 } from "lucide-react"
import  {deleteCookie} from 'cookies-next'
import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function Home() {


   const router = useRouter()

   const handleShareClick = () => {
    const currentUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl)
        .then(() => {
          alert('URL copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy URL: ', err);
        });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('URL copied to clipboard!');
    }
  };

   
  // if (isLoading) return <div>Loading...</div>;

  // if (!user) redirect("/api/auth/login");

  // if (error) return <div>{error.message}</div>;

  return (
    (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen px-2 pb-20 gap-16  font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center ">

          <CookieModal />
          <UserCard />

           <Button onClick={()=>{
            deleteCookie('credential')
            googleLogout()
            router.refresh()
          }
            }>Logout</Button> 


          <HorBar />
          <Line_chart />

          <Button 
          className='mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:text-white ' 
          variant={"outline"} 
          onClick={handleShareClick}>
              <Share2/> Share your chart
            </Button> 

          


        </main>

      </div>
    )

  );
}

