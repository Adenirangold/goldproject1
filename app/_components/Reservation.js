import React from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

async function Reservation({ cabin }) {
  const [setting, bookedDate] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400]">
      <DateSelector
        cabin={cabin}
        setting={setting}
        bookedDate={bookedDate}
      ></DateSelector>
      {session?.user ? (
        <ReservationForm user={session.user} cabin={cabin}></ReservationForm>
      ) : (
        <LoginMessage></LoginMessage>
      )}
    </div>
  );
}

export default Reservation;
