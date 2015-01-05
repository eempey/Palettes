<?php
 
	$title = 'Palette';
	include "header.php"; 
?>
	
	<div id="content">
		<form id="colorForm" method="post" action="save-palette.php">
			<h3><input id="title" type="text" name="palette_title" placeholder="Palette title"></h3>
			<fieldset class="colorPanel">
				<div class="colorBox"></div>
				<button type="button" class="minus">-</button>
				<div class="colorInputs">
					<input type="text" class="descriptionText" name="swatch_name[]" placeholder= "Swatch description">
					<input type="text" value="" placeholder="hex" class="hex">
					<input type="text" value="" placeholder="rgb" name="rgb[]" class="rgb">
				</div>
				<button type="button" class="add">+</button>	
			</fieldset>
			<input type="submit" value="Save">
		</form>

		<div id="colorPicker">
			<div id="pickerHandle" class="group"> 
				<h3>Color Picker</h3> 
				<button>X</button>
			</div>	
		</div>

	</div>

<?php include "footer.php"; ?>
