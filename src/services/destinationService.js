import axios from "axios";

const baseUrl = 'http://localhost:3007/destination'

const getToken = () => `bearer ${window.localStorage.getItem('token')}`

const getAllDestinations = () => {
    return axios.get(baseUrl, {
        headers: { Authorization: getToken() }
    })
};

const getDestinationById = (destinationId) => {
    return axios.get(`${baseUrl}/${destinationId}`, {
        headers: { Authorization: getToken() }
    })
};

const addDestination = (newDestination) => {
    return axios.post(baseUrl, newDestination, {
        headers: { Authorization: getToken() }
    })
};

const deleteDestination = (destinationId) => {
    return axios.delete(`${baseUrl}/${destinationId}`, {
        headers: { Authorization: getToken() }
    })
};

///----Review----//

const getAllReviews = (destinationId) => {
    return axios.get(`${baseUrl}/${destinationId}/reviews`, {
        headers: { Authorization: getToken() }
    })
};

const createReview = (destinationId, reviewData) => {
    return axios.post(`${baseUrl}/${destinationId}/reviews`, reviewData, {
        headers: { Authorization: getToken() }
    });
};

const getReviewById = (destinationId, reviewId) => {
    return axios.get(`${baseUrl}/${destinationId}/reviews/${reviewId}`, {
        headers: { Authorization: getToken() }
    });
};

const updateReviewById = (destinationId, reviewId, reviewData) => {
    return axios.put(`${baseUrl}/${destinationId}/reviews/${reviewId}`, reviewData, {
        headers: { Authorization: getToken() }
    });
};

const deleteReviewById = (destinationId, reviewId) => {
    return axios.delete(`${baseUrl}/${destinationId}/reviews/${reviewId}`, {
        headers: { Authorization: getToken() }
    });
};

const destinationService = {
    getAllDestinations,
    getDestinationById,
    getAllReviews,
    createReview,
    getReviewById,
    updateReviewById,
    deleteReviewById,
    addDestination,
    deleteDestination
}

export default destinationService