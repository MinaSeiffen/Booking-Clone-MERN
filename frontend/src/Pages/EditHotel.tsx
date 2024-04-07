import { useParams } from "react-router-dom"
import * as apiClient from "../api-client"
import { useMutation, useQuery } from "react-query"
import ManageHotelForm from "../Forms/ManageHotelForms/ManageHotelForm"
import { useAppContext } from "../Context/AppContext"

const EditHotel = () => {
    const {hotelId} = useParams()
    const {showToast} = useAppContext()
    const {data: hotel} = useQuery("getHotelById" ,()=> apiClient.getHotelById(hotelId || ''),{
        enabled: !!hotelId,
    })

    const {mutate , isLoading} = useMutation(apiClient.updateMyHotelById,{
      onSuccess: ()=>{
        showToast({message: "Hotel updated Successfully" , type:"SUCCESS"})
      },
      onError: ()=>{
        showToast({message: "Failed to update Hotel" , type:"ERROR"})
      }
    })

    const handleSave = (hotelForm: FormData) => {
      mutate(hotelForm)
    }

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  )
}

export default EditHotel