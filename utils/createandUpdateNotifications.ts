import { ddbDocClient } from "@/database/dynamodbClient";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const createNotifications = async (userEmail: string) => {
  const response = await ddbDocClient.send(
    new UpdateCommand({
      TableName: "Users",
      Key: {
        email: userEmail,
      },
      UpdateExpression:
        "SET notifications = list_append(if_not_exists(notifications, :emptyList), :notifications)",
      ExpressionAttributeValues: {
        ":emptyList": [],
        ":notifications": [
          {
            id: generateId(),
            read: false,
            message: "You have a new notification",
          },
        ],
      },
    })
  );
  // console.log(response ," notification response");
  return response;
};

const updateNotifications = async (userEmail: string) => {
  const response = await ddbDocClient.send(
    new UpdateCommand({
      TableName: "Users",
      Key: {
        email: userEmail,
      },
      UpdateExpression: "SET notifications[0].read = :read",
      ExpressionAttributeValues: {
        ":read": true,
      },
    })
  );
  return response;
};

export { createNotifications, updateNotifications };

const generateId = () => {
  return uuidv4().split("-").join("") + Date.now();
};
