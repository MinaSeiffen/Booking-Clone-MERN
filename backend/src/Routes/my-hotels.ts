import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary"
import hotelModel from "../Models/hotels";
import verifyToken from "../Middleware/auth";
import { body } from "express-validator";
import { HotelType } from "../Shared/types";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  "/",
  verifyToken,[
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel Type is required"),
    body("adultCount").notEmpty().isNumeric().withMessage("Adult Count Type is required and must be a number"),
    body("childCount").notEmpty().isNumeric().withMessage("Child Count Type is required and must be a number"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night Type is required and must be a number"),
    body("facilities").notEmpty().isArray().withMessage("facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[]
        const newHotel: HotelType = req.body

        // 1. we need to upload images to Cloudinary

        const imagePromises = imageFiles.map(async (image)=>{
          const b64 = Buffer.from(image.buffer).toString("base64");
          let dataURI = "data:" + image.mimetype + ";base64," + b64;
          const res = await cloudinary.v2.uploader.upload(dataURI)
          return res.url;
        })

        const imagesURLs = await Promise.all(imagePromises)
        
        // 2. if the upload successful need to add the urls to the new hotel
        
        newHotel.imageUrls = imagesURLs
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId
        
        // 3. need to save the hotel to the database 

        const hotel = new hotelModel(newHotel)
        await hotel.save()

        res.status(200).send(hotel)

    } catch (error) {
        console.log("Error on creating Hotel:" , error)
        res.status(500).json({ error: "There is something went wrong with your request"})
    }
  }
);

router.get("/", verifyToken , async (req:Request, res:Response) => {
  try {
    const hotels = await hotelModel.find({userId:req.userId})
    res.status(200).json(hotels)
  } catch (error) {
    res.status(500).json({ error: "There is something went wrong in fetching hotels"})
  }
})

export default router;
