const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const Activity = require('../models/Activity');
const { sendNotification } = require('../utils/notify');

// admin-only: list agents
router.get('/agents', auth, roles(['admin']), async (req,res)=>{
  const agents = await User.find({ role: 'agent' }).select('-password');
  res.json(agents);
});

// assign ticket to agent
router.post('/assign', auth, roles(['admin']), async (req,res)=>{
  const { ticketId, agentId } = req.body;
  const t = await Ticket.findById(ticketId);
  if (!t) return res.status(404).json({ message: 'Ticket not found' });

  t.assignedTo = agentId;
  t.status = 'in_progress';
  await t.save();
  await Activity.create({ action: 'assign', ticket: t._id, by: req.user._id, details: `assigned to ${agentId}` });

  const agent = await User.findById(agentId);
  const owner = await User.findById(t.owner);
  if (agent) sendNotification({ to: agent.email, subject: 'New ticket assigned', message: `Ticket "${t.title}" assigned to you`});
  if (owner) sendNotification({ to: owner.email, subject: 'Agent assigned', message: `Agent ${agent?.name || ''} assigned to your ticket`});

  res.json({ message: 'Assigned' });
});

// activity logs list
router.get('/activities', auth, roles(['admin']), async (req,res)=>{
  const acts = await Activity.find().populate('by','name email').populate('ticket','title').sort({ createdAt: -1 }).limit(200);
  res.json(acts);
});

module.exports = router;
