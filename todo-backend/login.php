<?php
include("connection.php");

$username = $_POST["email"];
$password = $_POST["password"];

$check_user = $mysqli->prepare('select id,email,password,name from users where email=?');
$check_user->bind_param('s', $email);
$check_user->execute();
$check_user->store_result();
$user_exists = $check_user->num_rows();

$response = array();

if ($user_exists > 0) {
    $check_user->bind_result($user_id, $username, $hashed_password);
    $check_user->fetch();
    if (password_verify($password, $hashed_password)) {
        $response['status'] = "success";
        $response['message'] = "Login successful";
        $response['user_id'] = $user_id;
    } else {
        $response['status'] = "error";
        $response['message'] = "Incorrect password";
    }
} else {
    $response['status'] = "error";
    $response['message'] = "User not found";
}

echo json_encode($response);