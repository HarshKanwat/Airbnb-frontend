import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/UserProfile.css'; // Import custom CSS

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/users/profile'); // Adjust URL as needed
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to load user profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.put('/api/users/profile', values); // Adjust URL as needed
      setUser(response.data);
    } catch (error) {
      console.error('Error updating user profile:', error);
      setErrors({ server: 'Failed to update profile. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-profile">
      <h2>Edit Profile</h2>
      <Formik
        initialValues={{ name: user.name, email: user.email }}
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
            {errors.server && (
              <div className="form-group">
                <div className="text-danger">{errors.server}</div>
              </div>
            )}
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
