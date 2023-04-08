<?php
session_start();

$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username=$username AND password=$password";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $password);

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 1) {
  $_SESSION['username'] = $username;
  header("Location: home.php");
} else {
  $_SESSION['login_error'] = "Invalid username or password.";
  header("Location: login.php");
}

$stmt->close();
$conn->close();

?>