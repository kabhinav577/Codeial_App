const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async (req, res)=> {
    try {
        let posts = await Post.find({})
        .sort('_createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({});

        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts,
            all_users: users,
        });
        
    } catch (err) {
        console.log('Error', err);
        return;
    }
}