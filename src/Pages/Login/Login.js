import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import useSetTitle from "../../CustomHooks/useSetTitle";
import jwtSign from "../../JWT/JWTSign";
import { useState } from "react";

const Login = () => {
  useSetTitle("Login");
  const { signIn, googleSignIn, facebookSignIn } = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleSignIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    setProcessing(true);
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        toast.success("Successfully Log In");
        form.reset();
        setProcessing(false);
        navigate(from, { replace: true });
        jwtSign(user);
      })
      .catch((err) => {
        const errorMessage = err?.code;
        console.log(errorMessage);
        setProcessing(false);
        toast.error(errorMessage);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        jwtSign(user);
        navigate(from, { replace: true });
        toast.success("Successfully login with Google");
      })
      .catch((err) => console.log(err));
  };

  const handleFacebookSignIn = () => {
    facebookSignIn()
      .then(() => {
        toast.success("Successfully login with Facebook.");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10">
      <div className="w-full mx-auto p-6 md:p-0">
        <h2 className="font-bold text-4xl my-6">Log In</h2>
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your Email" />
            </div>
            <TextInput
              name="email"
              type="email"
              placeholder="Email"
              required={true}
              shadow={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              name="password"
              type="password"
              placeholder="******"
              required={true}
              shadow={true}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="agree">
              Are you new to Air Doctor?
              <Link to={"/register"} className="text-blue-500">
                Register
              </Link>
            </Label>
          </div>
          <Button disabled={processing} type="submit">
            Log In
          </Button>
        </form>
        {/* HR line */}
        <div class="inline-flex justify-center items-center w-full">
          <hr class="my-8 w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <span class="absolute left-1/2 px-3 font-medium text-gray-900 bg-white -translate-x-1/2 dark:text-white dark:bg-gray-900">
            or
          </span>
        </div>
        <p className="text-xl text-center mb-3">Login with</p>
        <div className="flex justify-center gap-5">
          <button
            onClick={handleGoogleLogin}
            className="text-3xl rounded-full border p-2"
          >
            <FcGoogle />
          </button>
          <button
            onClick={handleFacebookSignIn}
            className="text-3xl rounded-full border p-2 text-[#3b5998]"
          >
            <FaFacebookSquare />
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <img
          className="w-full"
          src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
