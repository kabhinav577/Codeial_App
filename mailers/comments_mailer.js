const nodeMailer = require('../config/nodemailer');


exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_Comment.ejs');


    nodeMailer.transporter.sendMail({
        from: 'kabhinav577@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published!😀',
        html: htmlString
    }, (err, info)=> {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log(info);
        return;
    })
}