const usersDB = {}; // In-memory user storage for simplicity

exports.signUp = (req, res) => {
  const { username, password } = req.body;

  if (usersDB[username]) {
    return res.status(400).json({ message: 'User already exists' });
  }

  usersDB[username] = { password }; 
  res.status(201).json({ message: 'User created successfully' });
};

exports.logIn = (req, res) => {
  const { username, password } = req.body;

  const user = usersDB[username];
  
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ message: 'Logged in successfully' });
};