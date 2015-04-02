<?php 
	$title = "Palettes";
	include 'header.php'; 
?>

<?php require_once 'inc/connect.php'; 

	$palette_query = "SELECT `palette_id`, `palette_name` FROM `palettes` ORDER BY palette_id DESC LIMIT 15";
	$palette_result = $pdo->query($palette_query);

	$color_query = "SELECT * FROM `colors` WHERE `palette_id` = ";
	
	?>
	<ul>
	<?php  
	 while($palette_row = $palette_result->fetch()){ 
	 	$palette_id = $palette_row['palette_id'];
		echo "<li><a href='load-palette.php?palette_id=".$palette_id."'>".$palette_row['palette_name']."</a>";

		$color_result = $pdo->query($color_query.$palette_id);
		while($color_row = $color_result->fetch()){
			echo "<div class='colorThumb' style='background-color:".$color_row['rgb_value'].";'></div>";
		}
		
		echo '</li>';
	  }

?>


<?php include 'footer.php'; ?>