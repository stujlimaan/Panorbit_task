<!DOCTYPE html>
<html>
<head>
	<title>Signup</title>
</head>
<body>
	<h1>Create an account</h1>
	<form action="signup.php" method="post">
		<label for="username">Username:</label>
		<input type="text" id="username" name="username"><br>

		<label for="email">Email:</label>
		<input type="email" id="email" name="email"><br>

		<label for="password">Password:</label>
		<input type="password" id="password" name="password"><br>

		<label for="confirm_password">Confirm Password:</label>
		<input type="password" id="confirm_password" name="confirm_password"><br>

		<input type="submit" value="Signup">
	</form>
</body>
</html>
