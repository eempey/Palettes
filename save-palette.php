<?php 

	require_once 'inc/connect.php';
  $user_id = 1;
  $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES,false); 
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  if (isset($_POST['update_palette'])) {
    $paletteId = $_POST['palette_id'];
    
    $stmt1 = $pdo->prepare("UPDATE palettes SET palette_name = ? WHERE palette_id = ?");
    $stmt1->bindParam(1, $_POST['palette_title']);
    $stmt1->bindParam(2, $paletteId);
    $stmt1->execute();

    $stmt2 = $pdo->prepare("DELETE FROM colors WHERE palette_id = ?");
    $stmt2->bindParam(1, $paletteId);
    $stmt2->execute();

    

    $stmt3 = $pdo->prepare("INSERT INTO colors (palette_id, color_name, rgb_value) VALUES (?, ?, ?)");
    $form_length =  sizeof($_POST['rgb']);
    for($i=0; $i < $form_length; $i++){
      $stmt3 ->bindParam(1, $paletteId);
      $stmt3 ->bindParam(2, $_POST['swatch_name'][$i]); 
      $stmt3 ->bindParam(3, $_POST['rgb'][$i]);
      $stmt3->execute(); 
    }      

    header("Location: load-palette.php?palette_id=".$paletteId);


  } else if (isset($_POST['save_palette'])) {


      $stmt1 = $pdo->prepare("INSERT INTO palettes (user_id, palette_name) VALUES (?,?)");
      $stmt1->bindParam(1, $user_id);
      $stmt1->bindParam(2, $_POST['palette_title']);

      /*if (!$stmt1) {
      echo "\nPDO::errorInfo():\n";
      print_r($pdo->errorInfo());}*/
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

      header("Location: load-palette.php?palette_id=".$paletteId);

    } else if (isset($_POST['delete_palette'])){
        $paletteId = $_POST['palette_id'];
      
        $stmt1 = $pdo->prepare("DELETE FROM palettes WHERE palette_id = ?");
        $stmt1->bindParam(1, $paletteId);
        $stmt1->execute();

        $stmt2 = $pdo->prepare("DELETE FROM colors WHERE palette_id = ?");
        $stmt2->bindParam(1, $paletteId);
        $stmt2->execute();

        header("Location: index.php");
    }
	
    