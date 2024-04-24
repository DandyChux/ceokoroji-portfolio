import { NextResponse } from "next/server";

export function middleware(req: Request) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-url", req.url);

    return NextResponse.next({
        headers: requestHeaders
    });
}