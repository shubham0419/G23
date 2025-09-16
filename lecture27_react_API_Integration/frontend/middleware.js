import { NextResponse } from "next/server";

// public contains all the non-protective images or data -> (icons, logo)
const publicRoutes = ["/login","/signup","/public"]

export function middleware(request){
  const token = request.cookies.get("token").value;
  console.log(token,"token");
  const isPublic = false;

  publicRoutes.forEach((path)=>{
    if(request.nextUrl.pathName.startsWith(path)){
      isPublic = true;
    }
  })

  if(!token && !isPublic){
    return NextResponse.redirect(new URL("/login"),request.url);
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}