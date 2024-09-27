import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import {
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { cookies } from "next/headers";
import { deleteFromS3 } from "@/utils/uploadFileToS3";
import getLatLngFromZip from "@/utils/getLatLngFromZip";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(req: NextRequest, res: NextResponse) {
  //   if (cookies().get("userRole")?.value !== "admin") {
  //     return NextResponse.json(
  //       {
  //         status: 400,
  //         message: "Admin is required",
  //       },
  //       {
  //         status: 400,
  //       }
  //     );
  //   }
  const data = await req.json();
  console.log("data ", data);
  const {
    name,
    venue,
    spaceName,
    eventEntityType,
    address,
    zipCode,
    phoneNumber,
    city,
    state,
    email,
    standing,
    squareFeet,
    country,
    rating,
    phoneNumberTwo,
    websiteUrl,
    seated,
    status,
    rentalFee,
    permitRequired,
    images,
    category,
    neighborhood,
    contactName,
    updatedSQFT,
    maxCeilingHeight,
    spaceSizeCapacity,
    spaceSizeSquareFeet,
    ratesConfirmedOn,
    floorPlan,
    pgVenueBoxLink,
    boxFolderFileTypes,
    otherFiles,
    laborStatus,
    exclusiveVendors,
    pgProject,
    pgContactName,
    notes,
    transportation,
  } = data;

  if (!name) {
    return NextResponse.json(
      {
        status: 400,
        message: "Venue name is required",
      },
      {
        status: 400,
      }
    );
  }

  const eventEntityId = generateId();

  const result = (await getLatLngFromZip(zipCode)) || { lat: 0, lng: 0 };
  const lat = result.lat;
  const lng = result.lng;

  const venueData = {
    eventEntityId,
    type: "venue",
    venue,
    name,
    spaceName,
    eventEntityType,
    address,
    city,
    state,
    country,
    zipCode,
    rating,
    phoneNumber,
    phoneNumberTwo,
    email,
    standing,
    squareFeet,
    seated,
    lat,
    lng,
    images,
    status,
    rentalFee,
    permitRequired,
    websiteUrl,
    neighborhood,
    contactName,
    updatedSQFT,
    maxCeilingHeight,
    spaceSizeCapacity,
    spaceSizeSquareFeet,
    ratesConfirmedOn,
    floorPlan,
    pgVenueBoxLink,
    boxFolderFileTypes,
    otherFiles,
    laborStatus,
    exclusiveVendors,
    pgProject,
    pgContactName,
    notes,
    transportation,
    createdBy: "admin",
    createdAt: Date.now(),
    category,
    updatedAt: Date.now(),
  };

  // console.log("venueData ", venueData);

  const response = await ddbDocClient.send(
    new PutCommand({
      TableName: "VenuesAndVendors",
      Item: venueData,
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        status: 400,
        message: "Venue creation failed",
      },
      {
        status: 400,
      }
    );
  }

  // console.log("response ", response);

  return NextResponse.json(
    {
      status: 200,
      message: `Venue created successfully`,
      data: venueData,
    },
    {
      status: 200,
    }
  );
}

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const eventEntityId = searchParams.get("eventEntityId");

  if (!eventEntityId) {
    return NextResponse.json(
      {
        status: 400,
        message: "venue ID is required",
      },
      {
        status: 400,
      }
    );
  }

  const response = await ddbDocClient.send(
    new GetCommand({
      TableName: "VenuesAndVendors",
      Key: {
        eventEntityId,
        type: "venue",
      },
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        status: 400,
        message: "Venue not found",
      },
      {
        status: 400,
      }
    );
  }

  if (!response?.Item) {
    return NextResponse.json(
      {
        status: 400,
        message: "Venue not found",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    {
      status: 200,
      message: `Venue found successfully`,
      data: response.Item,
    },
    {
      status: 200,
    }
  );
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  // console.log("data ", data);

  const {
    eventEntityId,
    name,
    venue,
    spaceName,
    eventEntityType,
    address,
    zipCode,
    phoneNumber,
    city,
    state,
    email,
    standing,
    squareFeet,
    country,
    rating,
    phoneNumberTwo,
    websiteUrl,
    seated,
    status,
    rentalFee,
    permitRequired,
    images,
    category,
    neighborhood,
    contactName,
    updatedSQFT,
    maxCeilingHeight,
    spaceSizeCapacity,
    spaceSizeSquareFeet,
    ratesConfirmedOn,
    floorPlan,
    pgVenueBoxLink,
    boxFolderFileTypes,
    otherFiles,
    laborStatus,
    exclusiveVendors,
    pgProject,
    pgContactName,
    notes,
    transportation,
    createdBy,
    createdAt,
    updatedAt,
  } = data;

  if (!eventEntityId) {
    return NextResponse.json(
      {
        status: 400,
        message: "Venue ID is required",
      },
      {
        status: 400,
      }
    );
  }

  const response = await ddbDocClient.send(
    new GetCommand({
      TableName: "VenuesAndVendors",
      Key: {
        eventEntityId,
        type: "venue",
      },
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        status: 400,
        message: "Venue not found",
      },
      {
        status: 400,
      }
    );
  }

  const result = (await getLatLngFromZip(zipCode)) || { lat: 0, lng: 0 };
  const lat = result.lat;
  const lng = result.lng;

  const venueData = {
    eventEntityId,
    type: "venue",
    venue,
    name,
    spaceName,
    eventEntityType,
    address,
    city,
    state,
    country,
    zipCode,
    rating,
    phoneNumber,
    phoneNumberTwo,
    email,
    standing,
    squareFeet,
    seated,
    lat,
    lng,
    images,
    status,
    rentalFee,
    permitRequired,
    websiteUrl,
    neighborhood,
    contactName,
    updatedSQFT,
    maxCeilingHeight,
    spaceSizeCapacity,
    spaceSizeSquareFeet,
    ratesConfirmedOn,
    floorPlan,
    pgVenueBoxLink,
    boxFolderFileTypes,
    otherFiles,
    laborStatus,
    exclusiveVendors,
    pgProject,
    pgContactName,
    notes,
    transportation,
    createdBy,
    createdAt,
    category,
    updatedAt,
    updatedBy: "admin",
    updatedDate: Date.now(),
  };

  //
  if (response?.Item?.images !== null &&  response?.Item?.images !== undefined && response?.Item?.images?.length !== images?.length) {
    const imagesToDelete = response?.Item?.images.filter(
      (image: string) => !images.includes(image)
    );

    for (let i = 0; i < imagesToDelete.length; i++) {
      await deleteFromS3([imagesToDelete[i]]);
    }
  }

  const updateResponse = await ddbDocClient.send(
    new UpdateCommand({
      TableName: "VenuesAndVendors",
      Key: {
        eventEntityId,
        type: "venue",
      },
      UpdateExpression:
        "set #venue = :venue, #name = :name, #spaceName = :spaceName, #address = :address, #city = :city, #state = :state, #country = :country, #zipCode = :zipCode, #rating = :rating, #phoneNumber = :phoneNumber, #phoneNumberTwo = :phoneNumberTwo, #email = :email, #standing = :standing, #squareFeet = :squareFeet, #seated = :seated, #lat = :lat, #lng = :lng, #images = :images, #status = :status, #rentalFee = :rentalFee, #permitRequired = :permitRequired, #websiteUrl = :websiteUrl, #neighborhood = :neighborhood, #contactName = :contactName, #updatedSQFT = :updatedSQFT, #maxCeilingHeight = :maxCeilingHeight, #spaceSizeCapacity = :spaceSizeCapacity, #spaceSizeSquareFeet = :spaceSizeSquareFeet, #ratesConfirmedOn = :ratesConfirmedOn, #floorPlan = :floorPlan, #pgVenueBoxLink = :pgVenueBoxLink, #boxFolderFileTypes = :boxFolderFileTypes, #otherFiles = :otherFiles, #laborStatus = :laborStatus, #exclusiveVendors = :exclusiveVendors, #pgProject = :pgProject, #pgContactName = :pgContactName, #notes = :notes, #transportation = :transportation, #category = :category, #updatedAt = :updatedAt, #updatedBy = :updatedBy, #updatedDate = :updatedDate",
      ExpressionAttributeNames: {
        "#venue": "venue",
        "#name": "name",
        "#spaceName": "spaceName",
        // "#eventEntityType": "eventEntityType",
        "#address": "address",
        "#city": "city",
        "#state": "state",
        "#country": "country",
        "#zipCode": "zipCode",
        "#rating": "rating",
        "#phoneNumber": "phoneNumber",
        "#phoneNumberTwo": "phoneNumberTwo",
        "#email": "email",
        "#standing": "standing",
        "#squareFeet": "squareFeet",
        "#seated": "seated",
        "#lat": "lat",
        "#lng": "lng",
        "#images": "images",
        "#status": "status",
        "#rentalFee": "rentalFee",
        "#permitRequired": "permitRequired",
        "#websiteUrl": "websiteUrl",
        "#neighborhood": "neighborhood",
        "#contactName": "contactName",
        "#updatedSQFT": "updatedSQFT",
        "#maxCeilingHeight": "maxCeilingHeight",
        "#spaceSizeCapacity": "spaceSizeCapacity",
        "#spaceSizeSquareFeet": "spaceSizeSquareFeet",
        "#ratesConfirmedOn": "ratesConfirmedOn",
        "#floorPlan": "floorPlan",
        "#pgVenueBoxLink": "pgVenueBoxLink",
        "#boxFolderFileTypes": "boxFolderFileTypes",
        "#otherFiles": "otherFiles",
        "#laborStatus": "laborStatus",
        "#exclusiveVendors": "exclusiveVendors",
        "#pgProject": "pgProject",
        "#pgContactName": "pgContactName",
        "#notes": "notes",
        "#transportation": "transportation",
        "#category": "category",
        "#updatedAt": "updatedAt",
        "#updatedBy": "updatedBy",
        "#updatedDate": "updatedDate",
      },

      ExpressionAttributeValues: {
        ":venue": venue,
        ":name": name,
        ":spaceName": spaceName,
        // ":eventEntityType": eventcEntityType,
        ":address": address,
        ":city": city,
        ":state": state,
        ":country": country,
        ":zipCode": zipCode,
        ":rating": rating,
        ":phoneNumber": phoneNumber,
        ":phoneNumberTwo": phoneNumberTwo,
        ":email": email,
        ":standing": standing,
        ":squareFeet": squareFeet,
        ":seated": seated,
        ":lat": lat,
        ":lng": lng,
        ":images": images,
        ":status": status,
        ":rentalFee": rentalFee,
        ":permitRequired": permitRequired,
        ":websiteUrl": websiteUrl,
        ":neighborhood": neighborhood,
        ":contactName": contactName,
        ":updatedSQFT": updatedSQFT,
        ":maxCeilingHeight": maxCeilingHeight,
        ":spaceSizeCapacity": spaceSizeCapacity,
        ":spaceSizeSquareFeet": spaceSizeSquareFeet,
        ":ratesConfirmedOn": ratesConfirmedOn,
        ":floorPlan": floorPlan,
        ":pgVenueBoxLink": pgVenueBoxLink,
        ":boxFolderFileTypes": boxFolderFileTypes,
        ":otherFiles": otherFiles,
        ":laborStatus": laborStatus,
        ":exclusiveVendors": exclusiveVendors,
        ":pgProject": pgProject,
        ":pgContactName": pgContactName,
        ":notes": notes,
        ":transportation": transportation,
        ":category": category,
        ":updatedAt": Date.now(),
        ":updatedBy": "admin",
        ":updatedDate": Date.now(),
      },
    })
  );
  console.log("updateResponse ", updateResponse);

  if (updateResponse.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        status: 400,
        message: "Venue update failed",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    {
      status: 200,
      message: `Venue updated successfully`,
      data: venueData,
    },
    {
      status: 200,
    }
  );
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  const { eventEntityId } = data;

  if (!eventEntityId) {
    return NextResponse.json(
      {
        status: 400,
        message: "Venue ID is required",
      },
      {
        status: 400,
      }
    );
  }

  const response = await ddbDocClient.send(
    new GetCommand({
      TableName: "VenuesAndVendors",
      Key: {
        eventEntityId,
        type: "venue",
      },
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        status: 400,
        message: "Venue not found",
      },
      {
        status: 400,
      }
    );
  }

  // if (response?.Item?.images?.length > 0) {
  //   response?.Item?.images.forEach(async (image: string) => {
  //     await deleteFromS3([image]);
  //   });
  // }

  // console.log("response ", response?.Item);

  const imagesToDelete = async () => {
    if (response?.Item?.images?.length !== 0) {
      const imagesToDelete = response?.Item?.images;
      // console.log("imagesToDelete ", imagesToDelete);

      for (let i = 0; i < imagesToDelete.length; i++) {
        await deleteFromS3([imagesToDelete[i]]);
      }
    } else {
      return;
    }
  };

  try {
    await imagesToDelete();
  } catch (err) {
    console.log("err ", err);
    return NextResponse.json(
      {
        status: 400,
        message: "Venue delete failed",
      },
      {
        status: 400,
      }
    );
  }

  const deleteResponse = await ddbDocClient.send(
    new DeleteCommand({
      TableName: "VenuesAndVendors",
      Key: {
        eventEntityId,
        type: "venue",
      },
    })
  );

  // console.log("deleteResponse ", deleteResponse);

  if (deleteResponse.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        status: 400,
        message: "Venue delete failed",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    {
      status: 200,
      message: `Venue deleted successfully`,
    },
    {
      status: 200,
    }
  );
}

const generateId = () => {
  return uuidv4().split("-").join("") + Date.now();
};
