import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import {
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import bcrypt from "bcryptjs";
import {AES,enc} from 'crypto-js'

const FrontHashKey = process.env.NEXT_FRONT_HASH_KEY || "";
 
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      {
        status: 400,
        message: "email is required",
      },
      {
        status: 400,
      }
    );
  }

  const response = await ddbDocClient.send(
    new GetCommand({
      TableName: "Users",
      Key: {
        email,
      },
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        message: "Not able to fetch user",
        data: response,
        status: 400,
      },
      {
        status: 400,
      }
    );
  }

  // if (response.Item !== undefined) {
  //   if ("password" in response?.Item) {
  //     delete response.Item.password;
  //   }
  // }

  return NextResponse.json(
    {
      status: 200,
      message: `User fetched successfully`,
      data: response.Item,
    },
    {
      status: 200,
    }
  ); 
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const { email, name, address, phoneNumber, state, country,password,profilePic } = data;

  if (!email) {
    return NextResponse.json(
      {
        status: 400,
        message: "email is required",
      },
      {
        status: 400,
      }
    );
  }

  if (!name || !address || !phoneNumber || !state || !country ) {
    return NextResponse.json(
      {
        status: 400,
        message: "All fields are required",
      },
      {
        status: 400,
      }
    );
  } 
  const bytes = AES.decrypt(password, FrontHashKey);
  // console.log("bytes", bytes)
  const originalPassword = bytes.toString(enc.Utf8);

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(originalPassword, salt);

  const response = await ddbDocClient.send(
    new UpdateCommand({
      TableName: "Users",
      Key: {
        email,
      },
      UpdateExpression:
        "set #name = :name, #address = :address, phoneNumber = :phoneNumber, #state = :state, #country = :country,#password = :password, profilePic = :profilePic",
      ExpressionAttributeNames: {
        "#name": "name",
        "#address": "address",
        "#state": "state",
        "#country": "country",
        "#password": "password",

      },
      ExpressionAttributeValues: {
        ":name": name,
        ":address": address,
        ":phoneNumber": phoneNumber,
        ":state": state,
        ":country": country,
        ":password": hash,
        ":profilePic": profilePic,
      },
      ReturnValues: "UPDATED_NEW",
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        message: "Not able to update user",
        data: response,
        status: 400,
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    {
      status: 200,
      message: `User updated successfully`,
      data: response,
    },
    {
      status: 200,
    }
  );
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      {
        status: 400,
        message: "email is required",
      },
      {
        status: 400,
      }
    );
  }

  const response = await ddbDocClient.send(
    new DeleteCommand({
      TableName: "Users",
      Key: {
        email,
      },
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        message: "Not able to delete user",
        data: response,
        status: 400,
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    {
      status: 200,
      message: `User deleted successfully`,
      // data: response,
    },
    {
      status: 200,
    }
  );
}
