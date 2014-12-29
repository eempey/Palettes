<?php 

	require_once 'inc/connect.php';

	echo $_POST['palette_title'].'<br>';
   	$form_length =  sizeof($_POST['rgb']). '<br>';

   	for($i=0; $i < $form_length; $i++){
   		echo $_POST['swatch_name'][$i].": ".$_POST['rgb'][$i]. '<br>';
   	}

   	foreach ($_POST['swatch_name'] as $field) {
    	echo $field . '<br>';
    }
    foreach ($_POST['rgb'] as $field) {
    	echo $field . '<br>';
    }
	
    $user_id = 1;
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES,false); 
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt1 = $pdo->prepare("INSERT INTO palettes (user_id, palette_name) VALUES (?,?)");
    $stmt1->bindParam(1, $user_id);
    $stmt1->bindParam(2, $_POST['palette_title']);

    if (!$stmt1) {
    echo "\nPDO::errorInfo():\n";
    print_r($pdo->errorInfo());}
    $stmt1->execute();

    $paletteId = $pdo->lastInsertId();

    $stmt2 = $pdo->prepare("INSERT INTO colors (palette_id, color_name, rgb_value) VALUES (?, ?, ?)");

    $form_length =  sizeof($_POST['rgb']);

    for($i=0; $i < $form_length; $i++){
      $stmt2 ->bindParam(1, $paletteId);
      $stmt2 ->bindParam(2, $_POST['swatch_name'][$i]); 
      $stmt2 ->bindParam(3, $_POST['rgb'][$i]);
      $stmt2->execute();       
    }

    //header('load-palette.php?')
 



 ?>