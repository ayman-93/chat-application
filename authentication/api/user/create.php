<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/User.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate user object
$user = new User($db);

// Get raw user data
$data = json_decode(file_get_contents("php://input"));

if (empty(trim($data->name))) {
    echo json_encode(
        array('message' => 'You forget to type your name.')
    );
} elseif (empty(trim($data->email))) {
    echo json_encode(
        array('message' => 'You forget to type your email.')
    );
} elseif (empty(trim($data->password))) {
    echo json_encode(
        array('message' => 'You forget to type your password.')
    );
} else {
    $user->name = $data->name;
    $user->email = $data->email;
    $user->password = $data->password;

    // Create user
    if ($user->create()) {
        $user_arr = array(
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email
        );

        // Make JSON
        print_r(json_encode($user_arr));
    } else {
        echo json_encode(
            array('message' => 'User Not Created')
        );
    }
}
