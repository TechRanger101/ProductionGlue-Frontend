"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { uploadFileToS3 } from "@/utils/uploadFileToS3";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadSmall from "../LoadSmall";
import { Combobox } from "../Combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VenueAddForm = () => {
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
  const [loading, setLoading] = useState<boolean>(false);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const router = useRouter();

  const handleImageChange = (e: any) => {
    setImages([...images, e.target.files[0]]);
  };

  const handleDeleteImage = (index: number) => {
    const newImages = images.filter((item, i) => i !== index);
    setImages(newImages);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setVenueData({ ...venueData, [name]: value });
  };

  const uploadImages = async () => {
    let links: string[] = [];
    for (let i = 0; i < images.length; i++) {
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
    if (images?.length === 0) {
      toast.error("Please upload images");
      return;
    }
    // console.log(venueData);
    if (!venueData.name || !venueData.rating || !venueData.zipCode) {
      toast.error("Please fill all the fields name, rating, zipCode");
      return;
    }

    setLoading(true);

    // console.log(images);
    await uploadImages();
    console.log(venueData);

    try {
      const res = await axios.post("/api/venue", {
        ...venueData,
        images: imagesLink,
      });
      console.log(res.data);

      if (res.data?.status === 200) {
        toast.success("Venue Added Successfully");
        setLoading(false);
        router.push("/dashboard/venue");
        setVenueData({
          name: "",
          venue: "",
          spaceName: "",
          eventEntityType: "",
          address: "",
          zipCode: "",
          phoneNumber: "",
          city: "",
          state: "",
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
      }
      if (res.data?.status === 400) {
        toast.error(res.data?.message);
        setLoading(false);
      }
      console.log(res.data);
    } catch (error: any) {
      toast.error("Not able to add Venue");
      console.log(error.response.data);
      setLoading(false);
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
          {coverPhoto ? (
            <>
              <Image
                src={URL.createObjectURL(coverPhoto)}
                width={300}
                height={300}
                alt="cover photo"
                className="w-96 max-md:w-full h-56"
              />
            </>
          ) : (
            <>
              <div className="w-60 max-md:w-full h-56 relative rounded-md border-[#B2C2D9] border-solid border">
                <label
                  htmlFor="fileInput"
                  className="absolute bottom-0 w-full h-16 cursor-pointer bg-[#80767633] rounded-md flex justify-center items-center"
                >
                  <div className="text-[#818181] text-sm font-medium">
                    Cover Photo
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) {
                        setCoverPhoto(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>
            </>
          )}
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
                placeholder="Enter the name"
                className="w-2/3 max-md:w-full mt-2 2xl:mb-5 mb-3 "
              />
            </div>
            <div>
              {" "}
              <label htmlFor="name">
                Venue Name
                <span className="text-primary">*</span>
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                placeholder="Enter the name"
                className="w-2/3 max-md:w-full mt-2 2xl:mb-5 mb-3 "
              />
            </div>
            <div>
              {" "}
              <label htmlFor="spaceName">Space Name</label>
              <Input
                type="text"
                name="spaceName"
                id="spaceName"
                onChange={handleChange}
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
                placeholder="Enter Category"
                className="w-2/3 max-md:w-full mt-2 2xl:mb-5 mb-3 "
              />
            </div>
            <div>
              {" "}
              {/* <label htmlFor="eventEntityType">Venue Type</label>
              <select
                name="eventEntityType"
                id="eventEntityType"
                onChange={handleChange}
                value={venueData.eventEntityType}
                className="w-2/3 max-md:w-full mt-2 2xl:mb-5 mb-3  border border-[#B2C2D9] rounded-lg px-3 py-2 text-[#334155] focus:outline-none"
              >
                <option value="Venue Type1">Venue Type</option>
                <option value="Venue Type2">Venue Type</option>
              </select> */}
              <label htmlFor="eventEntityType">Venue Type</label>
              <Select 
              onValueChange={
                (value) => {
                  setVenueData({...venueData, eventEntityType: value})
                }
              }
              >
                <SelectTrigger className="w-2/3 max-md:w-full mt-2 2xl:mb-5 mb-3  border border-[#B2C2D9] rounded-lg px-3 py-2 text-[#334155] focus:outline-none">
                  <SelectValue placeholder="Venue Type" />
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectItem value="hotels">Hotels</SelectItem> */}
                  {
                    venueTypesOptions.map((item, index) => (
                      <SelectItem key={index} value={item.value}>{item.label}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
            <div>
              {" "}
              <label htmlFor="address">
                Address <span className="text-primary">*</span>
              </label>
              <Textarea
                name="address"
                id="  address"
                rows={4}
                onChange={handleChange}
                placeholder="Enter  Address"
                className="w-2/3 max-md:w-full mt-2 2xl:mb-5 mb-3 "
              />
            </div>
           
            <div className="md:flex gap-5 w-2/3 max-md:w-full">
              <div className="w-1/2 max-md:w-full">
                {" "}
                <label htmlFor="zipCode">
                  Zip code <span className="text-primary">*</span>
                </label>
                <Input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  onChange={handleChange}
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
                  placeholder="Enter Square feet"
                  className=" mt-2 2xl:mb-5 mb-3 "
                />
              </div>
            </div>

            <div className="md:flex gap-5 w-2/3 max-md:w-full">
              <div className="w-1/2 max-md:w-full">
                {" "}
                <label htmlFor="country"> Country</label>
                {/* <Input
                  type="text"
                  name="country"
                  id="country"
                  onChange={handleChange}
                  placeholder="Enter Country"
                  className=" mt-2 2xl:mb-5 mb-3 "
                /> */}
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
                <label htmlFor="rating">
                  Rating(0-5) <span className="text-primary">*</span>
                </label>
                <Input
                  type="number"
                  name="rating"
                  id="rating"
                  onChange={handleChange}
                  placeholder="Enter Rating"
                  className=" mt-2 2xl:mb-5 mb-3 "
                />
              </div>
            </div>

            <div className="md:flex gap-5 w-2/3 max-md:w-full">
              <div className="w-1/2 max-md:w-full">
                {" "}
                <label htmlFor="phoneNumberTwo"> Contact Number</label>
                <Input
                  type="text"
                  name="phoneNumberTwo"
                  id="phoneNumberTwo"
                  onChange={handleChange}
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
              {images?.map(
                (image, index) => (
                  console.log(image, " i"),
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
                )
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-primary  text-white w-full py-3 rounded-lg hover:opacity-80 mt-5 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
              >
                Add Venue to Database
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VenueAddForm;

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


export const countryList = [
	"Afghanistan",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas ",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia (Plurinational State of)",
	"Bonaire, Sint Eustatius and Saba",
	"Bosnia and Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory ",
	"Brunei Darussalam",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cayman Islands ",
	"Central African Republic ",
	"Chad",
	"Chile",
	"China",
	"Christmas Island",
	"Cocos (Keeling) Islands ",
	"Colombia",
	"Comoros ",
	"Congo (the Democratic Republic of the)",
	"Congo ",
	"Cook Islands ",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Curaçao",
	"Cyprus",
	"Czechia",
	"Côte d'Ivoire",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic ",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Falkland Islands  [Malvinas]",
	"Faroe Islands ",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern Territories ",
	"Gabon",
	"Gambia ",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Heard Island and McDonald Islands",
	"Holy See ",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran (Islamic Republic of)",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Korea (the Democratic People's Republic of)",
	"Korea (the Republic of)",
	"Kuwait",
	"Kyrgyzstan",
	"Lao People's Democratic Republic ",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands ",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia (Federated States of)",
	"Moldova (the Republic of)",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands ",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger ",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"Northern Mariana Islands ",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine, State of",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines ",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Republic of North Macedonia",
	"Romania",
	"Russian Federation ",
	"Rwanda",
	"Réunion",
	"Saint Barthélemy",
	"Saint Helena, Ascension and Tristan da Cunha",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Martin (French part)",
	"Saint Pierre and Miquelon",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Sint Maarten (Dutch part)",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia and the South Sandwich Islands",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan ",
	"Suriname",
	"Svalbard and Jan Mayen",
	"Sweden",
	"Switzerland",
	"Syrian Arab Republic",
	"Taiwan",
	"Tajikistan",
	"Tanzania, United Republic of",
	"Thailand",
	"Timor-Leste",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks and Caicos Islands ",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates ",
	"United Kingdom of Great Britain and Northern Ireland ",
	"United States Minor Outlying Islands ",
	"United States",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Venezuela (Bolivarian Republic of)",
	"Viet Nam",
	"Virgin Islands (British)",
	"Virgin Islands (U.S.)",
	"Wallis and Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
	"Åland Islands"
];

const venueTypes = [
  "Apartment",
  "Arena",
  "Art Gallery",
  "Atrium",
  "Auditorium",
  "Ballroom",
  "Bar",
  "Basketball Court",
  "Black Box",
  "Boardroom",
  "Bowling Alley",
  "Cabaret",
  "Café",
  "Car Park",
  "Chapel",
  "Church",
  "Classroom",
  "Clubhouse",
  "Colosseum",
  "Conference Room",
  "Courtyard",
  "Covered Outdoor Space",
  "Cruise",
  "Dance Studio",
  "Dining Hall",
  "Dining Room",
  "Drill Hall",
  "Event Space",
  "Exhibit Hall",
  "Exterior of Building",
  "Fieldhouse",
  "Foyer",
  "Gallery",
  "Garden",
  "Greenroom",
  "Gym",
  "Hall",
  "Hangar",
  "Hotel",
  "Ice Rink",
  "Island",
  "Kitchen",
  "Library",
  "Lobby",
  "Locker Room",
  "Loft",
  "Lounge",
  "Meeting Room",
  "Museum",
  "Music Hall",
  "National Park",
  "Nightclub",
  "Office",
  "Outdoor",
  "Park (Private)",
  "Park (Public)",
  "Patio",
  "Pavilion",
  "Penthouse",
  "Performance Hall",
  "Pier",
  "Plaza",
  "Pool Deck",
  "Pop Up Space",
  "Pre-Function",
  "Public Plaza",
  "Raw",
  "Reception Hall",
  "Reception Room",
  "Red Carpet Area",
  "Restaurant",
  "Retail Space",
  "Rooftop",
  "Rotunda",
  "Salon",
  "Screening Room",
  "Shopping Center",
  "Skybox",
  "Soundstage",
  "Sports Complex",
  "Stadium",
  "Stage",
  "Station",
  "Studio",
  "Suite",
  "Sundeck",
  "Tea Room",
  "Terrace",
  "Theater",
  "TV Studio",
  "Warehouse",
  "White Box",
  "Winery",
  "Work Area"
];

const venueTypesOptions = venueTypes.map((venue) => {
  return {
    value: venue,
    label: venue,
  };
}
);

const countries = countryList.map((country) => {
  return {
    value: country,
    label: country,
  };
}
);