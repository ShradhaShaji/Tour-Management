// ViewBookings.jsx

import React, { useState, useEffect } from 'react';
import '../styles/view-booking.css'; // Ensure you create this CSS file for styling
import { Container, ListGroup } from 'reactstrap';


const BASE_URL = 'http://localhost:4000/api/v1';

// Import necessary dependencies and styles

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${BASE_URL}/booking`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.success) {
        setBookings(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Fetch error: ", error.message);
    }
  };

  return (
    <section>
      <Container>
        <h1 className="text-center mb-4 user__bookings-title">All Bookings</h1>
        <ListGroup className='user__bookings'>
          {bookings.map(booking => (
            <div className="booking__item" key={booking._id}>
              <div className='w-100'>
                <div className='d-flex align-items-center justify-content-between'>
                  <div>
                    <h5>Passenger Name: {booking.fullName}</h5>
                    <p>Booked on:{new Date(booking.createdAt).toLocaleDateString("en-US")}</p>
                  </div>
                  <div>
                    <h6>Tour: {booking.tourName}</h6>
                    <p>Email: {booking.userEmail}</p>
                    <p>Guests: {booking.guestSize}</p>
                    <p>Phone: {booking.phone}</p>
                    <p>Travel date: {new Date(booking.bookAt).toLocaleDateString("en-US")}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ListGroup>
      </Container>
    </section>
  );
};

export default ViewBookings;
