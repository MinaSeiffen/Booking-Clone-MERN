import React, { useContext, useState } from "react";

type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
  ) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined)

type SearchContextProviderProps = {
    children: React.ReactNode;
}

export const SearchContextProvider = ({children} : SearchContextProviderProps)=>{
    
    const [destination , setDestination] = useState<string>("")
    const [checkIn, setCheckIn] = useState<Date>(new Date())
    const [checkOut, setCheckOut] = useState<Date>(new Date())
    const [adultCount, setAdultConut] = useState<number>(1)
    const [childCount, setChildConut] = useState<number>(0)
    const [hotelId, setHotelId] = useState<string>("")

    const saveSearchValues = (destination:string , checkIn:Date , checkOut:Date , adultConut: number , childConut: number , hotelId?:string)=>{
        setDestination(destination)
        setCheckIn(checkIn)
        setCheckOut(checkOut)
        setAdultConut(adultConut)
        setChildConut(childConut)
        if (hotelId) {
            setHotelId(hotelId)
        }
    }
    
    return (
        <SearchContext.Provider value={{destination , checkIn , checkOut , adultCount , childCount , saveSearchValues , hotelId}} >
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = ()=>{
    const context = useContext(SearchContext)
    return context as SearchContext;
}