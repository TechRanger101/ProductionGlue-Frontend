import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { ddbDocClient } from "@/database/dynamodbClient";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import {AES,enc} from 'crypto-js'
const FrontHashKey = process.env.NEXT_FRONT_HASH_KEY || "";

export async function POST(req: any, res: any) {
  const data = await req.json();
  const { email, password, name, role, profilePic,phoneNumber,address,state,country } = data;
  // console.log(data);

  if (!email || !name || !role) {
    return NextResponse.json({
      message: "failed",
      data: "email  or name or role is missing",
      status: 400,
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

  if (response2.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        message: "failed",
        data: response2,
        status: 400,
      },
      {
        status: 400,
      }
    );
  }

  if (response2?.Item !== undefined) {
    return NextResponse.json(
      {
        message: "failed",
        data: "User already exists",
        status: 400,
      }, 
      {
        status: 400,
      }
    );
  }

  const bytes = AES.decrypt(password, FrontHashKey);
  const originalPassword = bytes.toString(enc.Utf8);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(originalPassword, salt);
//   console.log(hash, originalPassword);

  const user = {
    userId:
      Math.random().toString(36).substring(2, 10) + Date.now().toString(36),
    name,
    email,
    password: hash,
    role: role,
    refreshToken: "",
    profilePic: profilePic === undefined ? "" : profilePic,
    phoneNumber: "",
    address: "",
    state: "",
    country: "",
  };

  const response = await ddbDocClient.send(
    new PutCommand({
      TableName: "Users",
      Item: user,
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        message: "failed",
        data: response,
        status: 400,
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json({
    message: "success",
    data: user,
    status: 200,
  });
}
