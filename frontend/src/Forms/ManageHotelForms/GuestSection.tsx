import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
    <div className="p-7 bg-gray-300">
      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Adult
          <input
            type="number"
            min={0}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("adultCount", {
                required: "Adult Count is required",
            })}
            />
          {errors.adultCount && (
              <span className="text-red-600 text-sm font-bold">
              {errors.adultCount?.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Child 
          <input
            type="number"
            min={0}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("childCount", {
                required: "Child Count is required",
            })}
            />
          {errors.childCount && (
              <span className="text-red-600 text-sm font-bold">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
          </div>
  );
};

export default GuestSection;
