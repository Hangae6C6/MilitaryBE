const passport = require('passport')
const logger = require('../logger')

const naverLogin = passport.authenticate('naver', {
    scope: ['profile'],
  });

const naverCallback = (req, res, next) => {
passport.authenticate(
    'naver',
    { failureRedirect: '/' },
    (err, profile, info) => {
    if (err) return next(err);
    const { refreshToken, accessToken } = info;

    res.redirect(`http://localhost:3000/api/auth/naver/callback`);
    },
    )(req, res, next);
};

module.exports = {
    naverLogin,naverCallback,
  };