import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { cookies } from "next/headers";
import { generateAccessAndRefreshTokens } from "@/utils/generateAccessAndRefreshTokens";

export async function POST(request: NextRequest) {
  const body = await request.json();
//   console.log("body", body.decoded);
  const { email, name } = body.decoded;
  if (!email || !name) {
    return NextResponse.json({
      body: {
        message: "failed",
        data: "email or password is missing",
        status: 400,
      },
    });
  }
  //  console.log(body)

  const response = await ddbDocClient.send(
    new GetCommand({
      TableName: "Users",
      Key: {
        email,
      },
    })
  );
  // console.log("get db response", response)
  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json({
      body: {
        message: "failed",
        data: response,
        status: 400,
      },
    });
  }
  if (response?.Item !== undefined) {
    return NextResponse.json({
      body: {
        message: "failed",
        data: "User already exists",
        status: 400,
      },
    });
  }

  const user = {
    userId: Math.random().toString(36).substring(2, 10)+ Date.now().toString(36),
    name,
    email,
    password: "",
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
  const response2 = await ddbDocClient.send(
    new PutCommand({
      TableName: "Users",
      Item: user,
    })
  );
  if (response2.$metadata.httpStatusCode !== 200) {
    return NextResponse.json({
      body: {
        message: "Not able to create user account at this time",
        data: response,
        status: 400,
      },
    });
  }

//   console.log("user created successfully", user);
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
