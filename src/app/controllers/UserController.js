import User from '../models/User';

class UserController {
  async index(req, res) {
    const user_id = req.id;

    const user = await User.findById(user_id);

    return res.status(200).json(user);
  }
}

export default new UserController();
