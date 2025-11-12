import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserFromToken, logout } from '../utils/auth';

export default function Navbar() {
  const user = getUserFromToken();
  const nav = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Help Desk</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {user && <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>}
            {user && <li className="nav-item"><Link className="nav-link" to="/tickets">Tickets</Link></li>}
            {user && user.role === 'admin' && <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>}
          </ul>
          <ul className="navbar-nav">
            {!user ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            ) : (
              <>
                <span className="navbar-text text-light me-3">Hi, {user.name}</span>
                <button className="btn btn-outline-light btn-sm" onClick={() => { logout(); nav('/login'); }}>Logout</button>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
