<?php
require_once('../../config/user.php');

$firstName = isset($_GET['firstName']) ? $_GET['firstName'] : null;
$lastName = isset($_GET['lastName']) ? $_GET['lastName'] : null;
$userName = isset($_GET['userName']) ? $_GET['userName'] : null;
$password = isset($_GET['password']) ? $_GET['password'] : null;
$email = isset($_GET['email']) ? $_GET['email'] : null;
$role = 'typical';

if((empty($userName)) && (empty($password)))
{
    $message = "Please fil out the form.";
    $data = array('message' => $message);
    echo json_encode( $data );
} else {
    $user = new User($userName , $password);

    $user->setFirstName($firstName);
    $user->setLastName($lastName);
    $user->setEmail($email);
    $user->setRole($role);
    $displayName = $user->getFirstName()." ".$user->getLastName();
    $user->setDisplayName($displayName);

    $user->addNewUser();
    $user->getUserId();
    $data = array(
        'message' => $user->getMessage(),
        'user_id' => $user->getId()
    );
    echo json_encode($data);

}
?>