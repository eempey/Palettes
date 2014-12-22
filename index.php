<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" type="text/css" href="style.css">
<script src="color.js"></script>

<title>Palettes</title>
</head>

<body>
	<header> 
		<h1>Palettes</h1> 
	</header>
	
	<div id="content">
		<form id="colorForm">
			<h3><input id="title" type="text" placeholder="Palette title"></h3>
			<fieldset class="colorPanel">
				<div class="colorBox"></div>
				<button type="button" class="minus">-</button>
				<input type="text" class="descriptionText" placeholder= "Swatch description">
				<input type="text" value="" placeholder="hex" class="hex">
				<input type="text" value="" placeholder="rgb" class="rgb">
				<button type="button" class="add">+</button>	
			</fieldset>
				<!-- <input type="submit" value="Save"> -->
		</form>

	<div id="colorPicker">
		<div id="pickerHandle"> 
			<h3>Color Picker</h3> 
			<button>X</button>
		</div>	
	</div>

		<p>Palettes is for designers and developers who want to keep track of their color schemes. Add an unlimited number of colors to your palette, and name each color for its purpose.  </p>

	</div>

</body>
</html>
