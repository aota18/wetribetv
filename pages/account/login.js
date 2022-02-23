import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Layout from "../../components/users/Layout";
import Link from "../../components/Link";
import { userService } from "../../services/user.service";
import { alertService } from "../../services/alert.service";
const Login = () => {
  const [res, setRes] = useState("");
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = ({ username, password }) => {
    return userService
      .login(username, password)
      .then(() => {
        //get return url from query parameters or default to '/'
        const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl);
      })
      .catch(alertService.error);
  };

  const onLoginWithWetribe = () => {
    const msgData = {
      type: "AUTH_REQUEST",
      data: "HELLO",
    };
    window.ReactNativeWebView.postMessage(JSON.stringify(msgData));
  };

  /* Wetribe onMessage handler function from Native */
  function wetribeObserved(event) {
    const { type, data } = JSON.parse(event.data);

    // HANDLE DATA
    console.log(type, data);
    setRes(data);
  }

  useEffect(() => {
    window.addEventListener("message", wetribeObserved);

    return () => window.removeEventListener("message", wetribeObserved);
  }, []);

  return (
    <Layout>
      <div className="card">
        <h4 className="card-header">Login</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Username</label>
              <input
                name="username"
                type="text"
                {...register("username")}
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.username?.message}</div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <div className="flex flex-col space-between">
              <button
                disabled={formState.isSubmitting}
                className="btn btn-primary"
              >
                {formState.isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Login
              </button>

              <Link href="/account/register" className="btn btn-primary mt-2">
                Register
              </Link>
              {/* <div
                onClick={() => onLoginWithWetribe()}
                className="text-center text-gray-700 border mt-2 rounded-lg py-2"
              >
                Login with Wetribe
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
