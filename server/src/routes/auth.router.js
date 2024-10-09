const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../configs/cookiesConfig');

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const targetUser = await User.findOne({ where: { email } });
    if (!targetUser) return res.sendStatus(401);

    const isValid = await bcrypt.compare(password, targetUser.password);
    if (!isValid) return res.sendStatus(401);

    const user = targetUser.get();
    delete user.password;

    const { accessToken, refreshToken } = generateTokens({ user });

    res.cookie('refreshToken', refreshToken, cookiesConfig).json({ accessToken, user });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

authRouter.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (password.length < 3) return res.sendStatus(400);

    const hashpass = await bcrypt.hash(password, 10);
    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, password: hashpass },
    });
    if (!created) return res.sendStatus(403);

    const user = newUser.get();
    delete user.password;

    const { accessToken, refreshToken } = generateTokens({ user });

    res.cookie('refreshToken', refreshToken, cookiesConfig).json({ accessToken, user });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

authRouter.get('/logout', (req, res) => {
  try {
    res.clearCookie('refreshToken').sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = authRouter;
