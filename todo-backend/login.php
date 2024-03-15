<?php
include("connection.php");

$identifier = $_POST["identifier"];
$password = $_POST["password"];

if (filter_var($identifier, FILTER_VALIDATE_EMAIL)) {
    $query = $mysqli->prepare("SELECT user_id, username, email, password FROM users WHERE email = ?");
} else {
    $query = $mysqli->prepare("SELECT user_id, username, email, password FROM users WHERE username = ?");
}

$query->bind_param('s', $identifier);
$query->execute();
$query->store_result();

$query->bind_result($user_id, $username, $email, $hashed_password);
$query->fetch();

$num_rows = $query->num_rows;

$response = [];

if ($num_rows == 0) {
    $response['status'] = "user not found";
} else {
    if (password_verify($password, $hashed_password)) {
        $response['status'] = "success";
        $response['message'] = "Login successful";
        $response['user_id'] = $user_id;
        $response["username"] = $username;
        $response["email"] = $email;
        $task_query = $mysqli->prepare('select task_id, user_id, task, task_check from todos where user_id = ?');
        $task_query->bind_param('i', $user_id);
        $task_query->execute();
        $task_query->store_result();

        $num_rows = $task_query->num_rows;

        if ($num_rows == 0) {
            $response['todos'] = [];
        } else {
            $todos = [];
            $task_query->bind_result($task_id, $user_id, $task, $task_check);
            while ($task_query->fetch()) {
                $todo = [
                    'id' => $task_id,
                    'user_id' => $user_id,
                    'task' => $task,
                    'task_check' => $task_check
                ];
                $todos[] = $todo;
            }
            $response['todos'] = $todos;
        }
    } else {
        $response['status'] = "incorrect credentials";
    }
}

echo json_encode($response);