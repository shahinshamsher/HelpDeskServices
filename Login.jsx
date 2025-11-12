import React, { useState } from 'react';
import API from '../../api/api';
import { saveToken, getUserFromToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      saveToken(res.data.token);
      const user = getUserFromToken();
      if (user.role === 'admin') nav('/admin'); else nav('/dashboard');
    } catch (e) {
      setErr(e.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <h3>Login</h3>
        {err && <div className="alert alert-danger">{err}</div>}
        <form onSubmit={submit}>
          <div className="mb-3"><input className="form-control" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
          <div className="mb-3"><input type="password" className="form-control" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}
