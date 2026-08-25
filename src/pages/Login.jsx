import React, { useEffect } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { loginUser } from "../services/usersApi";
import { login } from "../features/Auth/authSlice";

const Login = () => {
  const dataLoader = useActionData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (dataLoader && !dataLoader.error) {
      dispatch(login(dataLoader));
      localStorage.setItem("token", dataLoader.accessToken);
      navigate("/");
    }
  }, [dataLoader, dispatch, navigate]);

  return (
    <div className="bg-blueTom-1000 flex h-dvh flex-col items-center justify-center">
      <img className="w-20" src="/logo-light.png" alt="" />
      <p className="text-blueTom-50 mt-3 p-4 text-lg font-bold">
        Welcome to Klix
      </p>

      <Form method="POST" className="w-[80%] sm:w-[40%]">
        <input
          className="bg-blueTom-50 m-2 w-full rounded-full p-4"
          placeholder="Username"
          type="text"
          name="username"
          id="username"
          defaultValue="emilys"
        />
        <input
          className="bg-blueTom-50 m-2 w-full rounded-full p-4"
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          defaultValue="emilyspass"
        />

        {dataLoader?.error && (
          <p className="mx-2 mt-1 text-sm text-red-400">{dataLoader.error}</p>
        )}

        <span className="my-2 inline-block text-left">
          <Button type="primary">Login</Button>
        </span>
      </Form>
    </div>
  );
};

export default Login;

export async function action({ request }) {
  const formData = await request.formData();
  const { username, password } = Object.fromEntries(formData);

  try {
    const loginData = await loginUser({ username, password });
    return loginData;
  } catch (err) {
    return { error: err.message || "Invalid credentials" };
  }
}
