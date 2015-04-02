<?php 
	require_once 'config.php';

	define('DATABASE_HOST', 'localhost');
	define('USERNAME', 'root');
	define('DATABASE', 'palettes');
	define('PASSWORD', '');

	try{
		$pdo = new PDO('mysql:host='.DATABASE_HOST.';dbname='.DATABASE, USERNAME, PASSWORD);
	}
	catch (PDOException $e)
	{
	  $output = 'Unable to connect to the database server.';
	  echo $output;
	  exit();
	}
		
 ?>