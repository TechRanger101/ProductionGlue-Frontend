"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import LoadSmall from "../LoadSmall";
// import { Combobox } from "../Combobox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadFileToS3 } from "@/utils/uploadFileToS3";
import { countryList } from "./VenueAddForm";

const VendorEditForm = ({ type }: { type?: string }) => {
  const [vendorData, setVendorData] = useState<any>({
    name: "",
    city: "",
    state: "",
    zipCode: "",
    status: "",
    Nda: "",
    YearOfNda: "",
    NdaExpiration: "",
    coi: "",
    coiExpiration: "",
    representativeContactName: "",
    representativeEmail: "",
    address: "",
    activeCities: [] as string[],
    country: [] as string[],
    phoneNumber: "",
    websiteUrl: "",
    email: "",
    pGContactsOrUpdaters: "",
    rating: "",
    images: [] as string[],
    epicorId: "",
    businessType: "",
    serviceCategory: "",
    fullServiceOffered: [] as string[],
    additionalDocs: "",
    flaggedforDoNotUse: "",
    taitOrPgPartner: "",
    Notes: "",
    vendorCapesDeckOrMISC: "",
    StandardTermsOrDefaultTerms: "",
    fein: "",
    formW9: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagesLink, setImagesLink] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { vendorId } = useParams();

  const getVendor = async () => {
    try {
      const res = await axios.get(`/api/vendor?eventEntityId=${vendorId}`);
        // console.log(res.data);
      if (res.data?.status === 200) {
        setVendorData(res.data?.data);

        if (res.data?.data?.images?.length > 0) {
          setImagesLink(res.data?.data?.images);
        }
      }
      if (res.data?.status === 400) {
        toast.error(res.data?.message);
      }
      //   console.log(res.data);
    } catch (error: any) {
      toast.error("Vendor Not Found");
      console.log(error.response.data);
    }
  };
  //   console.log(venueData);

  useEffect(() => {
    getVendor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendorId]);

  const handleImageChange = (e: any) => {
    setImages([...images, e.target.files[0]]);
  };

  const handleDeleteImage = (index: number) => {
    const newImages = images.filter((item, i) => i !== index);
    setImages(newImages);
  };


  const handleDeleteImageLink = (index: number) => {
    const newImages = imagesLink.filter((item, i) => i !== index);
    setImagesLink(newImages);
  };

  const uploadImages = async () => {
    let links: string[] = [];
    for (let i = 0; i < images.length; i++) {
      if (typeof images[i] === "string") continue;

      console.log(images[i], " n");
      const buffer = Buffer.from(await images[i].arrayBuffer());
      const fileName = await uploadFileToS3(buffer, images[i].name);
      // console.log("https://productionglue.s3.amazonaws.com/"+fileName ,' f');
      let image: string =
        "https://productionglue-bucket.s3.amazonaws.com/" + fileName;
      links[i] = image;
      imagesLink.push(image);
    }
    // console.log(" links ",links)
    // console.log(imagesLink, ' i')
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!vendorData.name || !vendorData.zipCode || !vendorData.rating) {
      toast.error("Please fill all the fields name, zipCode, rating");
      return;
    }

    
    // console.log(images);
    if (images.length > 0) {
      setLoading(true);
      await uploadImages();
    }

    try {
      const res = await axios.put("/api/vendor", {
        ...vendorData,
        images: imagesLink,
      });
      // console.log(res.data, 'vendor');

      if (res.data?.status === 200) {
        toast.success("Vendor Updated Successfully");
        setLoading(false);
        router.push("/dashboard/edit/vendor");
      }
      if (res.data?.status === 400) {
        toast.error(res.data?.message);
        setLoading(false);
      }
      console.log(res.data);
    } catch (error: any) {
      toast.error("Not able to Update Vendor");
      console.log(error.response.data);
      setLoading(false);
    }
  };


  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.delete(`/api/vendor`, {
        data: {
          eventEntityId: id,
        },
      });
      console.log(res.data);
      if (res.data?.status === 200) {
        toast.success("Venue Deleted Successfully");
        setLoading(false);
        router.push("/dashboard/edit/vendor");
      }
      if (res.data?.status === 400) {
        toast.error(res.data?.message);
      }
      //   console.log(res.data);
    } catch (error: any) {
      toast.error("Not able to delete Vendor");
      setLoading(false);
      console.log(error.response.data);
    }
  };

  if(vendorData?.eventEntityId === undefined || vendorData?.eventEntityId === null){
    return (
      <div className="flex justify-center items-center h-96">
        <h1 className="text-2xl text-gray-500">Vendor Not Found</h1>
      </div>
    )
  }

  return (
    <>
      <div className="relative">
        {loading ? (
          <>
            <div className="fixed pointer-events-none top-0 left-0 z-50 w-screen h-screen flex justify-center items-center bg-black bg-opacity-20">
              <LoadSmall />
            </div>
          </>
        ) : null}
      </div>

      <div className="flex max-md:flex-col gap-16">
        <div className="w-full">
          <form onSubmit={handleSubmit} className=" flex flex-col gap-10">
            <div className="grid grid-cols-2 gap-10 max-md:gap-6 max-md:grid-cols-1 w-3/4 max-md:w-full">
              {VendorFields.map((field: any, index) => {
                if (field.isSelect) {
                  console.log(vendorData[field?.fieldName], " f");
                  return (
                    <div key={index}>
                      <label htmlFor={field.fieldName}>{field.name}</label>
                      <Select
                        name={field.fieldName}
                        onValueChange={(value) => {
                          // console.log(value)
                          setVendorData({
                            ...vendorData,
                            [field.fieldName]: value
                          });
                        }}
                        value={vendorData[field?.fieldName]}
                      >
                        <SelectTrigger className="border border-[#B2C2D9] rounded-lg px-3 py-2 text-[#334155] mt-2 2xl:mb-5 mb-3 focus:outline-none">
                          <SelectValue placeholder={`Select ${field.name}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.data.map((item: any, index: number) => (
                            <SelectItem key={index} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  );
                } else {
                  return (
                    <div key={index}>
                      <label htmlFor={field.fieldName}>
                        {field.name}{" "}
                        {field.required && (
                          <span className="text-primary">*</span>
                        )}
                      </label>
                      <Input
                        type={field.type}
                        name={field.fieldName}
                        id={field.fieldName}
                        value={vendorData[field.fieldName]}
                        onChange={(e) => {
                          if (field.isMultiSelect) {
                            setVendorData({
                              ...vendorData,
                              [field.fieldName]: e.target.value.split(","),
                            });
                          } else {
                            setVendorData({
                              ...vendorData,
                              [field.fieldName]: e.target.value,
                            });
                          }
                        
                        }}
                        placeholder={`Enter ${field.name}`}
                        className=" mt-2 2xl:mb-5 mb-3 "
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div>
              {" "}
              <label htmlFor="address">
                Address <span className="text-primary">*</span>
              </label>
              <Textarea
                name="address"
                id="  address"
                value={vendorData?.address}
                rows={4}
                onChange={
                  (e) => setVendorData({ ...vendorData, address: e.target.value })
                }
                placeholder="Enter  Address"
                className="w-3/4 max-md:w-full mt-2 2xl:mb-5 mb-3 "
              />
            </div>

            <div className="w-3/4 mb-6 max-md:w-full">
              <label htmlFor="VendorType">Pictures</label>
              <div className="relative rounded-lg border border-[#B2C2D9] h-56 mt-5 2xl:mb-5 mb-3 ">
                <input
                  type="file"
                  id="input-file-upload"
                  multiple={true}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  id="label-file-upload"
                  htmlFor="input-file-upload"
                  className="flex h-full w-full flex-col items-center justify-center py-5 sm:py-10"
                >
                  <div>
                    <div className="flex justify-center">
                      <div className="flex gap-4 items-center">
                        <div>
                          <svg
                            width="30"
                            height="31"
                            viewBox="0 0 30 31"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.9375 25.8125V20.1875H19.6875L15 14.5625L10.3125 20.1875H14.0625V25.8125H9.375V25.7656C9.2175 25.775 9.0675 25.8125 8.90625 25.8125C7.04145 25.8125 5.25302 25.0717 3.93441 23.7531C2.61579 22.4345 1.875 20.6461 1.875 18.7812C1.875 15.1737 4.60313 12.2338 8.10375 11.8306C8.41067 10.2262 9.26708 8.77882 10.5257 7.7375C11.7843 6.69618 13.3665 6.12599 15 6.125C16.6338 6.12591 18.2162 6.69604 19.4751 7.73733C20.734 8.77863 21.5908 10.226 21.8981 11.8306C25.3988 12.2338 28.1231 15.1737 28.1231 18.7812C28.1231 20.6461 27.3823 22.4345 26.0637 23.7531C24.7451 25.0717 22.9567 25.8125 21.0919 25.8125C20.9344 25.8125 20.7825 25.775 20.6231 25.7656V25.8125H15.9375Z"
                              fill="#2E6AB3"
                            />
                          </svg>
                        </div>
                        <h3 className="text-[#818181] text-base font-normal">
                          Upload Vendor Pictures
                        </h3>
                      </div>
                    </div>
                    {/* <span className="block text-center text-xs text-[#818181] sm:text-sm mt-4">
                      Upload multiple pictures if necessary
                    </span> */}
                  </div>
                </label>
              </div>
              {imagesLink?.map((image, index) => (
                <div
                  key={index}
                  className="mt-3 px-6 py-4 flex justify-between rounded-lg border border-[#B2C2D9]"
                >
                  <div className="flex gap-2 items-center">
                    <Image
                      src={image}
                      width={60}
                      height={50}
                      alt=""
                      className="rounded-lg aspect-square"
                    />
                    <span className="text-gray-600 text-sm font-medium">
                      {image?.split(".") &&
                        image?.split(".")[3] &&
                        image?.split(".")[3].split("/")[1]}
                    </span>
                  </div>
                  <div onClick={() => handleDeleteImageLink(index)}>
                    <X className="cursor-pointer hover:opacity-50" />
                  </div>
                </div>
              ))}

              {images?.map(
                (image, index) =>
                  // console.log(image, " i"),
                  image?.name && (
                    <div
                      key={index}
                      className="mt-3 px-6 py-4 flex justify-between rounded-lg border border-[#B2C2D9]"
                    >
                      <div className="flex gap-2 items-center">
                        <Image
                          src={URL.createObjectURL(image)}
                          width={60}
                          height={50}
                          alt={
                            image?.name?.split(".") &&
                            image?.name?.split(".")[0]
                          }
                          className="rounded-lg aspect-square"
                        />
                        <span className="text-gray-600 text-sm font-medium">
                          {image?.name?.split(".") &&
                            image?.name?.split(".")[0] + " " + image?.type}
                        </span>
                      </div>
                      <div onClick={() => handleDeleteImage(index)}>
                        <X className="cursor-pointer hover:opacity-50" />
                      </div>
                    </div>
                  )
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-[#2E6AB3]  text-white w-full py-3 rounded-lg hover:opacity-80 mt-5 disabled:pointer-events-none disabled:opacity-60"
              >
                Update Vendor
              </button>
            </div>
          </form>
          <div className="w-3/4 mb-6 max-md:w-full">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="submit"
                  className="bg-red-600  text-white w-full py-3 rounded-lg hover:opacity-80"
                >
                  Delete Vendor from Database
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base">
                    This action cannot be undone. This will permanently delete
                    the Vendor from the database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-lg">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 text-lg text-white hover:opacity-80"
                    onClick={() => handleDelete(vendorId as string)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorEditForm;
const countries = countryList.map((country) => {
  return {
    value: country,
    label: country,
  };
});


export const VendorFields = [
  {
    name: "Name",
    type: "text",
    required: true,
    isSelect: false,
    isTextArea: false,
    fieldName: "name",
  },
  {
    name: "Epicor ID",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "epicorId",
  },
  {
    name: "Business Type",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "businessType",
  },
  {
    name: "Service Category",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "serviceCategory",
  },
  {
    name: "Full Service Offered",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "fullServiceOffered",
  },
  {
    name: "Status",
    type: "text",
    required: false,
    isSelect: true,
    data: [
      { value: "Active", label: "Active" },
      { value: "Inactive", label: "Inactive" },
      { value: "Potential Venue", label: "Potential Venue"}
    ],
    isTextArea: false,
    fieldName: "status",
  },
  {
    name: "COI",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "coi",
  },
  {
    name: "COI Expiration",
    type: "date",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "coiExpiration",
  },
  {
    name: "2024 W9",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "formW9",
  },
  {
    name: "NDA",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "Nda",
  },
  {
    name: "Year Of NDA",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "YearOfNda",
  },
  {
    name: "NDA Expiration",
    type: "date",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "NdaExpiration",
  },
  {
    name: "Representative Contact Name",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "representativeContactName",
  },
  {
    name: "Representative Email",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "representativeEmail",
  },
  {
    name: "MSAs, Contracts, Additional Docs ",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "additionalDocs",
  },
  {
    name: "FEIN #",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "fein",
  },

  {
    name: "City",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "city",
  },
  {
    name: "State",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "state",
  },
  {
    name: "Zip Code",
    type: "text",
    required: true,
    isSelect: false,
    isTextArea: false,
    fieldName: "zipCode",
  },
  // {
  //   name: "Phone Number",
  //   type: "text",
  //   required: false,
  //   isSelect: false,
  //   isTextArea: false,
  //   fieldName: "phoneNumberTwo",
  // },
  {
    name: "Active Cities",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    isMultiSelect: true,
    fieldName: "activeCities",
  },
  {
    name: "Country",
    type: "text",
    required: false,
    isSelect: true,
    data: countries,
    isTextArea: false,
    isMultiSelect: true,
    fieldName: "country",
  },
  {
    name: "Phone Number",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "phoneNumber",
  },
  {
    name: "Website",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "websiteUrl",
  },
  {
    name: "Generic VENDOR EMAIL",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "email",
  },
  {
    name: "PG Contacts Or Updaters",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "pGContactsOrUpdaters",
  },
  {
    name: "Rating",
    type: "text",
    required: true,
    isSelect: false,
    isTextArea: false,
    fieldName: "rating",
  },

  {
    name: "Flagged for Do Not Use",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "flaggedforDoNotUse",
  },
  {
    name: "Tait/PG Partner!",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "taitOrPgPartner",
  },
  {
    name: "Notes",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "Notes",
  },
  {
    name: "Vendor Capes Deck / MISC",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "vendorCapesDeckOrMISC",
  },
  {
    name: "Standard Terms/Default Terms",
    type: "text",
    required: false,
    isSelect: false,
    isTextArea: false,
    fieldName: "StandardTermsOrDefaultTerms",
  },
];
