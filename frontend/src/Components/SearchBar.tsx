import { FormEvent, useState } from "react";
import { useSearchContext } from "../Context/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultConut, setAdultConut] = useState<number>(search.adultCount);
  const [childConut, setChildConut] = useState<number>(search.childCount);

  const handleSubmit = (eve: FormEvent) => {
    eve.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultConut,
      childConut
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-row items-center flex-1 bg-white px-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          type="text"
          placeholder="Going To?"
          className="text-base w-full focus:outline-none py-2"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <div className="flex bg-white px-1 gap-1">
        <label className="items-center flex text-base">
          Adults:
          <input
            type="number"
            className="w-full py-2 focus:outline-none font-bold"
            min={1}
            max={20}
            value={adultConut}
            onChange={(event) => setAdultConut(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex text-base">
          Children:
          <input
            type="number"
            className="w-full py-2 focus:outline-none font-bold"
            min={0}
            max={20}
            value={childConut}
            onChange={(event) => setChildConut(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div className="px-1">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="w-full px-3 bg-white focus:outline-none py-2"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="w-full px-3 bg-white focus:outline-none py-2"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="felx grid grid-cols-2 ml-9 gap-2 justify-center items-center">
        <button className="w-fit bg-blue-600 text-white h-full p-2 font-bold text-lg hover:bg-blue-500 rounded-lg">
          Search
        </button>
        <button className="w-fit bg-red-600 text-white h-full p-2 font-bold text-lg rounded-lg hover:bg-red-500">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
