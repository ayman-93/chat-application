<?php
class User
{
  // DB Stuff
  private $conn;
  private $table = 'users';

  // Properties
  public $id;
  public $name;
  public $email;
  public $password;

  // Constructor with DB
  public function __construct($db)
  {
    $this->conn = $db;
  }

  // count users rowCount() not workin with sqlite
  public function count()
  {
    // Create query
    $query = 'SELECT COUNT(*) AS num FROM ' . $this->table;

    // Prepare statement
    $stmt = $this->conn->prepare($query);

    // Execute query
    $stmt->execute();

    $num = $stmt->fetch(PDO::FETCH_ASSOC);
    return $num['num'];
  }
  // Get users
  public function read()
  {
    // Create query
    $query = 'SELECT
        id,
        name,
        email
      FROM
        ' . $this->table . '
      ORDER BY
        id DESC';

    // Prepare statement
    $stmt = $this->conn->prepare($query);

    // Execute query
    $stmt->execute();

    return $stmt;
  }

  // Get Single Category
  public function read_single()
  {
    // Create query
    $query = 'SELECT
          id,
          name,
          email,
          password
        FROM
          ' . $this->table . '
      WHERE email = :email 
      LIMIT 0,1';


    $tename = $this->email;
    //Prepare statement
    $stmt = $this->conn->prepare($query);

    // Bind ID
    $stmt->bindParam(':email', $this->email);

    // Execute query
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    // set properties
    $this->id = $row['id'];
    $this->name = $row['name'];
    $this->email = $row['email'];
    $this->password = $row['password'];
  }

  // Create User
  public function create()
  {
    // Create Query
    $query = 'INSERT INTO users (name, email, password) VALUES  (:name, :email, :password)';


    // Prepare Statement
    $stmt = $this->conn->prepare($query);

    // Clean data
    $this->name = htmlspecialchars(strip_tags($this->name));
    $this->email = htmlspecialchars(strip_tags($this->email));
    $this->password = password_hash(htmlspecialchars(strip_tags($this->password)), PASSWORD_DEFAULT);

    // Bind data
    $stmt->bindParam(':name', $this->name);
    $stmt->bindParam(':email', $this->email);
    $stmt->bindParam(':password', $this->password);

    // Execute query
    if ($stmt->execute()) {
      $this->id = $this->conn->lastInsertId();
      return true;
    }

    // Print error if something goes wrong
    printf("Error: %s. \n", $stmt->error);

    return false;
  }

  // // Update Category
  // public function update()
  // {
  //     // Create Query
  //     $query = 'UPDATE ' .
  //         $this->table . '
  // SET
  //   name = :name
  //   WHERE
  //   id = :id';

  //     // Prepare Statement
  //     $stmt = $this->conn->prepare($query);

  //     // Clean data
  //     $this->name = htmlspecialchars(strip_tags($this->name));
  //     $this->id = htmlspecialchars(strip_tags($this->id));

  //     // Bind data
  //     $stmt->bindParam(':name', $this->name);
  //     $stmt->bindParam(':id', $this->id);

  //     // Execute query
  //     if ($stmt->execute()) {
  //         return true;
  //     }

  //     // Print error if something goes wrong
  //     printf("Error: $s.\n", $stmt->error);

  //     return false;
  // }

  // // Delete Category
  // public function delete()
  // {
  //     // Create query
  //     $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';

  //     // Prepare Statement
  //     $stmt = $this->conn->prepare($query);

  //     // clean data
  //     $this->id = htmlspecialchars(strip_tags($this->id));

  //     // Bind Data
  //     $stmt->bindParam(':id', $this->id);

  //     // Execute query
  //     if ($stmt->execute()) {
  //         return true;
  //     }

  //     // Print error if something goes wrong
  //     printf("Error: $s.\n", $stmt->error);

  //     return false;
  // }
}
