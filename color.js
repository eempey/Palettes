function colorToHex(color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/.exec(color);


    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);

    var rgb = blue | (green << 8) | (red << 16);
    return "#" + ("000000"+rgb.toString(16)).slice(-6);
};

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

window.onload=function(){
	
	function addPicker(colorBox){
		colorBox.addEventListener("click", function(){
			this.id = "current";
			var current = document.getElementById("current");
			
			var parent = current.parentNode;
			var nextSibling = parent.nextSibling;

			var canvas = document.createElement("canvas");
			canvas.id = "picker";
			canvas.height = 600;
			canvas.width = 600;
			document.body.appendChild(canvas);
			
			document.getElementById("colorForm").insertBefore(canvas, parent.nextSibling);
			
			if(document.getElementById("picker")){
				var pickerTool = document.getElementById("picker");
				var ctx=pickerTool.getContext("2d");
				var colorFade = ctx.createLinearGradient(0,0,0,pickerTool.height);
				colorFade.addColorStop(0, "rgb(255,0,0)");
				colorFade.addColorStop(0.166, "rgb(255,0,255)");
				colorFade.addColorStop(0.333, "rgb(0,0,255)");
				colorFade.addColorStop(0.50, "rgb(0,255,255)");
				colorFade.addColorStop(0.666, "rgb(0,255,0)");
				colorFade.addColorStop(0.833, "rgb(255,255,0)");
				colorFade.addColorStop(1.0, "rgb(255,0,0)");

				ctx.fillStyle = colorFade;
				ctx.fillRect(0,0,600,600);
				
				var bgfade = ctx.createLinearGradient(0,0,pickerTool.width,0);
				bgfade.addColorStop(0.0, "#000");
				bgfade.addColorStop(0.5, "transparent");
				bgfade.addColorStop(1.0, "#fff");
				ctx.fillStyle = bgfade;
				ctx.fillRect(0,0,600,600);
				
				function getMousePos(canvas, evt) {
		        var rect = canvas.getBoundingClientRect();
		        return {
		          x: evt.clientX - rect.left,
		          y: evt.clientY - rect.top
					};
				  }
				  
				pickerTool.addEventListener('mousemove', function(evt) {
					var mousePos = getMousePos(canvas, evt);
					var imgData=ctx.getImageData(mousePos.x, mousePos.y, 1, 1);
					var rgb = "rgb("+imgData.data[0]+", "+imgData.data[1]+", "+imgData.data[2]+")"
					current.style.backgroundColor = rgb;
					parent.getElementsByClassName("rgb")[0].value = rgb;
					parent.getElementsByClassName("hex")[0].value = colorToHex(rgb);

				}, false);
				
				
				
				pickerTool.addEventListener("click",function(evt){			
					var mousePos = getMousePos(canvas, evt);
					var imgData=ctx.getImageData(mousePos.x,mousePos.y,1,1);
					var rgb = "rgb("+imgData.data[0]+", "+imgData.data[1]+", "+imgData.data[2]+")"
					current.style.backgroundColor = rgb;
					pickerTool.removeEventListener("click", arguments.callee, false);
					pickerTool.removeEventListener("mousemove", arguments.callee, false);
					pickerTool.remove(0);
					current.removeAttribute('id');
				});
			}//end if "picker"

		});//end click on colorBox
	}

	
	
	function inputColor(input){		
		input.addEventListener("blur", function(){
			var parentalUnit = input.parentNode;
			var colorBox = parentalUnit.getElementsByClassName("colorBox")[0].style.backgroundColor = input.value;
			if(input.className == "hex"){
				document.getElementsByClassName("rgb")[0].value = "rgb(" + hexToRgb(input.value).r + ", " 
																		+ hexToRgb(input.value).g + ", "
																		+ hexToRgb(input.value).b + ")";
			}else if(input.className == "rgb"){
				document.getElementsByClassName("hex")[0].value = colorToHex(input.value);
			}
		});
	}

	inputColor(document.getElementsByClassName("hex")[0]);
	inputColor(document.getElementsByClassName("rgb")[0]);

	function radioSwitcher(radioButton){
		radioButton.addEventListener("click", function(){
			var radioParent = radioButton.parentNode;
			document.body.style.backgroundColor = radioParent.getElementsByClassName("hex")[0].value;
		});
	}
	
	radioSwitcher(document.getElementsByClassName('backgroundButton')[0]);
	

	var addButton = document.getElementsByClassName('add');
	var colorForm = document.getElementById("colorForm");

	function createColorPanel(){		
		var newNode = document.createElement("div");
		newNode.className = "colorPanel";
		var newColorBox = document.createElement("div");
		newColorBox.className = "colorBox";
		newNode.appendChild(newColorBox);
		
		backgroundRadio = document.createElement("input");
		backgroundRadio.className = "backgroundButton";
		backgroundRadio.type = "radio";
		backgroundRadio.value = "background";
		backgroundRadio.name = "background";
		newNode.appendChild(backgroundRadio);

		backgroundSpan = document.createElement("span")
		backgroundSpan.innerHTML = "Background";
		newNode.appendChild(backgroundSpan);

		textRadio = document.createElement("input");
		textRadio.className = "textRadio";
		textRadio.type = "radio";
		textRadio.value = "text";
		textRadio.name = "text";
		newNode.appendChild(textRadio);

		textSpan = document.createElement("span")
		textSpan.innerHTML = "Text";
		newNode.appendChild(textSpan);

		descriptionText = document.createElement("input");
		descriptionText.className = "descriptionText";
		descriptionText.placeholder = "Swatch Description";
		newNode.appendChild(descriptionText);

		hexText = document.createElement("input");
		hexText.className = "hex";
		hexText.placeholder = "hex";
		newNode.appendChild(hexText);

		rgbText = document.createElement("input");
		rgbText.className = "rgb";
		rgbText.placeholder = "rgb";
		newNode.appendChild(rgbText);

		newAddButton = document.createElement("button");
		newAddButton.className = "add";
		newAddButton.type = "button";
		newAddButton.innerHTML = "+";
		newNode.appendChild(newAddButton);
		colorForm.appendChild(newNode);
		addPicker(newColorBox);
		addButtonInitializer(newAddButton);

		var hexBoxes = document.getElementsByClassName("hex");
		for(i=0; i<hexBoxes.length; i++){
			inputColor(hexBoxes[i]);
		}

		var rgbBoxes = document.getElementsByClassName("rgb");
		for(i=0; i<hexBoxes.length; i++){
			inputColor(rgbBoxes[i]);
		}

		var backgroundRadio = document.getElementsByClassName('backgroundButton');
		for(i=0; i<backgroundRadio.length; i++){
			radioSwitcher(backgroundRadio[i]);
		}
	}

	function addButtonInitializer(button){
			button.addEventListener("click", function(){
				createColorPanel();
				createRemoveButton();
			});
	}

	for(i=0; i<addButton.length; i++){
		var currentButton = addButton[i];
		addButtonInitializer(currentButton);
	}

	var colorBox = document.getElementsByClassName('colorBox');
	
	
	for(i=0; i<colorBox.length; i++){
		var currentColorBox = colorBox[i];
		addPicker(currentColorBox);
	}	

	function createRemoveButton(){
		colorPanels = document.getElementsByClassName("colorPanel");
		newMinusButton = document.createElement("button");
		newMinusButton.className = "minus";
		newMinusButton.type = "button";
		newMinusButton.innerHTML = "-";
		if(colorPanels.length > 1){
			for(i=0; i<colorPanels.length; i++){
				colorPanels[i].insertBefore(newMinusButton, document.getElementsByName("background")[i]);
			}
		}
		var removeButtons = document.getElementsByClassName("minus");
		for(i=0; i<removeButtons.length; i++){
			var currentRemoveButton = removeButtons[i];
			clickRemoveButton(currentRemoveButton);
		}		
	}

	function clickRemoveButton(currentRemoveButton){	
		currentRemoveButton.addEventListener("click", function(){
			var parent = currentRemoveButton.parentNode
			parent.remove();
		});
	}

	

	
	

}//end onload

