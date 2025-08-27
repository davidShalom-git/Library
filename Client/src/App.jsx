import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";

import Home from "./Components/Home";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Auth/Login";

import Upload from "./Components/Upload";
import Library from "./Components/Library";
import Health from "./Library/Health";
import Science from "./Library/Science";
import Business from "./Library/Business";
import Technology from "./Library/Technology";
import Entertainments from "./Library/Entertainments";
import UserBooks from "./Components/UserBooks";
import Dasboard from "./Components/Dasboard";
import About from "./Components/About";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const saveUserToBackend = async () => {
      if (!isLoaded || !isSignedIn || !user) return;
      if (!user.emailAddresses?.length || !user.firstName || !user.lastName) return;

      try {
        const token = await getToken();
        if (!token) return;

        const userData = {
          email: user.emailAddresses[0].emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
        };

        const response = await fetch("https://library-five-jade.vercel.app/api/user/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) throw new Error("Failed to save user");
        const data = await response.json();
        console.log("✅ User saved:", data);
      } catch (error) {
        console.error("❌ Failed to save user:", error);
      }
    };

    if (isLoaded && isSignedIn && user) {
      saveUserToBackend();
    }
  }, [isLoaded, isSignedIn, user, getToken]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
        <Route path="/lib" element={<ProtectedRoute><Library /></ProtectedRoute>} />
        <Route path="/health" element={<ProtectedRoute><Health /></ProtectedRoute>} />
        <Route path="/science" element={<ProtectedRoute><Science /></ProtectedRoute>} />
        <Route path="/business" element={<ProtectedRoute><Business /></ProtectedRoute>} />
        <Route path="/tech" element={<ProtectedRoute><Technology /></ProtectedRoute>} />
        <Route path="/ent" element={<ProtectedRoute><Entertainments /></ProtectedRoute>} />
        <Route path="/user-books" element={<ProtectedRoute><UserBooks /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dasboard /></ProtectedRoute>} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}