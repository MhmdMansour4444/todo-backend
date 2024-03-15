<?php
include("connection.php");

$response = array();

if (isset($_POST['task_id'])) {
    $task_id = $_POST['task_id'] ?? [];

    $delete_query = $mysqli->prepare('delete from todo where task_id = ?');
    $delete_query->bind_param('i', $task_id);
    $delete_query->execute();

    $num_rows = $delete_query->affected_rows;

    if ($num_rows > 0) {
        $response['status'] = "success";
        $response['message'] = "Todo item deleted successfully";
    } else {
        $response['status'] = "error";
        $response['message'] = "Todo item not found or could not be deleted";
    }
} else {
    $response['status'] = "error";
    $response['message'] = "Task ID is missing";
}

echo json_encode($response);
