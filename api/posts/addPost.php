<?php
require_once('../../config/posts.php');

/* Get all information to save new post */
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;
$cat_id = isset($_GET['cat_id']) ? $_GET['cat_id'] : null;
$title = isset($_GET['title']) ? $_GET['title'] : null;
$discription = isset($_GET['discription']) ? $_GET['discription'] : null;
$status = isset($_GET['status']) ? $_GET['status'] : null;

if(empty($user_id) & empty($title)) {
    $data = array('message' => 'You are not logedIn please logIn.');
    echo json_encode($data);
} else {
    $post = new Posts();

    
    $post->setUserId($user_id);
    $post->setTitle($title);
    $post->setDiscription($discription);
    $post->setStatus($status);
    
    /* Save new post */
    $post->newPost($cat_id);
    
    $appearData = array('message' => $post->getMessage());
    echo json_encode($appearData);
}

?>