<?php
require_once('../../config/user.php');
$firstName = isset($_GET['firstName']) ? $_GET['firstName'] : null;
$lastName = isset($_GET['lastName']) ? $_GET['lastName'] : null;
$userName = isset($_COOKIE['userName']) ? $_COOKIE['userName'] : null;
$password = isset($_COOKIE['password']) ? $_COOKIE['password'] : null;
$email = isset($_GET['email']) ? $_GET['email'] : null;
$role = 'typical';

if(!(empty($userName)) & !(empty($password)))
{
    $user = new User($userName , $password);

    $user->setFirstName($firstName);
    $user->setLastName($lastName);
    $user->setEmail($email);
    $user->setRole($role);
    $displayName = $user->getFirstName()." ".$user->getLastName();
    $user->setDisplayName($displayName);

    $user->updateUser();

    $data = array('message' => $user->getMessage());
    echo json_encode($data);    
}else {
    $data = array('message' => 'You are not logedIn please logIn.');
    echo json_encode($data);

}

?>