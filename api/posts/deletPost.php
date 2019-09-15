<?php
require_once('../../config/posts.php');
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;
$post_id = isset($_GET['post_id']) ? $_GET['post_id'] : null;

if(empty($user_id) & empty($post_id)) {
    $data = array('message' => 'You are not logedIn please logIn.');
    echo json_encode($data);
} else {
    $post = new Posts();

    $post->setUserId($user_id);
    $post->deletePost($post_id);

    $data = array('message' => 'success');
    echo json_encode($data);

}
?>