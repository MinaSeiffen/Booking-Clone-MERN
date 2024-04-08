import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../Context/SearchContext";
import { useAppContext } from "../../Context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const navigate = useNavigate()
  const location = useLocation()

  const search = useSearchContext();

  const {isLoggedIn} = useAppContext()

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInCheck = (data: GuestInfoFormData)=>{
    search.saveSearchValues("" , data.checkIn , data.checkOut , data.adultCount , data.childCount);
    navigate("/signin" , {state: {from: location}});
  }

  const onSubmit = (data: GuestInfoFormData)=>{
    search.saveSearchValues("" , data.checkIn , data.checkOut , data.adultCount , data.childCount);
    navigate(`/hotel/${hotelId}/booking`);
  }

  return (
    <div className="flex flex-col bg-blue-300 p-4 gap-4">
      <h3 className="text-md font-bold">£{pricePerNight}</h3>
      <form onSubmit={isLoggedIn? handleSubmit(onSubmit) : handleSubmit(onSignInCheck)}>
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
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
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
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
          <div className="flex bg-white px-1 gap-1">
            <label className="items-center flex text-base">
              Adults:
              <input
                type="number"
                className="w-full py-2 focus:outline-none font-bold"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This Field is required",
                  min: {
                    value: 1,
                    message: "Must be at least 1 adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="items-center flex text-base">
              Children:
              <input
                type="number"
                className="w-full py-2 focus:outline-none font-bold"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (<button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl ">Book Now</button>) : (<button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl ">Sign in to book</button>) }
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
