import { test, expect } from '@playwright/test';
import { BOOKING_URL } from '../../utils/constants';
import { BookingDetailsFactory } from '../../utils/data-factory/generate-booking-details';
import { CreatedBookingDetails } from '../../utils/dtos/booking-details';

test('create booking', async ({ request }) => {
  const bookingDetails = BookingDetailsFactory.build();

  const bookingResponse = await request.post(BOOKING_URL, {
    data: bookingDetails,
  });

  expect(bookingResponse.ok()).toBeTruthy();

  const bookingResponseBody: CreatedBookingDetails =
    await bookingResponse.json();
  expect(bookingResponseBody.bookingid).toBeGreaterThanOrEqual(1);
  expect(bookingResponseBody.booking.firstname).toBe(bookingDetails.firstname);
  expect(bookingResponseBody.booking.lastname).toBe(bookingDetails.lastname);
  expect(bookingResponseBody.booking.depositpaid).toBe(
    bookingDetails.depositpaid,
  );
  expect(bookingResponseBody.booking.totalprice).toBe(
    bookingDetails.totalprice,
  );
  expect(bookingResponseBody.booking.bookingdates).toStrictEqual(
    bookingDetails.bookingdates,
  );
  expect(bookingResponseBody.booking.additionalneeds).toBe(
    bookingDetails.additionalneeds,
  );
});
