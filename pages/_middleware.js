import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";



export async function middleware(req){
  const token = await getToken({req, secureCookie: process.env.NEXTAUTH_URL?.startsWith("https://") ?? !!process.env.VERCEL_URL});
  const{pathname}=req.nextUrl

  // allow the request if the following it's true
  // if token exist 
  if(pathname.includes('/api/auth') || token){
      return NextResponse.next();
  }

  //redirect login if they dont have a token

  if(!token && pathname !== '/login') {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`);
  }
}