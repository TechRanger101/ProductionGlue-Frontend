import {NextRequest, NextResponse} from "next/server";

export async function GET (request: NextRequest, { params }: { params: { slug: string } }){
    const paramGreeting = request.nextUrl.searchParams.get('user')
    console.log(params)
    console.log("access_token")
    console.log(paramGreeting)
    const greeting = "Hello World!!"
    const json = {
        greeting
    };
    
    return NextResponse.json(json);
}
