<?php 
	require_once 'inc/connect.php';
	//check that the user is authorized to change the palette!
	if(isset($_GET['palette_id'])){ 
		$palette_query = "SELECT palette_name FROM palettes WHERE palette_id =".$_GET['palette_id'];
		$palette_result = $pdo->query($palette_query);
		$palette_row = $palette_result->fetch();
		$palette_name = $palette_row[0];

		$color_query = "SELECT * FROM colors WHERE palette_id =".$_GET['palette_id'];
		$color_result = $pdo->query($color_query);

		?>
		<?php
 
			$title = $palette_name;
			include "header.php"; 
		?>
			
			<div id="content">
				<form id="colorForm" method="post" action="save-palette.php">
					<h3><input id="title" type="text" name="palette_title" placeholder="Palette title" value="<?php echo $palette_name; ?> "></h3>
					<?php while($color_row = $color_result->fetch()){ ?>
						<fieldset class="colorPanel">
							<div class="colorBox"></div>
							<button type="button" class="minus">-</button>
							<input type="text" class="descriptionText" name="swatch_name[]" placeholder= "Swatch description" value="<?php echo $color_row['color_name']; ?> ">
							<input type="text" value="" placeholder="hex" class="hex">
							<input type="text" placeholder="rgb" name="rgb[]" class="rgb" value="<?php echo $color_row['rgb_value']; ?>">
							<button type="button" class="add">+</button>	
						</fieldset>
					<?php  } ?>
					<input type="submit" value="Save">
				</form>

				<div id="colorPicker">
					<div id="pickerHandle"> 
						<h3>Color Picker</h3> 
						<button>X</button>
					</div>	
				</div>

			</div>

		<?php include "footer.php"; ?>
	
		
	<?php	} ?>