{
    let createPost = ()=> {
        let newPostForm = $('#new-post-form');

        newPostForm.submit((e)=> {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data) {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);

                    deletePost($(' .delete-post-button', newPost));

                    // Call the Create Comment Clsss
                    new PostComments(data.data.post._id);

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }


    let newPostDom = (post)=> {
        return $(`
            <li id="post-${post._id}">
                <p>
                    <small>
                        <a class="delete-post-button"  href="/posts/destroy/${ post._id }">X</a>
                    </small>

                    ${ post.content }
                    <br>
                    <small>
                        ${ post.user.name }
                    </small>
                </p>

                <div class="post-comments">
                        
                    <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="Type Here to add comment..." required>
                        <input type="hidden" name="post" value="${ post._id }" >
                        <input type="submit" value="Add Comment">
                    </form>
               
                
                    <div class="post-comments-list">
                        <ul id="post-comments-${ post._id }">
                                
                        </ul>
                    </div>
                </div>
            </li>
        `)
    };

    // Method for Delete a Post from DOM
    let deletePost = (deleteLink)=>{
        $(deleteLink).click((e)=> {
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, 
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }



    // Loop over all the Existing posts on the Page (when the window loads for the first time) and call the Delete post method on delete Link of Each, also add AJAX (using the class we have Created) to deleted button of Each
    let convertPostsToAjax = ()=> {
        $('#posts-list-container>ul>li').each(()=> {
            let self = $(this);

            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);


            // Get the Post's Id by Splitting the ID Attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        })
    };
    

    createPost();
    convertPostsToAjax();
}