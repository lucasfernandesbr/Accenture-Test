import User from '../models/User';

class SigninController {
  async store(req, res) {
    const { email, senha } = req.body;

    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(404).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    if (!(await findUser.compareHashed(senha))) {
      return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    findUser.set({ ultimo_login: Date.now() });
    findUser.generateToken();
    findUser.save();

    return res.json({ findUser });
  }
}

export default new SigninController();
