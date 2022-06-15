import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Header from "./components/header/Header";
import Create from "./pages/Create";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import AllBlogs from "./pages/blogs/AllBlogs";
import AllAuthors from "./pages/authors/AllAuthors";
import AllTags from "./pages/AllTags";
import BlogDetails from "./pages/blogs/BlogDetails";
import AuthorDetails from "./pages/authors/AuthorDetails";
import EditBlog from "./pages/blogs/EditBlog";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/create"
              element={user ? <Create /> : <Navigate to="/login" />}
            />
            <Route
              path="/allBlogs"
              element={user ? <AllBlogs /> : <Navigate to="/login" />}
            />
            <Route
              path="/allAuthors"
              element={user ? <AllAuthors /> : <Navigate to="/login" />}
            />
            <Route
              path="/allTags"
              element={user ? <AllTags /> : <Navigate to="/login" />}
            />
            <Route
              path="/blogDetails/:id"
              element={user ? <BlogDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/authorDetails/:id"
              element={user ? <AuthorDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/editBlog/:id"
              element={user ? <EditBlog /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
