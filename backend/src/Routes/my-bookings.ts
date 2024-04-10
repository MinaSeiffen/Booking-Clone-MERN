import express , {Request , Response} from "express"
import verifyToken from "../Middleware/auth"
import hotelModel from "../Models/hotels"
import { HotelType } from "../Shared/types"

const router = express.Router()

router.get("/" , verifyToken, async(req:Request, res:Response)=>{
    try {
        const hotels = await hotelModel.find({
            bookings: {
                $elemMatch: {userId: req.userId}
            },
        })

        const result = hotels.map((hotel)=>{
            const userBookings = hotel.bookings.filter((booking)=> booking.userId == req.userId)

            const hotelWithUserBookings: HotelType = {
                ...hotel.toObject(), bookings: userBookings,
            }
            return hotelWithUserBookings
        })

        res.status(200).send(result)

    } catch (error) {
        res.status(500).json({message: "Failed to get your bookings"})
    }
})

export default router