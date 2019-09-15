<?php
require_once('../../config/posts.php');
$postId = isset($_GET['post_id'])?$_GET['post_id'] : null;

if(empty($postId)) 
{
    $data = array('message' => 'You are not logedIn please logIn.');
    echo json_encode($data);
} else {
    $post = new Posts();

    $post->getPostByID($postId);
}
?>