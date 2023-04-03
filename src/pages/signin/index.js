import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import login from "api/login/useLogin";

function SignIn() {
  const navigate = useNavigate();
  const [endStep, setEndStep] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEndStep(true);

    if (!email.includes("@")) {
      return;
    }

    if (password.length < 8) {
      return;
    }

    setEndStep(false);
  }, [email, password]);

  const signinHandler = () => {
    login(email, password)
      .then((result) => {
        if (result.status === 200) {
          const { data } = result;
          localStorage.setItem("access_token", `Bearer ${data.access_token}`);
          //Todo 페이지로 이동
        }
      })
      .catch(() => {
        alert("이메일 또는 비밀번호가 일치 하지 않습니다.");
      });
  };

  return (
    <div className="flex items-center justify-center h-screen min-h-full px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 ">
            Sign in to your account
          </h2>
        </div>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
          <div className="mb-8">
            <div className="block text-sm font-bold leading-6 text-gray-900">
              Email
            </div>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full rounded border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
              placeholder="Email address"
              data-testid="email-input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="block text-sm font-bold leading-6 text-gray-900">
              Password
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full rounded border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
              placeholder="Password"
              data-testid="password-input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="text-sm">
          <span className="mr-1 font-medium text-gray-900">New to Todo?</span>
          <span
            className="font-medium text-indigo-600 hover:text-indigo-500"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Create an account.
          </span>
        </div>
        <div>
          <button
            className="relative flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md group hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-30 "
            data-testid="signin-button"
            disabled={endStep}
            onClick={signinHandler}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
