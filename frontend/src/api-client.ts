import { HotelType } from './../../backend/src/Shared/types';
import { RegisterForm } from "./Pages/Register";
import { SignInData } from "./Pages/SignIn";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

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