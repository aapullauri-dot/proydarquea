const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log('Header recibido:', authHeader); // ver qué llega

  if (!authHeader) {
    return res.status(401).json({ error: 'Acceso denegado. No hay token.' });
  }

  const parts = authHeader.split(' ');
  console.log('Partes del header:', parts); // ver cómo se divide
  console.log('Token extraído:', parts[1]); // ver el token
  console.log('JWT_SECRET:', process.env.JWT_SECRET); // ver la clave

  const token = parts[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    console.log('ERROR JWT:', error.message);
    return res.status(403).json({ error: 'Token inválido o expirado.' });
  }
}

module.exports = verificarToken;
