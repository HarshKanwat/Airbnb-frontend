import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../utils/axiosInstance";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
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

  const passwordValidationSchema = Yup.object({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New password is required'),
  });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const response = await axiosInstance.put('/auth/profile', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(response.data.user);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user profile:', error);
      setErrors({ server: 'Failed to update profile. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordReset = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.put('/auth/reset-password', values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Password reset successfully!');
      resetForm();
      setShowPasswordForm(false);
    } catch (error) {
      console.error('Error resetting password:', error);
      setErrors({ server: 'Failed to reset password. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-profile">
      <h2><b>Profile</b></h2>
      {user?.image && (
        <div className="form-group">
          <img src={`http://localhost:5000${user.image}`} alt="User Profile" className="profile-image" />
        </div>
      )}
      <Formik
        initialValues={{ name: user?.name || '', email: user?.email || '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
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
              <label htmlFor="image">Profile Image</label>
              <input 
                type="file" 
                id="image" 
                name="image" 
                onChange={handleFileChange} 
                className="form-control"
              />
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

      <button onClick={() => setShowPasswordForm(!showPasswordForm)} className="btn btn-secondary mt-3">
        {showPasswordForm ? 'Cancel Password Reset' : 'Reset Password'}
      </button>

      {showPasswordForm && (
        <Formik
          initialValues={{ currentPassword: '', newPassword: '' }}
          validationSchema={passwordValidationSchema}
          onSubmit={handlePasswordReset}
        >
          {({ isSubmitting, errors }) => (
            <Form className="mt-3">
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <Field type="password" id="currentPassword" name="currentPassword" className="form-control" />
                <ErrorMessage name="currentPassword" component="div" className="text-danger" />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <Field type="password" id="newPassword" name="newPassword" className="form-control" />
                <ErrorMessage name="newPassword" component="div" className="text-danger" />
              </div>
              {errors.server && (
                <div className="form-group">
                  <div className="text-danger">{errors.server}</div>
                </div>
              )}
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </Form>
          )}
        </Formik>
      )}

      <button onClick={handleLogout} className="btn btn-secondary mt-3">
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
