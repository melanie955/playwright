import { test, expect } from '@playwright/test';
import { getAuthToken } from '../../utils/auth-utils';
import { BOOKING_URL } from '../../utils/constants';
import { createBooking } from '../../utils/booking-utils';
import {
  BookingDetails,
  CreatedBookingDetails,
} from '../../utils/dtos/booking-details';
import { faker } from '@faker-js/faker';

test('update booking', async ({ request }) => {
  const bookingResponseBody: CreatedBookingDetails = await createBooking();
  const bookingId = (await bookingResponseBody).bookingid;

  const token = await getAuthToken(
    process.env.USERNAME!,
    process.env.PASSWORD!,
  );

  const updatedFirstName = faker.person.firstName();
  const updatedLastName = faker.person.lastName();

  const updateResponse = await request.patch(`${BOOKING_URL}/${bookingId}`, {
    headers: {
      Cookie: `token=${token}`,
    },
    data: {
      firstname: updatedFirstName,
      lastname: updatedLastName,
    },
  });

  expect(updateResponse.ok()).toBeTruthy();

  const getResponse = await request.get(`${BOOKING_URL}/${bookingId}`);
  const getResponseBody: BookingDetails = await getResponse.json();
  expect(getResponseBody.firstname).toBe(updatedFirstName);
  expect(getResponseBody.lastname).toBe(updatedLastName);
  expect(getResponseBody.depositpaid).toBe(getResponseBody.depositpaid);
  expect(getResponseBody.totalprice).toBe(getResponseBody.totalprice);
  expect(getResponseBody.bookingdates).toStrictEqual(
    getResponseBody.bookingdates,
  );
  expect(getResponseBody.additionalneeds).toBe(getResponseBody.additionalneeds);
});
