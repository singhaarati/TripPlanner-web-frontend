import React, { useEffect, useState } from 'react'
import { Button, Card, Col, ListGroup, Modal, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import destinationService from '../services/destinationService'
import Footer from './Dashboard/Footer'
import TopBar from './Dashboard/TopBar'

export default function DetailDestination() {
    const [destination, setDestination] = useState([])
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true);
    const [newReviewText, setNewReviewText] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState('');
    const [editedText, setEditedText] = useState('');
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        destinationService.getDestinationById(id)
            .then(res => {
                console.log(res.data.data)
                setDestination(res.data.data)
                setLoading(false)
            }).catch((err) => window.alert(err.response.data.error))
    }, [])

    useEffect(() => {
        destinationService.getAllReviews(id)
            .then(res => {
                console.log(res.data)
                setReviews(res.data)
            }).catch(err => window.alert(err.response.data.error))
    }, [])

    const handleDelete = (destinationId) => {
        destinationService.deleteDestination(destinationId)
            .then((res) => {
                setDestination((prevDestination) => {
                    return prevDestination.filter((dest) => dest.id !== destinationId);
                });
                navigate('/');
            }).catch((err) => console.log(err))
    }

    const handleAddReview = () => {
        if (!newReviewText.trim()) {
            window.alert("Review cannot be empty.");
            return;
        }
        destinationService
            .createReview(id, { text: newReviewText })
            .then((res) => {
                const createdReview = res.data.data;
                setReviews((prevReviews) => [createdReview, ...prevReviews]);
                setNewReviewText('');
                destinationService.getAllReviews(id)
                    .then(res => {
                        setReviews(res.data);
                    })
                    .catch(err => window.alert(err.response.data.error));
            })
            .catch((err) => console.log(err));
    };

    const handleDeleteReview = (destinationId, reviewId) => {
        destinationService.deleteReviewById(destinationId, reviewId)
            .then((res) => {
                setReviews((prevReviews) => {
                    return prevReviews.filter((review) => review.id !== reviewId);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleEditReview = (reviewId, updatedText) => {
        destinationService.updateReviewById(destination.id, reviewId, { text: updatedText })
            .then((res) => {
                setReviews((prevReviews) => {
                    return prevReviews.map((review) => {
                        if (review.id === reviewId) {
                            return { ...review, text: updatedText };
                        }
                        return review;
                    });
                });
                setShowEditModal(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleOpenEditModal = (reviewId, reviewText) => {
        setSelectedReviewId(reviewId);
        setEditedText(reviewText);
        setShowEditModal(true);
    };

    return (
        <div>
            <TopBar />

            {loading ? (
                <div>Loading...</div>
            ) : (
                <ListGroup className='mb-3'>
                    <ListGroup.Item
                        key={destination.id}
                        className='d-flex justify-content-between align-items-start'>
                        <div className='ms-2 me-auto'>
                            <Link to={`/destination/${destination.id}`}>
                                <img
                                    src={`http://localhost:3007/uploads/${destination.picture}`}
                                    alt={destination.name}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: '100%', width: '100%', objectFit: 'cover' }}
                                />
                            </Link>

                            <h2 style={{ marginBottom: '10px', color: '#333' }}>{destination.name}</h2>
                            <p style={{ marginBottom: '5px', color: '#666' }}>{destination.location}</p>
                            <p style={{ marginBottom: '20px', color: '#666' }}>{destination.price}</p>

                            {reviews.length > 0 ? (
                                <Row>
                                    {reviews.map((review, index) => (
                                        <Col md={6} key={index}>
                                            <Card className="mb-3">
                                                <Card.Body>
                                                    {review && (
                                                        <>
                                                            <Card.Title>{review.text}</Card.Title>
                                                            <Card.Text>{review.user}</Card.Text>

                                                            {/* Review Edit Button */}
                                                            <Button
                                                                variant="warning"
                                                                style={{ marginRight: '5px' }}
                                                                onClick={() => handleOpenEditModal(review.id, review.text)}
                                                            >
                                                                Edit
                                                            </Button>

                                                            {/*Review Delete Button */}
                                                            <Button
                                                                variant="danger"
                                                                onClick={() => handleDeleteReview(destination.id, review.id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <p>No reviews available for this destination.</p>
                            )}

                            {/* New text box for creating review */}
                            <div className="mb-3">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        value={newReviewText}
                                        onChange={(e) => setNewReviewText(e.target.value)}
                                        placeholder="Write a review..."
                                        className="form-control"
                                    />
                                    <button className="btn btn-primary" onClick={handleAddReview}>
                                        Add Review
                                    </button>
                                </div>
                            </div>

                            {/* Modal for editing reviews */}
                            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Review</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <textarea
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                        placeholder="Enter your review"
                                        rows="5"
                                        style={{ width: '100%' }}
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" onClick={() => handleEditReview(selectedReviewId, editedText)}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            <Button variant="primary" as={Link} to={`/bookings/${destination.id}`} style={{ marginRight: '10px' }}>
                                Book Now
                            </Button>

                            <Button
                                variant="primary"
                                data-testid="delete-destination-button"
                                onClick={() => handleDelete(destination.id)}
                            >
                                delete destination
                            </Button>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            )
            }
            <Footer />
        </div >
    );
}
