import { HotelSearchType, HotelType, PaymentIntentResponse, UserType } from './../../backend/src/Shared/types';
import { BookingFormData } from './Forms/BookingForm/BookingForm';
import { RegisterForm } from "./Pages/Register";
import { SignInData } from "./Pages/SignIn";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

export const getCurrentUser = async (): Promise<UserType>=>{
    const response = await fetch(`${API_BASE_URL}/api/users/me` , {
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error("Failed to get current user")
    }

    return response.json()
}

export const register = async (formData : RegisterForm)=>{
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    const responseBody = await response.json()

    if (!response.ok) {
        throw new Error(responseBody.message)
    }
}

export const signIn = async (formData: SignInData)=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/login` , {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    })

    const body = await response.json()

    if (!response.ok) {
        throw new Error(body.message)
    }
    return body
}

export const validateToken = async ()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        credentials: "include",
    })

    if (!response.ok){
        throw new Error("Token invalid")
    }

    return response.json()
}

export const logout = async ()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`,{
        method: "POST",
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error("error logging out")
    }
}

export const addHotel = async (hotelFormData:FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`,{
        method: "POST",
        credentials: "include",
        body: hotelFormData,
    })

    if (!response.ok) {
        throw new Error("Failed to add new Hotel")
    }

    return response.json()
}

export const getMyHotels = async () : Promise<HotelType[]>=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`,{
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error("Failed to get Hotels")
    }

    return response.json()
}

export const getHotelById = async (hotelId: string) : Promise<HotelType>=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`,{
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error("Failed to get Hotel")
    }

    return response.json()
}

export const updateMyHotelById = async (hotelForm:FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelForm.get("id")}` , {
        method: "PUT",
        credentials: "include",
        body:hotelForm
    })

    if (!response.ok) {
        throw new Error("Failed to update Hotel")
    }

    return response.json()
}

export type SearchParams = {
    destination?:string;
    checkIn?:string;
    checkOut?:string;
    adultConut?:string;
    childConut?:string;
    page?:string;
    facilities?:string[];
    types?:string[];
    stars?:string[];
    maxPrice?:string;
    sortOption?:string
}

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchType> =>{
    const queryParams = new URLSearchParams()
    queryParams.append("destination" , searchParams.destination || "")
    queryParams.append("checkIn" , searchParams.checkIn || "")
    queryParams.append("checkOut" , searchParams.checkOut || "")
    queryParams.append("adultConut" , searchParams.adultConut || "")
    queryParams.append("childConut" , searchParams.childConut || "")
    queryParams.append("page" , searchParams.page || "")

    queryParams.append("maxPrice" , searchParams.maxPrice || "")
    queryParams.append("sortOption" , searchParams.sortOption || "")

    searchParams.facilities?.forEach((facility) => queryParams.append("facilities" , facility))
    searchParams.types?.forEach((type) => queryParams.append("types" , type))
    searchParams.stars?.forEach((star) => queryParams.append("stars" , star))

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`)
    if (!response.ok) {
        throw new Error("Failed to search")
    }

    return response.json()
}

export const getAllHotels = async ():Promise<HotelType[]>=>{
    const response = await fetch(`${API_BASE_URL}/api/hotels`)
    if (!response.ok) {
        throw new Error("Can not find any Hotels")
    }
    return response.json()
}

export const getAnyHotelById = async(hotelId: string): Promise<HotelType> =>{
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`,{
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Can not find that Hotel")
    }
    return response.json()
}

export const createPaymentIntent = async (
    hotelId: string,
    numberOfNights: string
  ): Promise<PaymentIntentResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ numberOfNights }),
        headers: {
            "Content-Type": "application/json",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Error fetching payment intent");
    }
  
    return response.json();
  };

export const createRoomBooking = async (formData: BookingFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, {
        method: "POST",
        credentials: "include",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    })

    if (!response.ok) {
        throw new Error("There is something went wrong in Booking")
    }
}

export const getMyBookings = async(): Promise<HotelType[]>=>{
    const response = await fetch(`${API_BASE_URL}/api/my-bookings` , {
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error("There is something went wrong in geting your bookings")
    }

    return response.json()
}