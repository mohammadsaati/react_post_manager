<?php
require_once('../../config/user.php');

$newPassword = isset($_GET['newPassword']) ? $_GET['newPassword'] : null;
$userName = isset($_GET['userName']) ? $_GET['userName'] : null;
$password = isset($_GET['password']) ? $_GET['password'] : null;

if((empty($userName)) && (empty($password)))
{
    $message = "Please fil out the form.";
    $data = array('message' => $message);
    echo json_encode( $data );
} else {
    
    $user = new User($userName , $password);

    $user->changePassword($newPassword);

    $data = array(
        'message' => $user->getMessage()
    );
    echo json_encode($data);

}
?>