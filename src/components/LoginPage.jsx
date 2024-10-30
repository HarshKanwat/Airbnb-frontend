// src/pages/LoginPage.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import styles from '../styles/Login.module.css'; // Import styles as modules

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
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email</label>
              <Field type="email" id="email" name="email" className={styles.formControl} />
              <ErrorMessage name="email" component="div" className={styles.errorMessage} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>Password</label>
              <Field type="password" id="password" name="password" className={styles.formControl} />
              <ErrorMessage name="password" component="div" className={styles.errorMessage} />
            </div>
            {errors.server && (
              <div className={styles.errorMessage}>{errors.server}</div>
            )}
            <button type="submit" className={`btn btn-primary w-100 ${styles.submitButton}`} disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
