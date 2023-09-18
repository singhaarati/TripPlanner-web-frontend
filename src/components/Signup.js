import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../services/userService';

import backgroundImage from './assets/signup.jpg';

export default function Signup() {
    const [credentials, setCredentials] = useState({
        fullname: "",
        email: "",
        username: "",
        password: ""
    });

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        userService.register(credentials)
            .then((res) => {
                console.log(res.data);
                navigate('/login');
            })
            .catch((err) => window.alert(err.response.data.error))
    }

    return (
        <div
            className="signup_page"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Form onSubmit={handleSubmit} className="m-auto" style={{ maxWidth: '400px' }} >
                <h2 className="text-center mb-4">Sign Up</h2>

                <Form.Group className="mb-3" controlId="formFullname">
                    <Form.Label>Fullname</Form.Label>
                    <Form.Control type="text" placeholder="Full name"
                        value={credentials.fullname}
                        onChange={(e) => setCredentials({ ...credentials, fullname: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formemail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email"
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                </Form.Group>



                <div className="d-grid mb-3">
                    <Button variant="primary" type="submit" onClick={handleSubmit} >
                        Register
                    </Button>
                </div>

                <Form.Text className="text-center mt-3">
                    Already registered? <Link to="/">Login Here!</Link>
                </Form.Text>
            </Form>
        </div>

    )
}

