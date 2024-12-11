import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import axios from 'axios'
 
export async function middleware(request: NextRequest) {

  const response:NextResponse = NextResponse.next();
  
  const isAuthenticated = request.cookies.get('appSession')

  // if not authenticated
  if(!isAuthenticated){
    return NextResponse.redirect(new URL(`${process.env.AUTH0_BASE_URL}/api/auth/login`,request.url))
  } 
    return response


}

export const config = {
    matcher: '/',
  }