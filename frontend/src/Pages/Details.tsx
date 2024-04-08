import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import * as apiClient from "../api-client"
import { AiFillStar } from "react-icons/ai"
import GuestInfoForm from "../Forms/GuestInfoForm/GuestInfoForm"

const Details = () => {
    const {hotelId} = useParams()
    const {data:hotel} = useQuery("getAnyHotelById" ,()=> apiClient.getAnyHotelById(hotelId as string) , {
        enabled:!!hotelId
    } )
    
    if (!hotel) {
        return <></>
    }

  return (
    <div className="container space-y-6">
        <div>
            <span className="flex">
                {Array.from({length: hotel.starRating}).map(()=>(
                    <AiFillStar className="fill-yellow-400" size={25}/>
                ))}
            </span>
            <h1 className="text-3xl font-bold">{hotel.name}</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {hotel.imageUrls.map((image)=>(
                <div className="h-[300px]">
                    <img src={image} className="w-full rounded-md h-full object-cover object-center" alt={hotel.name} />
                </div>
            ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            {hotel.facilities.map((facility) =>(
                <div className="border border-slate-300 rounded-sm p-3">
                    {facility}
                </div>
            ))}
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[2fr_1fr]">
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="h-fit">
                <GuestInfoForm pricePerNight={hotel.pricePerNight} hotelId={hotel._id}/>
            </div>
        </div>
    </div>
  )
}

export default Details