import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { AuthContext } from "./auth";

export function Register() {
  const { dispatch } = useContext(AuthContext);

  return (
    <div>
      <h1>Create An Account</h1>
      <hr />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async values => {
          dispatch({
            type: "LOGIN",
            payload: { user: "X", token: "Y" },
          });

          await new Promise(resolve => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required("Required"),
          password: Yup.string()
            .min(6)
            .required("Required"),
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
