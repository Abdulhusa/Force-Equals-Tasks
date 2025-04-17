
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import { accounts } from './data';

const app = express();
const PORT = 3000;
const SECRET_KEY = 'force-equals-hiring-challenge-secret';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Authentication middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
  
  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple authentication (in a real app, you would verify against a database)
  if (username === 'user' && password === 'password') {
    const token = jwt.sign({ id: 1, username: 'user' }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Get accounts endpoint
app.get('/accounts', authenticateToken, (req, res) => {
  res.json(accounts);
});

// Update account status endpoint
app.post('/accounts/:id/status', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const accountIndex = accounts.findIndex(account => account.id === parseInt(id, 10));
  
  if (accountIndex === -1) {
    return res.status(404).json({ error: 'Account not found' });
  }
  
  if (status !== 'Target' && status !== 'Not Target') {
    return res.status(400).json({ error: 'Status must be either "Target" or "Not Target"' });
  }
  
  accounts[accountIndex].status = status;
  res.json(accounts[accountIndex]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
