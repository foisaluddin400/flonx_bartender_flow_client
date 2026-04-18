import { useParams } from 'react-router-dom';
import Image1 from '../../assets/header/image.png';
import { Navigate } from '../../Navigate';
import { useGetSingleVenueShiftQuery } from '../redux/api/shiftApi';

const VenueDetails = () => {
  const { id } = useParams();

  const { data: singleVenueData, isLoading, isError } =
    useGetSingleVenueShiftQuery({ id });

  const venue = singleVenueData?.data; // 👈 main data

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (isError) return <p className="text-red-500">Error loading data</p>;

  return (
    <div className="px-4 pt-6 pb-11 text-white">
      <div className="flex items-center">
        <Navigate />
        <h1 className="text-[16px] italic text-white font-montserrat">
          Venue Details
        </h1>
      </div>

      {/* Logo */}
      <div className="py-4">
        <img
          className="w-[90px] h-[90px] object-cover rounded-2xl"
          src={venue?.logo || Image1}
          alt="Logo"
        />
      </div>

      {/* Venue Name */}
      <div className="bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
        <h1 className="text-[#C9C6D6] text-sm mb-2">Venue Name</h1>
        <p>{venue?.name}</p>
      </div>

      {/* Owner Name */}
      <div className="mt-4 bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
        <h1 className="text-[#C9C6D6] text-sm mb-2">Owner Name</h1>
        <p>{venue?.venueOwner?.name}</p>
      </div>

      {/* Email */}
      <div className="mt-4 bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
        <h1 className="text-[#C9C6D6] text-sm mb-2">Contact Email</h1>
        <p>{venue?.email}</p>
      </div>

      {/* Phone */}
      <div className="mt-4 bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
        <h1 className="text-[#C9C6D6] text-sm mb-2">Contact Number</h1>
        <p>{venue?.phone}</p>
      </div>

      {/* Address */}
      <div className="mt-4 bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
        <h1 className="text-[#C9C6D6] text-sm mb-2">Venue Address</h1>
        <p>{venue?.address}</p>
      </div>
    </div>
  );
};

export default VenueDetails;