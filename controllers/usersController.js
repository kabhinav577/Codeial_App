const User = require('../models/user');

module.exports.profile = async (req, res)=> {
    try {
        let user = await User.findById(req.params.id);
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    } catch (err) {
        console.log('Error', err);
        return;
    }
}

module.exports.update = async (req, res)=> {
    if(req.user.id == req.params.id) {
        let user = await User.findById(req.params.id, req.body);
        req.flash('success', 'Profile Updated!')
        return res.redirect('back');
    } else {
        req.flash('error', 'Unauthorized!');
        return res.status(401).send("Unathorized");
    }
}

// render Sign in Page
module.exports.signIn = (req, res)=> {
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// render Sign Up Page
module.exports.signUp = (req, res)=> {
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

// Get the Sign up data
module.exports.create = async (req, res)=> {
    try {
        if (req.body.password != req.body.confirm_password) {
          req.flash('error', `Passwords doesn't not match`);
          return res.redirect('back');
        }
    
        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) {
          await User.create(req.body);
          return res.redirect('/users/sign-in');
        } else {
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
      } catch (err) {
        req.flash('error', err);
        console.log('Error during Sign Up:', err.message);
        return;
      }
}

// For Creating Session and Cookies Store In Browser
module.exports.createSession = async (req, res)=> {
    req.flash('success', 'Logged in Successfully!');
    return res.redirect('/');
}

// Destroying Session or Cookies
module.exports.destroySession = (req, res) => {
    req.logout((err)=> {
        if(err) {
            req.flash('error', err);
            console.log('Error in killing Session!')
            return;
        }
        req.flash('success', 'You have logged out!');
        return res.redirect('/');
    });
}


