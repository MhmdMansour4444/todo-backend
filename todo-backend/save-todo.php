<?php
include ("connection.php");


$user_id = $_POST['user_id'];
$task = $_POST['task'];
$task_check = $_POST['task_check'];

$add_todo = $mysqli->prepare('insert into todos(task_id, user_id, task, task_check) value(null, ?, ?, ?)');
$add_todo->bind_param("isi", $user_id, $task, $task_check);
$add_todo->execute();

$response['status'] = "todo saved";
$response['task_id'] = $mysqli->insert_id;
$response['user_id'] = $user_id;
$response['task_check'] = $task_check;
$response['task'] = $task;


echo json_encode($response);