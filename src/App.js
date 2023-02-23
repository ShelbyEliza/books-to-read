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
  const { authIsReady, isUserVerified } = useAuthContext();

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
                element={isUserVerified ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/create"
                element={isUserVerified ? <Create /> : <Navigate to="/login" />}
              />
              <Route
                path="/allBlogs"
                element={
                  isUserVerified ? <AllBlogs /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/allAuthors"
                element={
                  isUserVerified ? <AllAuthors /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/allTags"
                element={
                  isUserVerified ? <AllTags /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/browse"
                element={isUserVerified ? <Browse /> : <Navigate to="/login" />}
              />
              <Route
                path="/blogDetails/:id"
                element={
                  isUserVerified ? <BlogDetails /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/authorDetails/:id"
                element={
                  isUserVerified ? <AuthorDetails /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/tagDetails/:tag"
                element={
                  isUserVerified ? <TagDetails /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/ratingDetails/:rating"
                element={
                  isUserVerified ? <RatingDetails /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/editBlog/:id"
                element={
                  isUserVerified ? <EditBlog /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/editAuthor/:id"
                element={
                  isUserVerified ? <EditAuthor /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/login"
                element={isUserVerified ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/signup"
                element={isUserVerified ? <Navigate to="/login" /> : <Signup />}
              />
              <Route
                path="/guest"
                element={isUserVerified ? <Navigate to="/" /> : <Guest />}
              />
              <Route path="/design" element={<Design />} />
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
