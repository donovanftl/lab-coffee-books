require('dotenv').config()

const passport = require('passport')
const FacebookStrategy = require('passport-facebook')
const User = require('../models/User')

// Facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'email', 'gender', 'link', 'name', 'photos'],
    },
    async (accessToken, refreshToken, profile, cb) => {
      const user = await User.findOne({ facebookId: profile.id })
      if (!user) {
        const userCreated = await User.create({
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          facebookId: profile.id,
          email: profile.emails[0].value,
        })
        return cb(null, userCreated)
      } else {
        cb(null, user)
      }
    }
  )
)

// // Local
passport.use(User.createStrategy())

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

module.exports = passport
