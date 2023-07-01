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

// for Creating user in Db url
module.exports.create = (req, res)=> {
    // TODO later
}

// for Creating Session and Cookies Store In Browser
module.exports.createSession = (req, res)=> {
    // TODO later
}