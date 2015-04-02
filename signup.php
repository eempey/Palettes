<?php 
	$title = "Sign Up";
	include 'header.php'; 
?>

<h1>Log In</h1>
<form action="" method="POST">
	<label for="email">Email</label>
	<input type="text" placeholder="Email">
	<label for="password">Password</label>
	<input type="password" name="password" placeholder="Password">
	<input type="submit" value="Log In">
</form>

<h1>Sign Up</h1>
<form action="" method="POST">
	<label for="username">Username</label>
	<input type="text" name="username" placeholder="Username">
	<label for="email">Email</label>
	<input type="text" placeholder="Email">
	<label for="password">Password</label>
	<input type="password" name="password" placeholder="Password">
	<input type="submit" value="Sign Up">
</form>

<?php include 'footer.php'; ?>