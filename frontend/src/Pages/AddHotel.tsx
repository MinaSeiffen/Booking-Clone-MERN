import { useMutation } from "react-query";
import { useAppContext } from "../Context/AppContext";
import * as apiClient from "../api-client"
import ManageHotelForm from "../Forms/ManageHotelForms/ManageHotelForm";

const AddHotel = () => {
    const {showToast} = useAppContext()
    const {mutate, isLoading} = useMutation(apiClient.addHotel, {
        onSuccess: () =>{
            showToast({message: "Hotel added successfully" , type: "SUCCESS"})
        },
        onError: () =>{
            showToast({message: "Error Saving Hotel", type: "ERROR"})
        },
    })

    const handleHotel = (hotelFormData:FormData)=>{
        mutate(hotelFormData)
    }

  return <ManageHotelForm onSave={handleHotel} isLoading={isLoading} />;
};

export default AddHotel;
