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
			var cpContainer = document.getElementById("colorPicker");
			var pickerHandle = document.querySelector("#pickerHandle");

			cpContainer.style.left = document.documentElement.clientWidth / 2 - 300 + "px";
			cpContainer.style.top = document.documentElement.scrollTop + 50 + "px";

			//Make the color picker container visible
			if(cpContainer.style.visibility ="hidden"){
				cpContainer.style.visibility ="visible";
			}

			//create and add a color canvas to the color picker container
			if(!document.getElementById("picker")){
				var pickerTool = document.createElement("canvas");
				pickerTool.id = "picker";
				pickerTool.height = 600;
				pickerTool.width = 600;
				document.getElementById("colorPicker").appendChild(pickerTool);
				
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
					var mousePos = getMousePos(pickerTool, evt);
					var imgData=ctx.getImageData(mousePos.x, mousePos.y, 1, 1);
					var rgb = "rgb("+imgData.data[0]+", "+imgData.data[1]+", "+imgData.data[2]+")"
					current.style.backgroundColor = rgb;
					parent.getElementsByClassName("rgb")[0].value = rgb;
					parent.getElementsByClassName("hex")[0].value = colorToHex(rgb);

				}, false);	
				
				pickerTool.addEventListener("click",function(evt){			
					var mousePos = getMousePos(pickerTool, evt);
					var imgData=ctx.getImageData(mousePos.x,mousePos.y,1,1);
					var rgb = "rgb("+imgData.data[0]+", "+imgData.data[1]+", "+imgData.data[2]+")"
					current.style.backgroundColor = rgb;
					pickerTool.removeEventListener("click", arguments.callee, false);
					pickerTool.removeEventListener("mousemove", arguments.callee, false);				
					current.removeAttribute('id');
					pickerTool.remove();
					document.getElementById("colorPicker").style.visibility ="hidden";
				});

			}//end if(!document.getElementById("picker"))

			//drag function for moving color picker around
			function drag(elementToDrag, event){
				var startX = event.clientX;
				var startY = event.clientY;

				var origX = elementToDrag.offsetLeft;
				var origY = elementToDrag.offsetTop;

				var deltaX = startX - origX;
				var deltaY = startY - origY;

				document.addEventListener("mousemove", moveHandler, true);
				document.addEventListener("mouseup", upHandler, true);

				event.stopPropagation();
				event.preventDefault();

				function moveHandler(e){
					elementToDrag.style.left = (e.clientX - deltaX) + "px";
					elementToDrag.style.top = (e.clientY - deltaY) + "px";
					e.stopPropagation();
				}

				function upHandler(e){
					document.removeEventListener("mousemove", moveHandler, true);
					document.removeEventListener("mouseup", upHandler, true);
					e.stopPropagation();
				}
			}
			pickerHandle.addEventListener('mousedown', function(event){
				drag(cpContainer, event);
			});
		});//end click on colorBox
	}

	
	
	function inputColor(input){		
		input.addEventListener("blur", function(){
			var parentalUnit = input.parentNode.parentNode;
			var colorBox = parentalUnit.getElementsByClassName("colorBox")[0].style.backgroundColor = input.value;
			if(input.className == "hex"){
				parentalUnit.getElementsByClassName("rgb")[0].value = "rgb(" + hexToRgb(input.value).r + ", " 
																		+ hexToRgb(input.value).g + ", "
																		+ hexToRgb(input.value).b + ")";
			}else if(input.className == "rgb"){
				parentalUnit.getElementsByClassName("hex")[0].value = colorToHex(input.value);
			}
		});
	}

	function initializeInputColor(){
		var fieldsets = document.getElementsByTagName("fieldset").length;
		var hexInputs = document.getElementsByClassName("hex");
		var rgbInputs = document.getElementsByClassName("rgb");
		for(i=0; i<fieldsets; i++){
			inputColor(hexInputs[i]);
			inputColor(rgbInputs[i]);
		}
	}
	initializeInputColor();

	function loadColors(){
		var hexInputs = document.querySelectorAll("input.hex");
		var rgbInputs = document.querySelectorAll("input.rgb");
		for(i=0; i<rgbInputs.length; i++){
			if(rgbInputs[i].value){
				rgbInputs[i].previousElementSibling.value = colorToHex(rgbInputs[i].value);
				rgbInputs[i].parentNode.parentNode.getElementsByClassName("colorBox")[0].style.backgroundColor = rgbInputs[i].value;
			}
		}
	}
	loadColors();

	function createColorPanel(button){

		var colorForm = document.getElementById("colorForm");
		
		var fieldsetBlock = document.createDocumentFragment();
		var fieldset = fieldsetBlock.appendChild(document.createElement("fieldset"));
		fieldset.className = "colorPanel";
		var newColorBox = fieldset.appendChild(document.createElement("div"));
		newColorBox.className = "colorBox";

		var newMinusButton = fieldset.appendChild(document.createElement("button"));
		newMinusButton.className = "minus";
		newMinusButton.type = "button";
		newMinusButton.innerHTML = "-";
		
		var colorInputs = fieldset.appendChild(document.createElement("div"));
		colorInputs.className = "colorInputs";

		var descriptionText = colorInputs.appendChild(document.createElement("input"));
		descriptionText.className = "descriptionText";
		descriptionText.placeholder = "Swatch Description";
		descriptionText.name = "swatch_name[]";

		var hexText = colorInputs.appendChild(document.createElement("input"));
		hexText.className = "hex";
		hexText.placeholder = "hex";
		inputColor(hexText);
		
		var rgbText = colorInputs.appendChild(document.createElement("input"));
		rgbText.className = "rgb";
		rgbText.placeholder = "rgb";
		rgbText.name ="rgb[]";
		inputColor(rgbText);
		
		var newAddButton = fieldset.appendChild(document.createElement("button"));
		newAddButton.className = "add";
		newAddButton.type = "button";
		newAddButton.innerHTML = "+";
		
		addPicker(newColorBox);
		addButtonInitializer(newAddButton);
		clickRemoveButton(newMinusButton);

		colorForm.insertBefore(fieldsetBlock, button.parentNode.nextSibling);
	}

	function addButtonInitializer(button){
		button.addEventListener("click", function(){
			createColorPanel(this);
			if(document.getElementsByClassName('minus').length > 1){
				document.getElementsByClassName('minus')[0].style.display = "inline";
			}	
		});
	}

	var addButton = document.getElementsByClassName('add');
	for(i=0; i<addButton.length; i++){
		var currentButton = addButton[i];
		addButtonInitializer(currentButton);
	}

	var colorBox = document.getElementsByClassName('colorBox');
	for(i=0; i<colorBox.length; i++){
		var currentColorBox = colorBox[i];
		addPicker(currentColorBox);
	}

	if(colorBox.length === 1){
		document.getElementsByClassName('minus')[0].style.display = "none";
	}	

	function createRemoveButton(){
		var removeButtons = document.getElementsByClassName("minus");
		for(i=0; i<removeButtons.length; i++){
			var currentRemoveButton = removeButtons[i];
			clickRemoveButton(currentRemoveButton);
		}
	}
	createRemoveButton();

	function clickRemoveButton(currentRemoveButton){	
		currentRemoveButton.addEventListener("click", function(){
			var parent = currentRemoveButton.parentNode;
			parent.remove();
			if(document.getElementsByClassName('minus').length === 1){
				document.getElementsByClassName('minus')[0].style.display = "none";
			}	
		});
	}

	function colorPickerCloser(){
		var closeButton = document.querySelector("#colorPicker button");
		closeButton.addEventListener("click",function(){
			document.getElementById("colorPicker").style.visibility = "hidden";
		});
	}
	colorPickerCloser();	

}//end onload

