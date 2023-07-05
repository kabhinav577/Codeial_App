const User = require('../models/user');

module.exports.profile = (req, res)=> {
    return res.render('user_profile', {
        title: "User Profile"
    })
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

// get the Sign up data
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
        // TODO later
        // console.log(req.body);
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
      }
}

// for Creating Session and Cookies Store In Browser
module.exports.createSession = (req, res)=> {
    // TODO later
}