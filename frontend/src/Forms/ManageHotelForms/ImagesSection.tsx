import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const {
        register,
        formState: { errors },
      } = useFormContext<HotelFormData>();

  return (
    <div>
        <h2 className="text-2xl font-bold mb-3">Images</h2>
        <div className="border rounded p-4 flex flex-col gap-4">
            <input type="file" multiple accept="image/*" className="w-full text-gray-700 font-normal" {...register("imageUrls" ,{
                validate: (imageFiles)=>{
                    const totalLength = imageFiles.length;
                    if (totalLength === 0) {
                        return "Please Upload at least one image"
                    } 
                    if (totalLength > 6) {
                        return "Images can not be more than 6 images"
                    }
                }
            })} />
        </div>
        {errors.imageUrls && (
        <span className="text-red-600 text-sm font-bold"> {errors.imageUrls.message} </span>
      )}
    </div>
  )
}

export default ImagesSection