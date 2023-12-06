export interface BookingDetails {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  additionalneeds: string;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
}

export interface CreatedBookingDetails {
  bookingid: number;
  booking: BookingDetails;
}
