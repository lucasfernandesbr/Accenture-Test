import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

import User from '../models/User';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verify if token was provide
  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Não autorizado' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    const user = await User.findById(decoded.id);

    // Validate model token and provided token
    if (token !== user.token) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    req.id = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ mensagem: 'Sessão inválida' });
  }
};
