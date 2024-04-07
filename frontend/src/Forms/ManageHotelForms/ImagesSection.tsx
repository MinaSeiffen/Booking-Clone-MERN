import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
      } = useFormContext<HotelFormData>();

    const excistingImages = watch("imageUrls")

    const handleDeleteImage = (eve:React.MouseEvent<HTMLButtonElement, MouseEvent> ,imageUrl:string) => {
        eve.preventDefault();
        setValue("imageUrls", excistingImages.filter((url)=> url !== imageUrl))
    }

  return (
    <div>
        <h2 className="text-2xl font-bold mb-3">Images</h2>
        <div className="border rounded p-4 flex flex-col gap-4">

            {excistingImages && (
                <div className="grid grid-cols-6 gap-4">
                    {excistingImages.map((url)=>(
                        <div className="relative group">
                            <img src={url} className="min-h-full object-cover" />
                            <button onClick={(eve)=>{handleDeleteImage(eve,url)}} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">Delete</button>
                        </div>
                    ))}
                </div>
            )}

            <input type="file" multiple accept="image/*" className="w-full text-gray-700 font-normal" {...register("imageURLs" ,{
                validate: (imageFiles)=>{
                    const totalLength = imageFiles.length + (excistingImages.length || 0);
                    if (totalLength === 0) {
                        return "Please Upload at least one image"
                    } 
                    if (totalLength > 6) {
                        return "Images can not be more than 6 images"
                    }
                }
            })} />
        </div>
        {errors.imageURLs && (
        <span className="text-red-600 text-sm font-bold"> {errors.imageURLs.message} </span>
      )}
    </div>
  )
}

export default ImagesSection