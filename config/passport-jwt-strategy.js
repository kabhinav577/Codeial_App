const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'laterChange'
}

passport.use(new JWTStrategy(opts, async function(jwtPayLoad, done){
    try {
        const user = await User.findById(jwtPayLoad._id);
        // console.log(user);
        if(user){
            return done(null, user);
        } else {
            return done(null, false);
        }
        
    } catch (err) {
        console.log('Error in FInding user from JWT Strategy', err);
        return;
    }
}));


module.exports = passport;