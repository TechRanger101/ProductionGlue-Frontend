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
  // console.log("data ", data);
  const {
    name,
    address,
    city,
    state,
    country,
    zipCode,
    rating,
    phoneNumber,
    email,
    images,
    status,
    websiteUrl,
    activeCities,
    coi,
    coiExpiration,
    Nda,
    YearOfNda,
    NdaExpiration,
    pGContactsOrUpdaters,
    representativeContactName,
    representativeEmail,
    epicorId,
    businessType,
    serviceCategory,
    fullServiceOffered,
    additionalDocs,
    flaggedforDoNotUse,
    taitOrPgPartner,
    Notes,
    vendorCapesDeckOrMISC,
    StandardTermsOrDefaultTerms,
    fein,
    formW9
  } = data;

  if (name === "" || zipCode === "" || rating === '') {
    return NextResponse.json(
      {
        status: 400,
        message: "vendor name , Zip Code and Rating is required",
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

 
  const vendorData = {
    eventEntityId,
    type: "vendor",
    name,
    address,
    city,
    state,
    country,
    zipCode,
    rating,
    phoneNumber,
    email,
    lat,
    lng,
    images,
    status,
    websiteUrl,
    createdBy: "admin",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    activeCities,
    coi,
    coiExpiration,
    Nda,
    YearOfNda,
    NdaExpiration,
    pGContactsOrUpdaters,
    representativeContactName,
    representativeEmail,
    epicorId,
    businessType,
    serviceCategory,
    fullServiceOffered,
    additionalDocs,
    flaggedforDoNotUse,
    taitOrPgPartner,
    Notes,
    vendorCapesDeckOrMISC,
    StandardTermsOrDefaultTerms,
    fein,
    formW9,

  };
  // console.log("vendorData ", vendorData);

  const response = await ddbDocClient.send(
    new PutCommand({
      TableName: "VenuesAndVendors",
      Item: vendorData,
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        status: 400,
        message: "vendor creation failed",
      },
      {
        status: 400,
      }
    );
  }
  console.log("response ", response);

  return NextResponse.json(
    {
      status: 200,
      message: `vendor created successfully`,
      data: vendorData,
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
        message: "vendor ID is required",
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
        type: "vendor",
      },
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        status: 400,
        message: "vendor not found",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    {
      status: 200,
      message: `vendor found successfully`,
      data: response.Item,
    },
    {
      status: 200,
    }
  );
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  const {
    eventEntityId,
    type,
    name,
    address,
    city,
    state,
    country,
    zipCode,
    rating,
    phoneNumber,
    email,
    images,
    status,
    websiteUrl,
    createdBy,
    createdAt,
    updatedAt,
    activeCities,
    coi,
    coiExpiration,
    Nda,
    YearOfNda,
    NdaExpiration,
    pGContactsOrUpdaters,
    representativeContactName,
    representativeEmail,
    epicorId,
    businessType,
    serviceCategory,
    fullServiceOffered,
    additionalDocs,
    flaggedforDoNotUse,
    taitOrPgPartner,
    Notes,
    vendorCapesDeckOrMISC,
    StandardTermsOrDefaultTerms,
    fein,
    formW9,
  } = data;

  if (!eventEntityId) {
    return NextResponse.json(
      {
        status: 400,
        message: "vendor ID is required",
      },
      {
        status: 400,
      }
    );
  }
  const result = (await getLatLngFromZip(zipCode)) || { lat: 0, lng: 0 };
  const lat = result.lat;
  const lng = result.lng;
  const response = await ddbDocClient.send(
    new GetCommand({
      TableName: "VenuesAndVendors",
      Key: {
        eventEntityId,
        type: "vendor",
      },
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        status: 400,
        message: "vendor not found",
      },
      {
        status: 400,
      }
    );
  }

  const vendorData = {
    eventEntityId,
    type,
    name,
    address,
    city,
    state,
    country,
    zipCode,
    rating,
    phoneNumber,
    email,
    lat,
    lng,
    images,
    status,
    websiteUrl,
    createdBy,
    createdAt,
    updatedAt: Date.now(),
    activeCities,
    coi,
    coiExpiration,
    Nda,
    YearOfNda,
    NdaExpiration,
    pGContactsOrUpdaters,
    representativeContactName,
    representativeEmail,
    epicorId,
    businessType,
    serviceCategory,
    fullServiceOffered,
    additionalDocs,
    flaggedforDoNotUse,
    taitOrPgPartner,
    Notes,
    vendorCapesDeckOrMISC,
    StandardTermsOrDefaultTerms,
    fein,
    formW9,

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
        type: "vendor",
      },
      UpdateExpression:
        "set #name = :name, #address = :address, #city = :city, #state = :state, #country = :country, zipCode = :zipCode, rating = :rating, phoneNumber = :phoneNumber, #email = :email, #lat = :lat, #lng = :lng, #images = :images, #status = :status, websiteUrl = :websiteUrl, createdBy = :createdBy, createdAt = :createdAt, updatedAt = :updatedAt, activeCities = :activeCities, coi = :coi, coiExpiration = :coiExpiration, Nda = :Nda, YearOfNda = :YearOfNda, NdaExpiration = :NdaExpiration, pGContactsOrUpdaters = :pGContactsOrUpdaters, representativeContactName = :representativeContactName, representativeEmail = :representativeEmail, epicorId = :epicorId, businessType = :businessType, serviceCategory = :serviceCategory, fullServiceOffered = :fullServiceOffered, additionalDocs = :additionalDocs, flaggedforDoNotUse = :flaggedforDoNotUse, taitOrPgPartner = :taitOrPgPartner, Notes = :Notes, vendorCapesDeckOrMISC = :vendorCapesDeckOrMISC, StandardTermsOrDefaultTerms = :StandardTermsOrDefaultTerms, fein = :fein, formW9 = :formW9",
      ExpressionAttributeNames: {
        "#name": "name",
        "#address": "address",
        "#city": "city",
        "#state": "state",
        "#country": "country",
        "#email": "email",
        "#lat": "lat",
        "#lng": "lng",
        "#images": "images",
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":name": vendorData.name,
        ":address": vendorData.address,
        ":city": vendorData.city,
        ":state": vendorData.state,
        ":country": vendorData.country,
        ":zipCode": vendorData.zipCode,
        ":rating": vendorData.rating,
        ":phoneNumber": vendorData.phoneNumber,
        ":email": vendorData.email,
        ":lat": vendorData.lat,
        ":lng": vendorData.lng,
        ":images": vendorData.images,
        ":status": vendorData.status,
        ":websiteUrl": vendorData.websiteUrl,
        ":createdBy": vendorData.createdBy,
        ":createdAt": vendorData.createdAt,
        ":updatedAt": vendorData.updatedAt,
        ":activeCities": vendorData.activeCities,
        ":coi": vendorData.coi,
        ":coiExpiration": vendorData.coiExpiration,
        ":Nda": vendorData.Nda,
        ":YearOfNda": vendorData.YearOfNda,
        ":NdaExpiration": vendorData.NdaExpiration,
        ":pGContactsOrUpdaters": vendorData.pGContactsOrUpdaters,
        ":representativeContactName": vendorData.representativeContactName,
        ":representativeEmail": vendorData.representativeEmail,
        ":epicorId": vendorData.epicorId,
        ":businessType": vendorData.businessType,
        ":serviceCategory": vendorData.serviceCategory,
        ":fullServiceOffered": vendorData.fullServiceOffered,
        ":additionalDocs": vendorData.additionalDocs,
        ":flaggedforDoNotUse": vendorData.flaggedforDoNotUse,
        ":taitOrPgPartner": vendorData.taitOrPgPartner,
        ":Notes": vendorData.Notes,
        ":vendorCapesDeckOrMISC": vendorData.vendorCapesDeckOrMISC,
        ":StandardTermsOrDefaultTerms": vendorData.StandardTermsOrDefaultTerms,
        ":fein": vendorData.fein,
        ":formW9": vendorData.formW9,
      },
    })
  );
  console.log("updateResponse  vendor", updateResponse);
  if (updateResponse.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        status: 400,
        message: "Vendor update failed",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    {
      status: 200,
      message: `vendor updated successfully`,
      data: vendorData,
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
        message: "vendor ID is required",
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
        type: "vendor",
      },
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        status: 400,
        message: "vendor not found",
      },
      {
        status: 400,
      }
    );
  }

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
        type: "vendor",
      },
    })
  );

  if (deleteResponse.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        status: 400,
        message: "vendor delete failed",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    {
      status: 200,
      message: `vendor deleted successfully`,
    },
    {
      status: 200,
    }
  );
}

const generateId = () => {
  return uuidv4().split("-").join("") + Date.now();
};
