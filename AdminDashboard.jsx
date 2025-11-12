import React, { useEffect, useState } from 'react';
import API from '../../api/api';

export default function AdminDashboard(){
  const [agents, setAgents] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(()=>{ load(); },[]);

  async function load(){
    const r1 = await API.get('/admin/agents');
    const r2 = await API.get('/tickets/summary');
    setAgents(r1.data);
    setStats(r2.data.summary);
  }

  async function assign(ticketId, agentId){
    await API.post('/admin/assign', { ticketId, agentId });
    load();
  }

  return (
    <div>
      <h3>Admin Panel</h3>
      <div className="row">
        <div className="col-md-6">
          <div className="card p-3"><h5>System Stats</h5><p>Active: {stats.active}</p><p>Solved: {stats.solved}</p></div>
        </div>
        <div className="col-md-6">
          <h5>Agents</h5>
          <ul className="list-group">
            {agents.map(a=>(
              <li key={a._id} className="list-group-item d-flex justify-content-between align-items-center">
                {a.name} <span>{a.email}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
