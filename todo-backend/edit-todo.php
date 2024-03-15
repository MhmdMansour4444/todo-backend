<?php
include ("connection.php");

$response = array();

if (isset ($_POST['task_id'])) {
    $todo_id = $_POST['task_id'];

    if (isset ($_POST['task']) && isset ($_POST['task_check'])) {
        $task = $_POST['task'];
        $task_check = $_POST['task_check'];

        $update_query = $mysqli->prepare('update todos set task = ?, task_check = ? where id = ?');
        $update_query->bind_param('sii', $todo_id, $task, $task_check);
        $update_query->execute();

        $update_query->store_result();
        $num_rows = $update_query->affected_rows;

        $response['status'] = "success";    
        $response['message'] = "Todo item updated successfully";

    } else {
        $response['status'] = "error";
        $response['message'] = "Title and task_check are required";
    }
} else {
    $response['status'] = "error";
    $response['message'] = "Todo ID is missing";
}

echo json_encode($response);
