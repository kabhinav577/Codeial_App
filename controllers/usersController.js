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
        try {
            let user = await User.findById(req.params.id, req.body);
            return res.redirect('back');
        } catch (err) {
            console.log('Error', err);
            return;
        }
    } else {
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
    // Using .then() function -------->
    // if(req.body.password != req.body.confirm_password){
    //     return res.redirect('back');
    // }

    // User.findOne({email : req.body.email}).then((user)=> {
    //     if(!user) {
    //         User.create(req.body).then((user)=> {
    //             return res.redirect('/users/sign-in');
    //         }).catch((err)=> {
    //             console.log('Error in Creating user while Sign up');
    //             return;
    //         })
    //     }
    // }).catch((err)=> {
    //     console.log('Error in Finding user to Sign Up');
    //     return;
    // })
    /// ---------------->

    // Using Try Catch 
    try {
        if (req.body.password != req.body.confirm_password) {
          return res.redirect('back');
        }
    
        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) {
          const newUser = await User.create(req.body);
          return res.redirect('/users/sign-in');
        } else {
            console.log('Email is Already Created!')
            return;
        }
      } catch (err) {
        console.log('Error during Sign Up:', err.message);
        return;
      }
}

// For Creating Session and Cookies Store In Browser
module.exports.createSession = async (req, res)=> {
    // Step To Authenticate
    return res.redirect('/');
}

// Destroying Session or Cookies
module.exports.destroySession = (req, res) => {
    req.logout((err)=> {
        if(err) {
            console.log('Error in killing Session!')
            return;
        }
        return res.redirect('/');
    });
}


