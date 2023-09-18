import axios from "axios";

const baseUrl = 'http://localhost:3007/bookings'

const getToken = () => `bearer ${window.localStorage.getItem('token')}`

const createBookingDestinationById = (destinationId, booking) => {
    console.log(booking)
    return axios.post(`${baseUrl}/${destinationId}`, booking, {
        headers: { Authorization: getToken() }
    })
}

const getAllBookings = () => {
    return axios.get(`${baseUrl}/all`, {
        headers: { Authorization: getToken() }
    })
}

const deleteBookingDestinationById = (bookingId) => {
    return axios.delete(`${baseUrl}/${bookingId}`, {
        headers: { Authorization: getToken() }
    });
};

const updateBookingDestination = (bookingId, updatedBooking) => {
    return axios.put(`${baseUrl}/${bookingId}`, updatedBooking, {
        headers: { Authorization: getToken() }
    });
}

const bookingService = {
    createBookingDestinationById,
    getAllBookings,
    deleteBookingDestinationById,
    updateBookingDestination
}
export default bookingService