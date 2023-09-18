import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import destinationService from '../services/destinationService';
import Footer from './Dashboard/Footer';
import TopBar from './Dashboard/TopBar';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './assets/add.jpg';
import axios from 'axios';

export default function AddDestination() {
    const [destination, setDestination] = useState([])
    const [selectedFile, setSelectedFile] = useState(null)
    const [newDestination, setNewdestination] = useState({
        name: '',
        location: '',
        picture: '',
        price: '',
    });

    const navigate = useNavigate();

    const handleAdd = (e) => {
        e.preventDefault();
        console.log(newDestination);
        destinationService.addDestination(newDestination)
            .then((res) => {
                setDestination(destination.concat(res.data))
                setNewdestination({})
                navigate('/');
            }).catch(err => console.log(err))
    };

    const handleUpload = () => {
        console.log(selectedFile)
        const formData = new FormData();
        formData.append('photo', selectedFile);
        formData.append('fileName', selectedFile.name)
        console.log(formData)
        axios.post('http://localhost:3007/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res.data)
                setNewdestination({
                    ...newDestination,
                    picture: res.data.data
                })
            })
            .catch(err => console.log(err))
    }

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column'
            }}
        >

            <div style={{ width: '100%' }}>
                <TopBar />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <div style={{ textAlign: 'center' }}>
                            <h3>Add Destination</h3>
                        </div>

                        <form onSubmit={handleAdd}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="enter the name "
                                    value={newDestination.name}
                                    onChange={(e) => setNewdestination({
                                        ...newDestination,
                                        name: e.target.value
                                    })}
                                />
                            </Form.Group>

                            <Form.Group controlId="location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="enter location"
                                    value={newDestination.location}
                                    onChange={(e) => setNewdestination({
                                        ...newDestination,
                                        location: e.target.value
                                    })}
                                />
                            </Form.Group>

                            <Form.Group controlId="picture">
                                <Form.Label>Picture URL</Form.Label>
                                <Form.Control
                                    type="file"
                                    placeholder="insert the picture"
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                />
                                <Button variant="primary" onClick={handleUpload}>Upload</Button>
                            </Form.Group>

                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="price"
                                    placeholder="enter charge price "
                                    value={newDestination.price}
                                    onChange={(e) => setNewdestination({
                                        ...newDestination,
                                        price: e.target.value
                                    })}
                                    required
                                />
                            </Form.Group>

                            <div style={{ height: '20px' }}></div>
                            <Button variant="primary" type="submit" onClick={handleAdd}>Add Destination</Button>
                        </form>
                        <div style={{ height: '20px' }}></div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
