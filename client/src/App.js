// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutWrapper from "./components/layout";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import Login from "./pages/login";
import CreateUser from "./pages/createUser";  // Import the CreateUser page
import ProtectedRoute from "./components/protectedRoute";
import { Provider } from 'react-redux';
import store from './redux/store';
import Posts from "./pages/posts";
import PostForm from "./pages/postForm";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Provider store={store}>
    <Router>
      <Routes>
        {/* Public Route for Login */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        {/* Public Route for Create User */}
        <Route path="/create-user" element={<CreateUser />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <LayoutWrapper>
                <Home />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <LayoutWrapper>
                <Profile />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <LayoutWrapper>
                <Posts />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/newPost"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <LayoutWrapper>
                <PostForm />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <LayoutWrapper>
                <PostForm />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <LayoutWrapper>
                <Settings />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    </Provider>
  );
};

export default App;
