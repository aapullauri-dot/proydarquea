const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const usuarios = [
  { id: 45, email: "ariel@gmail.com",password: "123456", "saldo": 1000 },
  { id: 46, email: 'atacante@email.com', password: '654321', saldo: 500 },
];

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const usuario = usuarios.find(u => u.email === email);

  if (!usuario || usuario.password !== password) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

module.exports = router;
