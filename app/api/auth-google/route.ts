import {NextRequest, NextResponse} from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { cookies } from "next/headers";
import { generateAccessAndRefreshTokens } from "@/utils/generateAccessAndRefreshTokens";


export async function POST (request: NextRequest){
    const body =  await request.json();
    const {email,name} = body.decoded;
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
            status: 401,
          },
        });
      }

      const user = response.Item;
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

      cookies().set("isVerified", "true",{
        httpOnly: false,
        path: "/",
        maxAge: 60 * 60 * 24 * 1,
      });

  //  console.log("user logged in successfully",user);
    
    return NextResponse.json({
    body: {
      message: "User logged in successfully!",
      data: user,
      accessToken,
      status: 200,
    },
  });
}