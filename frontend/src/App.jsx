import Navbar from "./components/Navbar"
import { Routes, Route, Navigate } from "react-router-dom"
import HomePage  from "./pages/HomePage"
import  ProfilePage  from "./pages/ProfilePage"
import  SignUp  from "./pages/SignUpPage"
import  LoginPage  from "./pages/LoginPage"
import  SettingPage  from "./pages/SettingsPage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"

import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast";

function App() {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({ authUser });

  if(isCheckingAuth && !authUser )
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
    

  

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>}  />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ?<SignUp /> : <Navigate to="/"/>} />
        <Route path="/login" element={!authUser ?<LoginPage /> : <Navigate to="/"/>} />
        <Route path="/settings" element={<SettingPage /> } />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
