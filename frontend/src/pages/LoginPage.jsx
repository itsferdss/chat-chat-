import React from 'react'
import { useState } from 'react';
import { useAuthStore } from "../store/useAuthStore"
import {Mail, Eye, EyeOff, Loader2, Lock, MessageSquare} from "lucide-react"
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'

const LoginPage = () => {
  const [showpassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    enail: "",
    password: ""
  });

  const {login, isLoggingIn} = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  }

  return (
  <div className="min-h-screen grid lg: grid-cols-2">
    
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back Bossing!</h1>
              <p className="text-base-content/60">Sign in kana pls</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="ehdsie@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showpassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="*******"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showpassword)}
                >
                  {showpassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                <Loader2 className="size-5 animate-spin" />
                Logging In...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account? {""}
              <Link to="/signup" className="link link-primary">
                Click Here to Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern 
      title="Welcome Back!" 
      subtitle="Login to access your account" />
    </div>
  )
}

export default LoginPage;
