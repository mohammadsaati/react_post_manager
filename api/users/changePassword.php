<?php
require_once('../../config/user.php');

$userName = isset($_COOKIE['userName']) ? $_COOKIE['userName'] : null;
$password = isset($_COOKIE['password']) ? $_COOKIE['password'] : null;
$newPassword = isset($_GET['newpassword']) ? $_GET['newpassword'] : null;

if(!(empty($userName)) & !(empty($password))) {
    
    $user = new User($userName , $password);
    $user->setPassword($newPassword);
    $user->changePassword($password);
    $data = array('message' => $user->getMessage());
    echo json_encode($data);

}else {

    $data = array('message' => 'You are not logedIn please logIn.');
    echo json_encode($data);

}
?>