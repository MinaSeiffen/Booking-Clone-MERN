import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name", { required: "name is required" })}
        />
        {errors.name && (
          <span className="text-red-600 text-sm font-bold">
            {errors.name.message}
          </span>
        )}
      </label>

      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("city", { required: "city is required" })}
          />
          {errors.city && (
            <span className="text-red-600 text-sm font-bold">
              {errors.city.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("country", { required: "Country is required" })}
          />
          {errors.country && (
            <span className="text-red-600 text-sm font-bold">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className="text-red-600 text-sm font-bold">
            {errors.description.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price Per Night
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("pricePerNight", {
            required: "Price Per Night is required",
          })}
        />
        {errors.pricePerNight && (
          <span className="text-red-600 text-sm font-bold">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Star Ratings
        <select
          {...register("starRating", {
            required: "This Field is Required",
          })}
          className="border rounded w-full py-1 px-2 text-gray-700 font-normal"
        >
          <option value="" className="font-bold text-sm">
            Select a Rating
          </option>
          {[1, 2, 3, 4, 5].map((number) => (
            <option value={number}>{number}</option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-600 text-sm font-bold">
            {errors.starRating.message}
          </span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
