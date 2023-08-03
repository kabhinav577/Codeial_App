// This Class Would be Initialized for every post on the Page
// 1 -> When the the Page loads
// 2 -> Creation of every Post dynamically via AJAX

class PostComments {
    constructor(postId) {
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // Call for all the Existings Comments
        $(' .delete-comment-button', this.postContainer).each(()=>{
            self.deleteComment($(this));
        })
    }


    createComment(postId) {
        let pSelf =this;
        this.newCommentForm.submit(function (e) { 
            e.preventDefault();
            
            let self = this;

            $.ajax({
                type: "post",
                url: "/comments/create",
                data: $(self).serialize(),
                success: function (data) {
                    let newComment = pSelf.newCommentDom(data.data.comment);

                    $(`#post-comments-${postId}`).prepend(newComment);

                    pSelf.deleteComment($(' .delete-comment-button'), newComment);

                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, 
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // Creating DOM for Comment Display
    newCommentDom(comment) {
        return $(`
            <li id="comment-${comment._id}">
                <p>     
                    <small>
                        <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                    </small>
            
                    ${comment.content}
                    <br>
                    <small>
                        ${comment.user.name}
                    </small>
                    <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                                    0 Likes
                                </a>
                            
                            </small>
                </p>  
            </li>
        `)
    }

    // Taking URL from href and Delete the Comment
    deleteComment(deleteLink) {
        $(deleteLink).click(function (e) { 
            e.preventDefault();
            
            $.ajax({
                type: "get",
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
}