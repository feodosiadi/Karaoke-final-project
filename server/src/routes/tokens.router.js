const express = require('express');
const verifyRefreshToken = require('../middlewares/verifyRefreshToken');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../configs/cookiesConfig');

const tokensRouter = express.Router();

tokensRouter.get('/refresh', verifyRefreshToken, async (req, res) => {
  try {
    const { accessToken, refreshToken } = generateTokens({ user: res.locals.user });
    res
      .status(200)
      .cookie('refreshToken', refreshToken, cookiesConfig)
      .json({ accessToken, user: res.locals.user });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = tokensRouter;
