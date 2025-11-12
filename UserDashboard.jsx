import React from 'react';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  return (
    <div>
      <h3>User Dashboard</h3>
      <p>You can raise and track your tickets.</p>
      <Link to="/tickets" className="btn btn-primary">View My Tickets</Link>
      <Link to="/tickets/new" className="btn btn-success ms-2">Raise New Ticket</Link>
    </div>
  );
}
