import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css';

const Register = () => {
    const navigate = useNavigate();
 
    const [ErrorMessage,setErrorMessage]= useState('')
    const [formData, setFormData] = useState({
        Firstname: '',
        Lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/admin/signup', formData);
            console.log(response.data);
            navigate('/dashboard');
        } catch (error) {
            console.error(error.response.data.message); // Log the error message
            setErrorMessage(error.response.data.message); // Set the error message in state
        }
    };
    
    return (
        <Container fluid>
            <Row>
                {/* Left Section (Background Image and Logo) */}
                <Col className="bg-white auth-wrapper-left">
                    <div className="auth-left-cont">
                        <img src='Logo.png' height="50px" width="80px" />
                        <h2 className="title">Your <span className="d-block">All Service</span> <strong className="text--039D55">In one field....</strong></h2>
                    </div>
                </Col>

                {/* Right Section (Register Form) */}
                <Col md={5} className="p-4  auth-wrapper-right">
                    <div className='auth-wrapper-form'>
                        <form onSubmit={handleSubmit}>
                            <div className="auth-header">
                                <div className="mb-5">
                                    <h2 className='title'>Admin Register</h2>
                                    <div>Register Yourself as Admin!</div>
                                </div>
                            </div>
                            <div style={{marginTop:'-34px'}}>
                            {ErrorMessage && <div className="text-danger mt-2">{ErrorMessage}</div>}
                            <div className="form-group">
                                <label className="input-label text-capitalize">First Name</label>
                                <input type="text" className="form-control form-control-lg" name="Firstname" value={formData.Firstname} onChange={handleChange} placeholder="John Doe" required />
                            </div>
                            <div className="form-group">
                                <label className="input-label text-capitalize">Last Name</label>
                                <input type="text" className="form-control form-control-lg" name="Lastname" value={formData.Lastname} onChange={handleChange} placeholder="John Doe" required />
                            </div>
                            <div className="form-group">
                                <label className="input-label text-capitalize">Your Email</label>
                                <input type="email" className="form-control form-control-lg" name="email" value={formData.email} onChange={handleChange} placeholder="email@address.com" required />
                            </div>
                            <div className="form-group">
                                <label className="input-label text-capitalize">Password</label>
                                <input type="password" className="form-control form-control-lg" name="password" value={formData.password} onChange={handleChange} placeholder="6+ characters required" required />
                            </div>
                            <div className="form-group">
                                <label className="input-label text-capitalize">Confirm Password</label>
                                <input type="password" className="form-control form-control-lg" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" required />
                            </div>
                            <button type="submit" className="btn btn-lg btn-block btn--primary mt-xxl-3">Register</button>
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
