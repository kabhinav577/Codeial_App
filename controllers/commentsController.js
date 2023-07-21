const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async (req, res)=> {
    try {
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            req.flash('success', 'Comment published!');
            return res.redirect('/');
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }
}

module.exports.destroy = async(req, res)=> {
    try {
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id) {
            let postId = comment.post;

            comment.deleteOne();

            await Post.findByIdAndUpdate(postId, {
                $pull: {comments: req.params.id}});

            req.flash('success', 'Comment deleted!');    
            return res.redirect('back');
        } else {
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }
}