<?php
// Connect to the database
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "mydb";
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get search term from user input
$search_term = $_POST['search_term'];

// Prepare SQL statement with placeholder for search term
$sql = "SELECT * FROM users WHERE city LIKE ?  OR country LIKE ? OR language LIKE ?";

// Prepare and bind parameters
$stmt = $conn->prepare($sql);
$search_term = "%" . $search_term . "%"; // Add wildcards to search term
$stmt->bind_param("s", $search_term);

// Execute statement and get result set
$stmt->execute();
$result = $stmt->get_result();

// Loop through result set and display results
while ($row = $result->fetch_assoc()) {
  echo $row["my_column"];
}

// Close statement and connection
$stmt->close();
$conn->close();



?>