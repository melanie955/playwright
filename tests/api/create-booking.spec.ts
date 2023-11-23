import { test, expect } from '@playwright/test';
import { BOOKING_URL } from '../../utils/constants';
import { BookingDetailsFactory } from '../../utils/data-factory/generate-booking-details';

test('create booking', async ({ request }) => {
  const bookingDetails = BookingDetailsFactory.build();

  const bookingResponse = await request.post(BOOKING_URL, {
    data: bookingDetails,
  });

  expect(bookingResponse.ok()).toBeTruthy();
  // TODO
  // Add response body validation
  // const bookingResponseBody = await bookingResponse.json();
});
