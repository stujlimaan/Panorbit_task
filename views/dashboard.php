<!DOCTYPE html>
<html>
<head>
	<title>Dashboard</title>
</head>
<body>
	<h1>Welcome to your dashboard</h1>
	<p>You are logged in as <?php echo $username; ?></p>

	<form action="search.php" method="get">
		<label for="search_query">Search:</label>
		<input type="text" id="search_query" name="search_query" placeholder="Search the web" size="50">
		<button type="submit">Search</button>
	</form>

	<!-- insert additional dashboard content here -->

	<form action="process_logout.php" method="post">
		<input type="submit" value="Logout">
	</form>
</body>
</html>
