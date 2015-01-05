<?php 
	require_once 'config.php';

	define('DATABASE_HOST', 'localhost');
	define('USERNAME', 'root');
	define('DATABASE', 'palettes');
	define('PASSWORD', '');

	$pdo = new PDO('mysql:host='.DATABASE_HOST.';dbname='.DATABASE, USERNAME, PASSWORD);
		
 ?>