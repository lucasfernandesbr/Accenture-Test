import User from '../models/User';

class SignupController {
  async store(req, res) {
    const { nome, email, senha, numero, ddd } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(400).json({ mensagem: 'E-mail já existente' });
    }

    const user = await User.create({
      nome,
      email,
      senha,
      telefones: [{ numero, ddd }],
    });

    await user.generateToken();
    user.save();

    return res.status(200).json({
      user,
    });
  }
}

export default new SignupController();
