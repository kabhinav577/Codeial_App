const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async (req, res)=> {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr) {
            post = await post.populate('user', 'name');
            return res.status(200).json({
                data: {
                    post : post
                },
                message: "Post Created!👍"
            })
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');

    } catch (err) {
        req.flash('error', err);
        console.log("Error", err);
        return
    }
}

module.exports.destroy = async (req, res)=> {
    try {
        let post = await Post.findById(req.params.id);
        // console.log(post.user);

        if(post.user == req.user.id) {
            await Like.deleteMany({
                likeable: post, onMode: 'Post'
            });
            await Like.deleteMany({
                _id: {
                    $in: post.comments
                }
            });


            post.deleteOne();

            await Comment.deleteMany({post: req.params.id});

            if(req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post Deleted!👍"
                })
            }

            req.flash('success', 'Post and associated comments deleted👍!');
            return res.redirect('back');
        } else {
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    } catch (err) {
        req.flash('error', err);
        console.log("Error", err);
        return;
    }
}