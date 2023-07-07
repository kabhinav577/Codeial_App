const User = require('../models/user');

module.exports.profile = async (req, res)=> {
    if(req.cookies.user_id) {
        const existingUser = await User.findById(req.cookies.user_id);
        if(existingUser) {
            return res.render('user_profile', {
                title: "User Profile"
            });
        } else {
            return res.redirect('/users/sign-in');
        }
    } else {
        return res.redirect('/users/sign-in');
    }
}

// render Sign in Page
module.exports.signIn = (req, res)=> {
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// render Sign Up Page
module.exports.signUp = (req, res)=> {
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
    try {
        const existingUser = await User.findOne({ email: req.body.email });  // Find The User

        if(existingUser) {
            // Checking password from Database 
            if(existingUser.password != req.body.password) {
                return res.redirect('back');
            }

            // Creating Session through Cookies
            res.cookie('user_id', existingUser.id);
            return res.redirect('/users/profile');
        } else {
            return res.redirect('back'); // When user not Found
        }
    } catch (err) {
        console.log('Error During Sign-In!', err.message);
        return;
    }
}

// Destroying Session or Cookies
module.exports.destroySession = (req, res) => {
    res.clearCookie('user_id');
    // console.log(req.cookies);
    return res.redirect('/users/sign-in');
}