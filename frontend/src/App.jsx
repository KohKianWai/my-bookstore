import './App.css'
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import Author from './author/Author';
import Book from './book/Book';
import Category from './category/Category';
import Login from './login/Login';
import ProtectedRoute from './route/ProtectedRoute';
import Home from './home/Home';
import BookDetails from './book/BookDetails';
import User from './user/User';
import CheckoutPage from './payment/CheckoutPage';

function App() {

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const role = user?.role;
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-[#F8F7FC] text-slate-800">
      <header>
        <div className="navbar bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 shadow-sm">
          <div className="flex-none">
            <a className="btn btn-ghost text-2xl">BookStore</a>
          </div>

          <div className="flex-1">
            <ul className="menu menu-horizontal px-1">
              <li className="font-semibold">
                <NavLink to="/">Home</NavLink>
              </li>
              {role === "MODERATOR" && (
                <>
                  <li className="font-semibold">
                    <NavLink to="/book">Book</NavLink>
                  </li>
                  <li className="font-semibold">
                    <NavLink to="/user">User</NavLink>
                  </li>
                  <li className="font-semibold">
                    <NavLink to="/author">Author</NavLink>
                  </li>
                  <li className="font-semibold">
                    <NavLink to="/category">Category</NavLink>
                  </li>
                </>
              )}
              {role === "USER" && (
                <>
                </>
              )}
              {!role && (
                <>
                </>
              )}
            </ul>
          </div>

          {role ? (
            <div className="flex-none flex items-center gap-3 mx-2">
              <span className="text-sm font-medium opacity-80">
                {user?.username} ({role})
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-outline btn-error btn-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex-none">
              <NavLink to="/login" className="btn btn-outline btn-primary btn-sm px-4 mx-2">
                Login
              </NavLink>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* TODO */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/check" element={<CheckoutPage />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/user" 
            element={
              <ProtectedRoute role="MODERATOR">
                <User />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/author" 
            element={
              <ProtectedRoute role="MODERATOR">
                <Author />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/book" 
            element={
              <ProtectedRoute role="MODERATOR">
                <Book />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/category" 
            element={
              <ProtectedRoute role="MODERATOR">
                <Category />
              </ProtectedRoute>} 
            />
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
