<?php
    $message = isset($_GET['message']) ? $_GET['message'] : 'no';
    
    $data = array ('message' => $message);

    echo json_encode($data);
?>