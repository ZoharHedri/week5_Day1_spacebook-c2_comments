

var SpacebookApp = function () {
  //"posts" is the array that have all post and comments!
  var posts = [ 
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]}
  ];
  

  // the current id to assign to a post
  var currentId = 0;
  var $posts = $('.posts'); //shortcut in Jquery  

  
  /*------------------------------function module---------------------------------*/
  //first function -> inside the module
  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i ++) {
      if (posts[i].id === id) {
        return posts[i]; //return object of "post" and "id"
      }
    }
  }

  //second function
  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      comments: [] //comments is the array that have all comments of post
    }

    currentId += 1;
    posts.push(post);
  }

  //third function
  var renderPosts = function () {
    $posts.empty();

    for (var i = 0; i < posts.length; i ++) {
      var post = posts[i];

      var commentsContainer = '<div class="comments-container">' +
      '<input type="text" class="comment-name" placeholder="Comment Text">' +
      '<button class="btn btn-primary add-comment">Post Comment</button> </div>';

      $posts.append('<div class="post" data-id=' + post.id + '>'
        + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' 
        + post.text + '<ul class="post-comments"></ul>' + commentsContainer + '</div>');
    }
  }

  //fourth function
  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);//call to internal func and get the post id to remove

    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  //fifth function-
  //the "toggleComments" func works for hiding/showing the "comments-container"
  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    //Toggle between adding and removing the "show" class name for all <div> post elements
    $clickedPost.find('.comments-container').toggleClass('show');
  }

  
  //sixth function-
  //get the 'the button', and 'comment'
  var createComment = function(btnThis,commentText){
    //alert(commentText + ' ' + btnThis); //good!! works,get the comment & the button
    //debugger;
    var commentId = 0;
    var comment = {
      text: commentText,//the comment
      id: 0,     //id comment
      parentId: 0//id of the 'post' parent
    }

    var p_id = $(btnThis).closest(".post").data().id;//get the current 'post' and take his ID
    //alert(postOfComment);//good
    var commentLength = posts[p_id].comments.length; //get the "lenght" of the comments array in post
    if (commentLength > 0){
      commentId = (posts[p_id] .comments[commentLength - 1].id + 1);//give the right index to the current comment
    }
    
    comment.id = commentId;
    comment.parentId = p_id;
    //console.log(comment);// good
    posts[p_id].comments[commentId] = comment;//put all thr comment into his post!
  };

  //seventh function
  var renderComments = function(btnThis){
    //var p_id = $(btnThis).parent("div").parent(".post").find('ul'); //BOOM!! g00d!
    var p_id = $(btnThis).closest(".post").data().id;
    var ulPost = $(btnThis).closest('.post').find('ul');
    //console.log(p_id);//good
    //console.log(ulPost);//good


    var commentIndex = posts[p_id].comments[posts[p_id].comments.length - 1];//give all the object

    var theComment = '<li class="comment-post" data-id=' + commentIndex.id +'>' +
      '<a href="#" class="remove-commet">remove</a> ' + commentIndex.text + '</li>';
    
    //console.log(theComment);//good
    ulPost.append(theComment);//not good because its add the commet to all post!
    
  };


  var removeComment = function(removeCommentbtn){
    var $removeCurrentComment = $(removeCommentbtn).parent('.comment-post');
    $removeCurrentComment.remove();
  };

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,

    // TODO: Implement
    createComment: createComment,

    // TODO: Implement
    renderComments: renderComments,

    // TODO: Implement
    removeComment: removeComment,
    toggleComments: toggleComments
  }
}
/*---------------------------end of module----------------------------*/

var app = SpacebookApp();

// immediately invoke the render method
//app.renderPosts(); /*Don't need*/

// Events:

$('.add-post').on('click', function () {//".add-post" => the button  class name of post 
  var text = $('#post-name').val();     //"#post-name" => the input id name of post 
  
  app.createPost(text);
  app.renderPosts();
  //comments.splice(0,comments.length)//Removes from the first element all the comments
});


$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

//toggleComments Event
$('.posts').on('click','.show-comments', function () {
  app.toggleComments(this);
});


$('.posts').on('click', '.add-comment', function(){ // '.comment-name',
  var comText = $('.comment-name').val();
  //alert(comText);//good
  if (comText == ""){
    //console.log("nothing")//good
    return;
  }
  else{
    var postOfCommentId = $(this).parent("div").parent(".post").data().id;//BOOM!! g00d!
  
    //alert(this);//button element-> good
    //alert($(this).parent("div").parent(".post").data().id);//good
    //alert(postOfComment); //good

    app.createComment(this,comText);
    app.renderComments(this);

  }
  
});

$('.posts').on('click', '.remove-commet', function(){
  app.removeComment(this);
});


//there is problem