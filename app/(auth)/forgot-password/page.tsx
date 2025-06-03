"use client"

import { HttpClient } from "@/lib/services/http-client";
import { AppKey } from "@/lib/services/key";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const SignInPage = () => {

  const router = useRouter();
  const httpClient = new HttpClient();
  // const openDialog = () => setDialogOpen(true);
  // const closeDialog = () => setDialogOpen(false);
  // const [dialogOpen, setDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  };
  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await httpClient.post(`login`, formData);
      // if (typeof response === 'string') {
      //   showSnackbar({ type: 'error', message: response });
      //   return;
      // }

      if (response.accessToken) {
        localStorage.setItem(AppKey.userId, response.userId);
        localStorage.setItem(AppKey.accessToken, response.accessToken);
        localStorage.setItem(AppKey.refreshToken, response.refreshToken);
        localStorage.setItem(AppKey.username, response.username);
        // showSnackbar({ tcype: 'success', message: 'Successfully logged in!' });
        router.push("/");
      } else {
        // showSnackbar({
        //   type: 'error',
        //   message: 'Invalid login response from server'
        // });
        console.log("no");
      }
    } catch (error) {
      // showSnackbar({
      //   type: 'error',
      //   message: 'An error occurred during login'
      // });
    }
  };

  useEffect(() => { }, []);
  return (
    <>
      <div className="card-container">

        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src="/assets/images/logo-text.png"
              alt="logo"
              width={180}
              height={28}
            />
          </Link>

          {/* Sign In and Subtitle Text */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1 mt-10">
              {/* <span className="text-yellow-400 text-xl mr-1">*</span> */}
              <h2 className="text-2xl font-semibold text-gray-800">Forgot Password</h2>
              <p className="text-gray-600 mt-2 mb-6">Enter your Email Address.</p>
            </div>
          </div>

          {/* User Input Form */}
          <form onSubmit={submitForm}>

            {/* Email Form */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInput}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
                required
              />
            </div>

            {/* Sign In and Subtitle Text */}
            <div className="flex items-start justify-between mb-6">
                <p className="text-gray-600 text-sm mt-2 mb-4">You may receive SMS notification from us for security and login purpose.</p>
            </div>

            {/* Sign In with other ways */}
            {/* <div className="flex space-x-4 mb-4">
            <button className="flex justify-center items-center w-full py-3 border rounded-md text-blue-600 border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-1">
              <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.689 9.115 8.438 9.849v-6.986h-2.545v-2.863h2.545V9.797c0-2.506 1.492-3.897 3.777-3.897 1.094.196 2.283.304 3.188.304V8.059c-.418-.013-.836-.02-.966-.02C13.083 7.93 11.788 8.47 11.788 10v2.863h3.905V19.85c4.749-.734 8.438-4.858 8.438-9.85z" clipRule="evenodd" />
              </svg>
              Facebook
            </button>
            <button className="flex justify-center items-center w-full py-3 border rounded-md text-gray-800 border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-1">
              <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM6.354 16.646l5.657-5.657-5.657-5.657L7.768 4.232l5.657 5.657 5.657-5.657 1.414 1.414-5.657 5.657 5.657 5.657-1.414 1.414-5.657-5.657-5.657 5.657-1.414-1.414z" />
              </svg>
              GitHub
            </button>
            <button className="flex justify-center items-center w-full py-3 border rounded-md text-red-600 border-red-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-1">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.46 12c0-1.89-.25-3.68-.71-5.33H12v10.34h6.47c-.34 1.69-1.32 2.86-3.03 2.86-2.27 0-4.16-1.53-4.85-3.5h-3.31v-2.88h3.31v-2.22c0-1.84 1.13-3.2 2.8-3.2 1.47 0 2.45.73 2.45 2.03v1.11h4.1c-.23-1.4-1.14-2.35-2.79-2.35-2.25 0-4.05 1.9-4.05 4.26s1.8 4.26 4.05 4.26c1.64 0 2.54-.86 2.78-2.35h4.1V12z" />
              </svg>
              Google
            </button>
          </div>
          <div className="text-center text-gray-500 mb-4">or</div> */}

            {/* Forgot Password Button */}
            <button
              type="submit"
              className="forgotpassword-button">
              Continue </button>

          </form>

          {/* No account / SignUp */}
          <p className="mt-4 text-center text-sm text-gray-500">
            Back to <a href="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">Sign In</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignInPage