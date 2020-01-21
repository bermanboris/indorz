import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./auth";

export function Register() {
  const { login } = useContext(AuthContext);
  const history = useHistory();

  return (
    <div>
      <h1>Create An Account</h1>
      <hr />
      <Formik
        initialValues={{ email: "", password: "", submission_error: "" }}
        onSubmit={async (values, actions) => {
          const REGISTER_URL = process.env.REACT_APP_AUTH_URL + "/users";

          try {
            const register = await axios.post(REGISTER_URL, {
              email: values.email,
              password: values.password,
            });

            const LOGIN_URL = process.env.REACT_APP_AUTH_URL + "/authenticate";
            const loginResponse = await axios.post(LOGIN_URL, {
              email: values.email,
              password: values.password,
            });

            if (loginResponse.data.success === true) {
              login({
                user: register.data.email,
                token: loginResponse.data.token,
              });
              return history.push("/");
            } else {
              throw new Error(loginResponse.data.message);
            }
          } catch (error) {
            actions.setErrors({
              submission_error: "Registration failed, try again.",
            });
          }
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required("Field is required"),
          password: Yup.string()
            .min(6)
            .required("Field is required"),
        })}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <label htmlFor="email" style={{ display: "block" }}>
                Email
              </label>
              <input
                id="email"
                placeholder="Enter your email"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.email && touched.email
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
              )}

              <br />

              <label htmlFor="password" style={{ display: "block" }}>
                Password
              </label>
              <input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.password && touched.password
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.password && touched.password && (
                <div className="input-feedback">{errors.password}</div>
              )}

              <input id="submission_error" type="hidden" />

              <button type="submit" disabled={isSubmitting}>
                Register
              </button>

              <div>
                <Link to="/login">Already have an account?</Link>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
