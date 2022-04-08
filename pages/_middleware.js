import { verify } from "@tsndr/cloudflare-worker-jwt";
import { NextResponse } from "next/server";

const secret = process.env.JWT_SECRET;

export default function middleware(req) {
  const { cookies } = req;

  const jwt = cookies.IdeeROJWT;

  const protectedURLS = ["/feed"];
  const publicURLS = ["/", "/signup", "/signin"];

  const url = req.nextUrl.clone();

  if (url.pathname.includes("/admin")) {
    console.log("admin");
  }

  if (protectedURLS.includes(url.pathname)) {
    if (jwt === undefined) {
      url.pathname = "/";
      return NextResponse.rewrite(url);
    }

    try {
      verify(jwt, secret);
      return NextResponse.next();
    } catch (error) {
      url.pathname = "/";
      return NextResponse.rewrite(url);
    }
  } else if (publicURLS.includes(url.pathname)) {
    if (jwt) {
      try {
        verify(jwt, secret);
        url.pathname = "/feed";
        return NextResponse.rewrite(url);
      } catch (error) {
        return NextResponse.next();
      }
    } else return NextResponse.next();
  }

  return NextResponse.next();
}
