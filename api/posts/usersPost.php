<?php
require_once('../../config/posts.php');

/* Get all information to save new post */
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

if(empty($user_id)) {
    $data = array('message' => 'You are not logedIn please logIn.');
    echo json_encode($data);
} else {
    $post = new Posts();

    
    $post->setUserId($user_id);
    
    /* Save new post */
    $post->getUserPost();
}

?>