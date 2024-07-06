import React, { useState, useEffect } from 'react';
import '../styles/delete-tours.css';

const DeleteToursPage = () => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/tours?page=${currentPage - 1}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tours');
        }
        const data = await response.json();
        setTours(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchTours();
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/tours/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete tour');
      }
      setTours(tours.filter((tour) => tour._id !== id));
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <h1 className="delete-tours-header">Delete Tours</h1>
      {tours.map((tour) => (
        <div key={tour._id} className="tour-card">
          <img src={tour.photo} alt={tour.title} />
          <div className="tour-details">
            <h2>{tour.title}</h2>
            <p>City: {tour.city}</p>
            <p>Address: {tour.address}</p>
            <p>Distance: {tour.distance} miles</p>
            <p>Description: {tour.desc}</p>
            <p>Price: ${tour.price}</p>
            <p>Max Group Size: {tour.maxGroupSize}</p>
            <button onClick={() => handleDelete(tour._id)}>Delete</button>
          </div>
        </div>
      ))}
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default DeleteToursPage;
