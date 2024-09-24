import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('/api/register', values); // Adjust URL as needed
      navigate('/login'); // Redirect to login after successful registration
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response && error.response.data) {
        // Display server-side validation errors
        setErrors({ server: error.response.data.message || 'Registration failed' });
      } else {
        setErrors({ server: 'Registration failed. Please try again later.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            {errors.server && (
              <div className="form-group">
                <div className="text-danger">{errors.server}</div>
              </div>
            )}
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
