<?php
class Database
{
    // // DB Params
    // private $host = 'localhost';
    // private $db_name = 'myblog';
    // private $username = 'root';
    // private $password = '';
    private $conn;

    // DB Connect
    public function connect()
    {
        $this->conn = null;

        try {
            $this->conn = new PDO('sqlite:C:\xampp\htdocs\chat-application\chat_app.db');
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo 'Connection Error: ' . $e->getMessage();
        }

        return $this->conn;
    }
}
