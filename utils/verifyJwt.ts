import { ddbDocClient } from "@/database/dynamodbClient";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

const verifyJwt = async (token: string,WantUser?: boolean) => {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, "access-token-secret") as JwtPayload;

    const params = {
      TableName: "Users",
      Key: {
        email: decoded.email,
      },
    };
    const data = await ddbDocClient.send(new GetCommand(params));
    console.log(data);
    if (data.Item) {
      // console.log("User found in db");
      if(WantUser){
        return data.Item;
      }
      return true;
    }
    return null;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export  { verifyJwt}