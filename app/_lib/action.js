"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export const signInAction = async function () {
  await signIn("google", { redirectTo: "/account" });
};
export const signOutAction = async function () {
  await signOut("google", { redirectTo: "/ " });
};
export const updateGuestAction = async function (formData) {
  const session = await auth();
  if (!session) throw new Error("user needs to be logged in");
  const nationalityreal = formData.get("nationality");
  const nationalID = formData.get("nationalID");

  const [nationality, countryFlag] = nationalityreal.split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please provide a valid nationalID");
  }
  const updatedData = {
    nationality,
    countryFlag,
    nationalID,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
};
export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("user needs to be logged in");

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function updateReservationAction(reservationId, formData) {
  const session = await auth();
  if (!session) throw new Error("user needs to be logged in");

  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const updatedBooking = { numGuests, observations };

  const { error } = await supabase
    .from("bookings")
    .update(updatedBooking)
    .eq("id", reservationId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${reservationId}`);
  redirect("/account/reservations");
}

export async function createReservationAction(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("user needs to be logged in");
  const newBooking = {
    ...bookingData,
    status: "uncomfirmed",
    numGuests: +formData.get("numGuests"),
    observations: formData.get("observations"),
    totalPrice: bookingData.cabinPrice,
    hasBreakfast: false,
    isPaid: false,
    guestId: session.user.guestId,
    extrasPrice: 0,
  };
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/thankyou");
}
