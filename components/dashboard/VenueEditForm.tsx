"use client";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { X } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { uploadFileToS3 } from "@/utils/uploadFileToS3";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Combobox } from "../Combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import LoadSmall from "../LoadSmall";
import { countryList } from "./VenueAddForm";

const VenueEditForm = () => {
  const [venueData, setVenueData] = useState({
    name: "",
    spaceName: "",
    eventEntityType: "",
    address: "",
    zipCode: "",
    city: "",
    state: "",
    phoneNumber: "",
    email: "",
    standing: "",
    squareFeet: "",
    country: "",
    rating: "",
    phoneNumberTwo: "",
    websiteUrl: "",
    seated: "",
    status: "",
    rentalFee: "",
    permitRequired: "",
    images: [] as string[],
    category: "",
    venue: "",
    neighborhood: "",
    contactName: "",
    updatedSQFT: "",
    maxCeilingHeight: "",
    spaceSizeCapacity: "",
    spaceSizeSquareFeet: "",
    ratesConfirmedOn: "",
    floorPlan: "",
    pgVenueBoxLink: "",
    boxFolderFileTypes: "",
    otherFiles: "",
    laborStatus: "",
    exclusiveVendors: "",
    pgProject: "",
    pgContactName: "",
    notes: "",
    transportation: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagesLink, setImagesLink] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { venueId } = useParams();
  const router = useRouter();
  // console.log(venueId)

  const getVenues = async () => {
    try {
      const res = await axios.get(`/api/venue?eventEntityId=${venueId}`);
      // console.log(res.data);
      if (res.data?.status === 200) {
        setVenueData(res.data?.data);

        if (res.data?.data?.images?.length > 0) {
          setImagesLink(res.data?.data?.images);
        }
      }
      if (res.data?.status === 400) {
        toast.error(res.data?.message);
      }
      //   console.log(res.data);
    } catch (error: any) {
      toast.error("Venue not found");
      console.log(error.response.data);
    }
  };
  console.log(imagesLink, "imagesLink");

  useEffect(() => {
    getVenues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [venueId]);

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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setVenueData({ ...venueData, [name]: value });
  };
  // console.log(images , " images");

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
    // console.log(venueData);

    if (!venueData.name || !venueData.rating || !venueData.zipCode) {
      toast.error("Please fill all the fields name, rating, zipCode");
      return;
    }

    // console.log(images);
    if (images.length > 0) {
      await uploadImages();
    }

    // console.log(venueData);

    try {
      const res = await axios.put("/api/venue", {
        ...venueData,
        images: imagesLink,
      });
      console.log(res.data);
      if (res.data?.status === 200) {
        toast.success("Venue Edit Successfully");
        router.push("/dashboard/edit/venue");
      }
      if (res.data?.status === 400) {
        toast.error(res.data?.message);
      }
      console.log(res.data);
    } catch (error: any) {
      toast.error("Not able to add Venue");
      console.log(error.response.data);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.delete(`/api/venue`, {
        data: {
          eventEntityId: id,
        },
      });
      console.log(res.data);
      if (res.data?.status === 200) {
        toast.success("Venue Deleted Successfully");
        setLoading(false);
        router.push("/dashboard/edit/venue");
      }
      if (res.data?.status === 400) {
        toast.error(res.data?.message);
      }
      //   console.log(res.data);
    } catch (error: any) {
      toast.error("Not able to add Venue");
      setLoading(false);
      console.log(error.response.data);
    }
  };

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
        <div>
          <div className="w-60 max-md:w-full h-56 relative rounded-md border-[#B2C2D9] border-solid border">
            <label
              htmlFor="fileInput"
              className="absolute bottom-0 w-full h-16 cursor-pointer bg-[#80767633] rounded-md flex justify-center items-center"
            >
              <div className="text-[#818181] text-sm font-medium">
                Cover Photo
              </div>
              <input type="file" id="fileInput" className="hidden" />
            </label>
          </div>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div>
              {" "}
              <label htmlFor="venue">
                Venue <span className="text-primary">*</span>
              </label>
              <Input
                type="text"
                name="venue"
                id="venue"
                onChange={handleChange}
                value={venueData.venue || ""}
                placeholder="Enter the name"
                className="w-2/3 max-md:w-full mt-2 2xl:mb-5 mb-3 "
              />
            </div>
            <div>
              {" "}
              <label htmlFor="name">Venue Name<span className="text-primary">*</span></label>
              <Input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                value={venueData.name}
                placeholder="Enter the name"
                className="w-2/3 max-md:w-full mt-2 2xl:mb-5 mb-3 "
              />
            </div>
            <div>
              {" "}
              <label htmlFor="spaceName">Space Name<span className="text-primary">*</span></label>
              <Input
                type="text"
                name="spaceName"
                id="spaceName"
                onChange={handleChange}
                value={venueData.spaceName}
                placeholder="Enter the Space name"
                className="w-2/3 max-md:w-full mt-2 2xl:mb-5 mb-3 "
              />
            </div>
            <div>
              {" "}
              <label htmlFor="category">Category</label>
              <Input
                type="text"
                name="category"
                id="category"
                onChange={handleChange}
                value={venueData.category}
                placeholder="Enter Category"
                className="w-2/3 max-md:w-full mt-2 2xl:mb-5 mb-3 "
              />
            </div>
            <div className="">
              {" "}
              <label htmlFor="eventEntityType">Venue Type</label>
              <Select 
              onValueChange={
                (value) => {
                  setVenueData({...venueData, eventEntityType: value})
                }
              }
              value={venueData.eventEntityType}
              >
                <SelectTrigger className="w-2/3 max-md:w-full mt-2 2xl:mb-5 mb-3  border border-[#B2C2D9] rounded-lg px-3 py-2 text-[#334155] focus:outline-none">
                  <SelectValue placeholder="Venue Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotels">Hotels</SelectItem>
                  <SelectItem value="restaurants">Restaurants</SelectItem>
                  <SelectItem value="clubs">Clubs</SelectItem>
                  <SelectItem value="bars">Bars</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              {" "}
              <label htmlFor="address">Address<span className="text-primary">*</span></label>
              <Textarea
                name="address"
                id="  address"
                rows={4}
                onChange={handleChange}
                value={venueData.address}
                placeholder="Enter  Address"
                className="w-2/3 max-md:w-full mt-2 2xl:mb-5 mb-3 "
              />
            </div>
           
            <div className="md:flex gap-5 w-2/3 max-md:w-full">
              <div className="w-1/2 max-md:w-full">
                {" "}
                <label htmlFor="zipCode">Zip code<span className="text-primary">*</span></label>
                <Input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  onChange={handleChange}
                  value={venueData.zipCode}
                  placeholder="Enter Zip code"
                  className=" mt-2 2xl:mb-5 mb-3 "
                />
              </div>
              <div className="w-1/2 max-md:w-full">
                {" "}
                <label htmlFor="phoneNumber">Venue Phone Number</label>
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  onChange={handleChange}
                  value={venueData.phoneNumber}
                  placeholder="Enter Phone Number"
                  className=" mt-2 2xl:mb-5 mb-3 "
                />
              </div>
            </div>
            <div className="md:flex gap-5 w-2/3 max-md:w-full">
              <div className="w-1/2 max-md:w-full">
                {" "}
                <label htmlFor="city">City</label>
                <Input
                  type="text"
                  name="city"
                  id="city"
                  onChange={handleChange}
                  value={venueData.city}
                  placeholder="Enter City"
                  className=" mt-2 2xl:mb-5 mb-3 "
                />
              </div>
              <div className="w-1/2 max-md:w-full">
                {" "}
                <label htmlFor="state">State</label>
                <Input
                  type="text"
                  name="state"
                  id="state"
                  onChange={handleChange}
                  value={venueData.state}
                  placeholder="Enter State"
                  className=" mt-2 2xl:mb-5 mb-3 "
                />
              </div>
            </div>

            <div>
              {" "}
              <label htmlFor="email">Contact Email Address</label>
              <Input
                type="email"
                name="email"
                id="email"
                value={venueData.email}
                onChange={handleChange}
                placeholder="Enter Contact Email"
                className="w-2/3 mt-2 2xl:mb-5 mb-3 max-md:w-full"
              />
            </div>
            <div className="md:flex gap-5 w-2/3 max-md:w-full">
              <div className="w-1/2 max-md:w-full">
                {" "}
                <label htmlFor="standing"> Capacity Standing</label>
                <Input
                  type="text"
                  name="standing"
                  id="standing"
                  value={venueData.standing}
                  onChange={handleChange}
                  placeholder="Enter Capacity Standing"
                  className=" mt-2 2xl:mb-5 mb-3 "
                />
              </div>
              <div className="w-1/2 max-md:w-full">
                {" "}
                <label htmlFor="squareFeet">Space Size: Square feet</label>
                <Input
                  type="text"
                  name="squareFeet"
                  id="squareFeet"
                  onChange={handleChange}
                  value={venueData.squareFeet}
                  placeholder="Enter Square feet"
                  className=" mt-2 2xl:mb-5 mb-3 "
                />
              </div>
            </div>

            <div className="md:flex gap-5 w-2/3 max-md:w-full">
              <div className="w-1/2 max-md:w-full">
                {" "}
                <label htmlFor="country"> Country</label>
                <div className=" mt-2 2xl:mb-5 mb-3 ">
                  <Combobox 
                  text={venueData.country}
                  onChange={
                    (text) => {
                      setVenueData({...venueData, country: text})
                    }
                  }
                  options={countries}
                  placeholder="Select Country"
                  searchPlaceholder="Search Country"
                  />
                </div>
              </div>
              <div className="w-1/2 max-md:w-full">
                {" "}
                <label htmlFor="rating">Rating(0-5)<span className="text-primary">*</span></label>
                <Input
                  type="text"
                  name="rating"
                  id="rating"
                  onChange={handleChange}
                  value={venueData.rating}
                  placeholder="Enter Rating"
                  className=" mt-2 2xl:mb-5 mb-3 "
                />
              </div>
            </div>

            <div className="md:flex gap-5 w-2/3 max-md:w-full">
              <div className="w-1/2 max-md:w-full">
                {" "}
                <label htmlFor="phoneNumberTwo"> contact Number</label>
                <Input
                  type="text"
                  name="phoneNumberTwo"
                  id="phoneNumberTwo"
                  onChange={handleChange}
                  value={venueData.phoneNumberTwo}
                  placeholder="Enter contact Number"
                  className=" mt-2 2xl:mb-5 mb-3 "
                />
              </div>
              <div className="w-1/2 max-md:w-full">
                {" "}
                <label htmlFor="websiteUrl">Website Url</label>
                <Input
                  type="text"
                  name="websiteUrl"
                  id="websiteUrl"
                  onChange={handleChange}
                  value={venueData.websiteUrl}
                  placeholder="Enter Website Url"
                  className=" mt-2 2xl:mb-5 mb-3 "
                />
              </div>
            </div>

            <div className="md:flex gap-5 w-2/3 max-md:w-full">
              <div className="w-1/2 max-md:w-full">
                {" "}
                <label htmlFor="seated">Capacity Seated</label>
                <Input
                  type="text"
                  name="seated"
                  id="seated"
                  onChange={handleChange}
                  value={venueData.seated}
                  placeholder="Enter Capacity Seated"
                  className=" mt-2 2xl:mb-5 mb-3 "
                />
              </div>
              <div className="w-1/2 max-md:w-full">
                {" "}
                <label htmlFor="status">Venue Status </label>
                <Input
                  type="text"
                  name="status"
                  id="status"
                  onChange={handleChange}
                  value={venueData.status}
                  placeholder="Enter Venue Status"
                  className=" mt-2 2xl:mb-5 mb-3 "
                />
              </div>
            </div>

            <div className="md:flex gap-5 w-2/3 max-md:w-full">
              <div className="w-1/2 max-md:w-full">
                {" "}
                <label htmlFor="rentalFee">Rental Fee</label>
                <Input
                  type="text"
                  name="rentalFee"
                  id="rentalFee"
                  onChange={handleChange}
                  value={venueData.rentalFee}
                  placeholder="Enter Rental Fee"
                  className=" mt-2 2xl:mb-5 mb-3 "
                />
              </div>
              <div className="w-1/2 max-md:w-full">
                {" "}
                <label htmlFor="permitRequired">Permit Required </label>
                <Input
                  type="text"
                  name="permitRequired"
                  id="permitRequired"
                  onChange={handleChange}
                  value={venueData.permitRequired}
                  placeholder="Enter Permit Required"
                  className=" mt-2 2xl:mb-5 mb-3 "
                />
              </div>
            </div>

            {optionalData.map((item, index) => (
              <div key={index}>
                <label htmlFor={item}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </label>
                <Input
                  type="text"
                  name={item}
                  id={item}
                  onChange={handleChange}
                  value={
                    venueData[item as keyof typeof venueData] as string
                  }
                  placeholder={`Enter ${item}`}
                  className="w-2/3 max-md:w-full mt-2 2xl:mb-5 mb-3 "
                />
              </div>
            ))}

            <div className="w-2/3 mb-6 max-md:w-full">
              <label htmlFor="images">Pictures</label>
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
                          Upload Venue Pictures
                        </h3>
                      </div>
                    </div>
                    <span className="block text-center text-xs text-[#818181] sm:text-sm mt-4">
                      Upload multiple pictures if necessary
                    </span>
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
                className="bg-primary  text-white w-full py-3 rounded-lg hover:opacity-80 mt-7"
              >
                Edit Venue
              </button>
            </div>
          </form>
          <div className="w-2/3 mb-6 max-md:w-full">
            {/* <button
              type="submit"
              className="bg-red-600  text-white w-full py-3 rounded-lg hover:opacity-80"
            >
              Delete Venue from Database
            </button> */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="submit"
                  className="bg-red-600  text-white w-full py-3 rounded-lg hover:opacity-80"
                >
                  Delete Venue from Database
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base">
                    This action cannot be undone. This will permanently delete
                    the Venue from the database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-lg">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 text-lg text-white hover:opacity-80"
                    onClick={() => handleDelete(venueId as string)}
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

export default VenueEditForm;

const optionalData = [
  "neighborhood",
  "contactName",
  "updatedSQFT",
  "maxCeilingHeight",
  "spaceSizeCapacity",
  "spaceSizeSquareFeet",
  "ratesConfirmedOn",
  "floorPlan",
  "pgVenueBoxLink",
  "boxFolderFileTypes",
  "otherFiles",
  "laborStatus",
  "exclusiveVendors",
  "pgProject",
  "pgContactName",
  "notes",
  "transportation",
];



const countries = countryList.map((country) => {
  return {
    value: country,
    label: country,
  };
}
);