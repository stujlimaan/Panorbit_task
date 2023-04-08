<?php

session_start();

$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "mydb";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$phone = $_POST['phone'];

$sql = "INSERT INTO users (username, email, password,phone) VALUES ($username,$email,$password,$phone)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $username, $email, $password);

if ($stmt->execute()) {
  $_SESSION['username'] = $username;
  header("Location: home.php");
} else {
  $_SESSION['signup_error'] = "Error: " . $sql . "<br>" . $conn->error;
  header("Location: signup.php");
}

$stmt->close();
$conn->close();



?>