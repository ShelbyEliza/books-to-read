import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/home/Home";
import Guest from "./pages/guest/Guest";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Create from "./pages/Create";
import Login from "./pages/admin/Login";
import Signup from "./pages/admin/Signup";
import AllBlogs from "./pages/blogs/AllBlogs";
import AllAuthors from "./pages/authors/AllAuthors";
import AllTags from "./pages/tags/AllTags";
import Browse from "./pages/browse/Browse";
import TagDetails from "./pages/tags/TagDetails";
import RatingDetails from "./pages/browse/RatingDetails";
import BlogDetails from "./pages/blogs/BlogDetails";
import AuthorDetails from "./pages/authors/AuthorDetails";
import EditBlog from "./pages/blogs/EditBlog";
import EditAuthor from "./pages/authors/EditAuthor";
import Design from "./pages/design/Design";
import Footer from "./components/footer/Footer";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="app">
      {authIsReady && (
        <BrowserRouter>
          <Header />
          <Navbar />
          <div className="site-content">
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
                path="/browse"
                element={user ? <Browse /> : <Navigate to="/login" />}
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
                path="/tagDetails/:tag"
                element={user ? <TagDetails /> : <Navigate to="/login" />}
              />
              <Route
                path="/ratingDetails/:rating"
                element={user ? <RatingDetails /> : <Navigate to="/login" />}
              />
              <Route
                path="/editBlog/:id"
                element={user ? <EditBlog /> : <Navigate to="/login" />}
              />
              <Route
                path="/editAuthor/:id"
                element={user ? <EditAuthor /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={user ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/signup"
                element={user ? <Navigate to="/" /> : <Signup />}
              />
              <Route
                path="/guest"
                element={user ? <Navigate to="/" /> : <Guest />}
              />
              <Route path="/design" element={user ? <Design /> : <Login />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
