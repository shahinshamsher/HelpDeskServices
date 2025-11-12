import React, { useState } from 'react';
import API from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name,setName] = useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [role,setRole] = useState('user');
  const [msg,setMsg] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await API.post('/auth/register', { name, email, password, role });
      setMsg('Registered. Please login.');
      setTimeout(()=>nav('/login'), 900);
    } catch (e) {
      setMsg(e.response?.data?.message || 'Registration failed');
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Register</h3>
        {msg && <div className="alert alert-info">{msg}</div>}
        <form onSubmit={submit}>
          <input className="form-control mb-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required/>
          <input className="form-control mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
          <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/>
          <select className="form-select mb-2" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>
          <button className="btn btn-success">Register</button>
        </form>
      </div>
    </div>
  );
}
