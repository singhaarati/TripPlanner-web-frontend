import React, { useEffect, useState } from 'react';
import bookingService from '../services/bookingService';
import Footer from './Dashboard/Footer';
import TopBar from './Dashboard/TopBar';

export default function MyBookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    bookingService
      .getAllBookings()
      .then((res) => {
        setBookings(res.data.data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response?.data?.error || 'Error retrieving bookings');
      });
  };

  const handleDelete = async (bookingId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (confirmDelete) {
      try {
        await bookingService.deleteBookingDestinationById(bookingId);
        setBookings((prevBookings) => prevBookings.filter((bookingItem) => bookingItem.id !== bookingId));
      } catch (error) {
        setError(error.response?.data?.error || 'Error deleting booking');
      }
    }
  };

  const handleEdit = (bookingId) => {
    const bookingToEdit = bookings.find((bookingItem) => bookingItem.id === bookingId);
    setEditingBooking({ ...bookingToEdit });
    setIsEditModalOpen(true);
  };

  const handleEditSave = async () => {
    try {
      const response = await bookingService.updateBookingDestination(editingBooking.id, editingBooking);
      console.log('Updated data:', response.data);
      setBookings((prevBookings) =>
        prevBookings.map((bookingItem) => (bookingItem.id === response.data.id ? response.data : bookingItem))
      );
      setIsEditModalOpen(false);
      fetchBookings();
    } catch (error) {
      setError(error.response?.data?.error || 'Error updating booking');
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleEditModalChange = (e) => {
    const { name, value } = e.target;
    setEditingBooking((prevBooking) => ({ ...prevBooking, [name]: value }));
  };

  return (
    <div>
      <TopBar />
      <div className="container">
        <h1>My Trips</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : bookings.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {bookings.map((bookingItem) => (
              <li
                key={bookingItem.id}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  background: '#f9f9f9',
                  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
                }}
              >
                <p>
                  <strong>Full Name:</strong> {bookingItem.fullname}
                </p>
                <p>
                  <strong>Email:</strong> {bookingItem.email}
                </p>
                <p>
                  <strong>Destination:</strong> {bookingItem.destination}
                </p>
                <p>
                  <strong>Time:</strong> {bookingItem.time}
                </p>
                <p>
                  <strong>Date:</strong> {bookingItem.date}
                </p>

                <button onClick={() => handleEdit(bookingItem.id)} style={{ marginRight: '5px' }}>
                  Edit
                </button>

                <button onClick={() => handleDelete(bookingItem.id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings found.</p>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && editingBooking && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                maxWidth: '400px',
              }}
            >
              <h2 style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Edit Booking</h2>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Full Name:</label>
                <input
                  type="text"
                  name="fullname"
                  value={editingBooking.fullname}
                  onChange={handleEditModalChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={editingBooking.email}
                  onChange={handleEditModalChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Destination:</label>
                <input
                  type="text"
                  name="destination"
                  value={editingBooking.destination}
                  onChange={handleEditModalChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Time:</label>
                <input
                  type="text"
                  name="time"
                  value={editingBooking.time}
                  onChange={handleEditModalChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Date:</label>
                <input
                  type="date"
                  name="date"
                  value={editingBooking.date}
                  onChange={handleEditModalChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ textAlign: 'right' }}>
                <button
                  onClick={handleEditSave}
                  style={{ marginRight: '10px', padding: '8px 15px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '3px' }}
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  style={{ padding: '8px 15px', background: '#f44336', color: '#fff', border: 'none', borderRadius: '3px' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
