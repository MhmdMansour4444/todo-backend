<?php
include("connection.php");

$response = array();

$task_id = $_POST['task_id'];

$select_query = $mysqli->prepare('select * from todos where id = ?');
$select_query->bind_param('i', $task_id);
$select_query->execute();
$select_query->store_result();

if ($select_query->num_rows > 0) {
    $select_query->bind_result($id, $task, $task_check);
    $select_query->fetch();

    $todo_item = array(
        'id' => $id,
        'task' => $task,
        'task_check' => $task_check
    );

    $response['status'] = "success";
    $response['message'] = "Todo item retrieved successfully";
    $response['todo_item'] = $todo_item;
} else {
    $response['status'] = "error";
    $response['message'] = "Todo item not found";
}

echo json_encode($response);