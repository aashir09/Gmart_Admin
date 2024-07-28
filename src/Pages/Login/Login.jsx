  import React, { useState } from 'react';
  import './Login.css';
  import { Container, Row, Col, Form, Button } from 'react-bootstrap';
  import { Link } from 'react-router-dom';
  import axios from 'axios';
  import { useNavigate } from "react-router-dom";

  const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        
        const response = await fetch('http://localhost:3000/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
    
        if (!response.ok) {
          throw new Error('Invalid email or password. Please try again.');
        }
    
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token); // Store token in local storage
        navigate('/dashboard');
      } catch (error) {
        setError(error.message);
      }
    };
    

    return (
      <Container fluid>
        <Row>
          <Col className="bg-white auth-wrapper-left">
            <div className="auth-left-cont">
              <img src='Logo.png' height="50px" width="80px" />
              <h2 className="title">Your <span className="d-block">All Service</span> <strong className="text--039D55">In one field....</strong></h2>
            </div>
          </Col>

          <Col md={5} className="p-4  auth-wrapper-right">
            <div className='auth-wrapper-form'>
              <form onSubmit={handleSubmit}>
                <div className="auth-header">
                  <div className="mb-5">
                    <h2 className='title'>Admin signin</h2>
                    <div>Welcome back! Log in to your panel</div>
                    {error && <div className="text-danger mt-2">{error}</div>}
                  </div>
                </div>
                <div className="form-group">
                  <label className="input-label text-capitalize">Your email</label>
                  <input type="email" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@address.com" required />
                </div>
                <div className='js-form-message form-group mb-2'>
                  <label className="input-label" htmlFor="signupSrPassword" tabIndex="0">
                    <span className="d-flex justify-content-between align-items-center">
                      Password
                    </span>
                  </label>
                  <div className='input-group input-group-merge'>
                    <input type="password" className="js-toggle-password form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="6+ characters required" required />
                  </div>
                </div>
                <div className='d-flex justify-content-between mt-2'>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox customremberme">
                    </div>
                  </div>
                  <div className="form-group" id="forget-password">
                    <div className="custom-control">
                      <Link to="/Register">Create new account</Link>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-lg btn-block btn--primary mt-xxl-3">Login</button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };

  export default Login;
