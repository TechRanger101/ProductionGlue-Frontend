import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import {
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

export async function PUT(req: NextRequest, res: NextResponse) {
    const data = await req.json();
    const { email, name, address, phoneNumber, state, country,role } = data;
    // console.log(data);
  
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
  
    // if (!name || !address || !phoneNumber || !state || !country) {
    //   return NextResponse.json(
    //     {
    //       status: 400,
    //       message: "All fields are required",
    //     },
    //     {
    //       status: 400,
    //     }
    //   );
    // }
  
    const response = await ddbDocClient.send(
      new UpdateCommand({
        TableName: "Users",
        Key: {
          email,
        },
        UpdateExpression:
          "set #name = :name, address = :address, phoneNumber = :phoneNumber, #state = :state, #country = :country, #role = :role",
        ExpressionAttributeNames: {
          "#name": "name",
          "#state": "state",
          "#country": "country",
          "#role": "role"
        },
        ExpressionAttributeValues: {
          ":name": name,
          ":address": address,
          ":phoneNumber": phoneNumber,
          ":state": state,
          ":country": country,
          ":role": role
        },
        ReturnValues: "UPDATED_NEW",
      })
    );

    // console.log(response);
  
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
        // data: response,
      },
      {
        status: 200,
      }
    );
  }

 