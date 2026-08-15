const { registerUserService, loginUserService } = require('../services/auth.service');

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = await registerUserService(username, email, password);
    res.status(201).json({ id: user._id, username: user.username, email: user.email, role: user.role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const { user, token } = await loginUserService(username, password);
    res.json({ id: user._id, username: user.username, role: user.role, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { registerUser, loginUser };