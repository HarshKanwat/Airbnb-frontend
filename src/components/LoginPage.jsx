import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import '../styles/Login.module.css'; // Ensure the CSS file is correctly imported

const LoginPage = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axiosInstance.post('/auth/login', values);
      localStorage.setItem('token', response.data.token);
      navigate('/'); // Redirect to homepage after login
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data) {
        setErrors({ server: error.response.data.message || 'Login failed' });
      } else if (error.message) {
        setErrors({ server: 'Login failed. Please try again later.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container login-container">
      <h2 className="text-center mb-4">Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <Field type="email" id="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <Field type="password" id="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            {errors.server && (
              <div className="form-group mb-3">
                <div className="text-danger">{errors.server}</div>
              </div>
            )}
            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
