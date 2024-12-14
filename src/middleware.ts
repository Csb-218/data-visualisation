import { NextResponse, NextRequest } from 'next/server'


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

   const pathname =  request.nextUrl.pathname
   const credential =  request.cookies.get('credential')
   const response =  NextResponse.next()


   if(!credential){

      if(pathname === '/') return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/auth`))
      
      return response
   } 

  
   return response

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        // '/video/:id*','/channel/:channelId*','/category/:category*','/search/:search_query*'
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ],
}