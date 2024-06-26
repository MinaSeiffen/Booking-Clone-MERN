import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../Forms/BookingForm/BookingForm";
import { useSearchContext } from "../Context/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailSummary from "../Components/BookingDetailSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../Context/AppContext";

const Booking = () => {
  const {stripePromise} = useAppContext()
  const search = useSearchContext();

  const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const night =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(night));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString()
      ),
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  );


  const { data: hotel } = useQuery(
    "getAnyHotelById",
    () => apiClient.getAnyHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );
  const { data: currentUser } = useQuery(
    "getCurrentUser",
    apiClient.getCurrentUser
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-2 container w-[90vw]">
      <BookingDetailSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUser && paymentIntentData && (
        <Elements stripe={stripePromise} options={{
          clientSecret: paymentIntentData.clientSecret,
        }}>
          <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData} />
        </Elements>
         )}
    </div>
  );
};

export default Booking;
