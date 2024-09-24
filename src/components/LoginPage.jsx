// src/components/LoginPage.js
import React from 'react';
import axios from 'axios'; // Import axios
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/Login.module.css'; // Import the CSS module

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h2>Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
          })}
          onSubmit={async (values) => {
            try {
              const response = await axios.post('/api/login', values);
              console.log(response.data);
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
