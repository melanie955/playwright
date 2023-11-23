import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import { BookingDetails } from '../dtos/booking-details';

export const BookingDetailsFactory = Factory.Sync.makeFactory<BookingDetails>({
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  totalprice: faker.number.int({ max: 999 }),
  depositpaid: true,
  bookingdates: {
    checkin: faker.date.soon({ days: 1 }).toISOString().split('T')[0],
    checkout: faker.date.soon({ days: 8 }).toISOString().split('T')[0],
  },
  additionalneeds: faker.lorem.word(),
});
