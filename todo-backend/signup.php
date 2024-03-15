<?php
include("connection.php");

$username = $_POST["username"];
$password = $_POST["password"]; 
$email = $_POST["email"];

$check_user = $mysqli -> prepare('select * from users where username = ? or email = ?');
$check_user -> bind_param('ss', $username, $password, $email);
$check_user -> execute();
$check_user -> store_result();
$user_exists = $check_user -> num_rows();

if ($user_exists == 0) {
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $user_exists = $mysqli -> prepare('insert into users(user_id,username,email) value(null,?,?,?)');
    $query -> bind_param('sss', $username, $email, $hashed_password);
    $user_exists -> execute();
    $response['status'] = "success";
    $response['message'] = "user $username was created";
    
} else {
    $response['status'] = "user already exists";
    $response["message"] = "user $username was not created";
}

echo json_encode($response);