import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { ddbDocClient } from "@/database/dynamodbClient";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { generateAccessAndRefreshTokens } from "@/utils/generateAccessAndRefreshTokens";
import {AES,enc} from 'crypto-js'

const FrontHashKey = process.env.NEXT_FRONT_HASH_KEY || "";


export async function POST(req: any, res: any) {
  const data = await req.json();
  const { email, password, name } = data;
  if (!email || !password || !name) {
    return NextResponse.json({
      body: {
        message: "failed",
        data: "email or password or name is missing",
        status: 400,
      },
    });
  }
  const response2 = await ddbDocClient.send(
    new GetCommand({
      TableName: "Users",
      Key: {
        email,
      },
    })
  );
  // console.log("get db response", response)
  if (response2.$metadata.httpStatusCode !== 200) {
    return NextResponse.json({
      body: {
        message: "failed",
        data: response2,
        status: 400,
      },
    });
  }
  if (response2?.Item !== undefined) {
    return NextResponse.json({
      body: {
        message: "failed",
        data: "User already exists",
        status: 400,
      },
    });
  }

  const bytes = AES.decrypt(password, FrontHashKey);
  // console.log("bytes", bytes)
  const originalPassword = bytes.toString(enc.Utf8);

  
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(originalPassword, salt);
  // console.log(hash)
  const user = {
    userId: Math.random().toString(36).substring(2, 10)+ Date.now().toString(36),
    name,
    email,
    password: hash,
    role: "user",
    refreshToken: "",
    profilePic: "",
  };
  // console.log(user)

 
  const { accessToken, refreshToken } = generateAccessAndRefreshTokens(user);
  cookies().set("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  cookies().set("accessToken", accessToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 1,
  });
  cookies().set("userRole", user.role, {
    httpOnly: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 1,
  });

  user.refreshToken = refreshToken;
  const response = await ddbDocClient.send(
    new PutCommand({
      TableName: "Users",
      Item: user,
    })
  );
  if(response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json({
      body: {
        message: "Not able to create user account at this time",
        data: response,
        status: 400,
      },
    });
  }

  console.log("response ", response);

  if ("password" in user) {
    // @ts-ignore
    delete user.password;
  }

  cookies().set("isVerified", "true",{
    httpOnly: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 1,
  });
  
  return NextResponse.json({
    body: {
      message: "User created successfully!",
      data: user,
      accessToken,
      status: 200,
    },
  });
}
