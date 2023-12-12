import { request } from '@playwright/test';
import { BookingDetailsFactory } from './data-factory/generate-booking-details';
import { BOOKING_URL } from './constants';
import { CreatedBookingDetails } from './dtos/booking-details';

export async function createBooking() {
  const contextRequest = await request.newContext();
  const bookingDetails = BookingDetailsFactory.build();

  const bookingResponse = await contextRequest.post(BOOKING_URL, {
    data: bookingDetails,
  });

  const bookingResponseBody: CreatedBookingDetails =
    await bookingResponse.json();

  return bookingResponseBody;
}
