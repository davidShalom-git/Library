import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white flex items-center justify-center relative overflow-hidden">
    

      <div className="relative z-10 w-full max-w-md mx-auto flex">
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-white">Sign in to Book Vault</h2>
            <p className="text-gray-300 text-sm">Welcome back! Please enter your details to continue.</p>
          </div>

          <div className="mt-6">
            <SignIn redirectUrl="/" />
          </div>

          <div className="text-center mt-6 text-sm text-gray-400">
            <span>Don’t have an account?</span>{' '}
            <Link to="/sign-up" className="text-purple-400 hover:text-purple-300 font-medium underline transition-colors duration-200">
              Create one here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;