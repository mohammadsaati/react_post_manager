<?php
require_once('../../config/user.php');
$userName = isset($_COOKIE['userName']) ? $_COOKIE['userName'] : null;
$password = isset($_COOKIE['password']) ? $_COOKIE['password'] : null;

if(!(empty($userName)) & !(empty($password))) {
    
    $user = new User($userName , $password);
    $user->deleteUser();
    $data = array('message' => $user->getMessage());
    echo json_encode($data);

}else {

    $data = array('message' => 'You are not logedIn please logIn.');
    echo json_encode($data);

}
?>