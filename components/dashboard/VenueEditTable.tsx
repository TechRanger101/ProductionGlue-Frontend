import React,{useState,useEffect} from "react";
import { DataTable } from "../data-table/venue-table";
import { Venues, columns } from "@/app/dashboard/edit/venue/columns";
import { useVenueTablePageStore } from "@/store/venueTablePage";
import axios from "axios";
 
const VenueEditTable =  () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 50,
    lastEventEntityId: "",
    currentItemsCount: 0,
    totalItemsCount: 0,
  });
  const [perPage, setPerPage] = useState(10);
  const {venueTablePage } = useVenueTablePageStore();
  console.log(venueTablePage, "venueTablePage");

  const getVenues = async () => {
    const res = await axios.get(`/api/venues`, {
      params: {
        limit: 100,
        currentItemsCount: pagination?.currentItemsCount,
        totalItemsCount: pagination.totalItemsCount,
      },
    });
    const venues = await res.data;
    setPagination(venues.pagination);
    setData(venues.venues);
  };

  const loadMoreVenues = async () => {
    if (pagination.lastEventEntityId === null) {
      return;
    }
    const res = await axios.get(`/api/venues`, {
      params: {
        limit: 50,
        lastEventEntityId: pagination?.lastEventEntityId,
        currentItemsCount: pagination?.currentItemsCount,
        totalItemsCount: pagination.totalItemsCount,
      },
    });
    const venues = await res.data;
    setPagination(venues.pagination);
    // @ts-ignore
    setData((prevData) => [...prevData, ...venues.venues]);
  };

  // console.log(data, "data");

  const checkCondition = (currentPage: any, pagination: any) => {
    const totalPages = Math.ceil(pagination.currentItemsCount / perPage) - 1;
    if (totalPages > 0 && currentPage >= totalPages) {
      loadMoreVenues();
    } else {
      return;
    }
  };

  useEffect(() => {
    getVenues();
  }, []);

  useEffect(() => {
    checkCondition(venueTablePage, pagination);
  }, [venueTablePage]);


  return (
    <div>
        <DataTable
            columns={columns}
            data={data}
            pageSize={pagination.limit}
            setPerPage={setPerPage}
            getVenues={loadMoreVenues}
            totalItemsCount={pagination.totalItemsCount}
          />
    </div>
  );
};

export default VenueEditTable;
