import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ddbDocClient } from "@/database/dynamodbClient";
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { generateAccessAndRefreshTokens } from "@/utils/generateAccessAndRefreshTokens";
import {AES,enc} from 'crypto-js'

const FrontHashKey = process.env.NEXT_FRONT_HASH_KEY || "";

export async function POST(req: any, res: any) {
  const data = await req.json(); 
  const { email, password } = data;
  if (!email || !password) {
    return NextResponse.json({
      body: {
        message: "failed",
        data: "email or password is missing",
        status: 400,
      },
    });
  }
  // console.log("email", email, "password", password)

  const response = await ddbDocClient.send(
    new GetCommand({
      TableName: "Users",
      Key: {
        email,
      },
    })
  );
  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json({
      body: {
        message: "failed",
        data: response,
        status: 400,
      },
    });
  }

  if (response?.Item === undefined) {
    return NextResponse.json({
      body: {
        message: "failed",
        data: "User not found",
        status: 400,
      },
    });
  }

  // console.log("response", email,"password", password)

  const user = response.Item;
  const bytes = AES.decrypt(password, FrontHashKey);
  // console.log("bytes", bytes)
  const originalPassword = bytes.toString(enc.Utf8);
  // console.log(password,"originalPassword", originalPassword, " ** ",user.password)
  const verify = bcrypt.compareSync(originalPassword, user.password);
  // console.log("verify ", verify)
  if (!verify) {
    return NextResponse.json({
      body: {
        message: "failed",
        data: "Invalid password",
        status: 400,
      }
    },{
      status: 400,
    });
  }

  if(user.role === "none"){
    return NextResponse.json({
      body: {
        message: "failed",
        data: "You are not Allowed to access this site",
        status: 400,
      },
    });
  }

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

  const response2 = await ddbDocClient.send(
    new UpdateCommand({
      TableName: "Users",
      Key: {
        email,
      },
      UpdateExpression: "set refreshToken = :r",
      ExpressionAttributeValues: {
        ":r": refreshToken,
      },
    })
  );
  // console.log("update db response", response2)
  if (response2.$metadata.httpStatusCode !== 200) {
    return NextResponse.json({
      body: {
        message: "Not able to create user account at this time",
        data: response2,
        status: 400,
      },
    });
  }


  if ("password" in user) {
    delete user.password;
  }
  cookies().set("isVerified", "true",{
    httpOnly: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 1,
  }); 
  return NextResponse.json({
    body: {
      message: "User logged in successfully!",
      data: user,
      accessToken,
      status: 200,
    },
  });
}
