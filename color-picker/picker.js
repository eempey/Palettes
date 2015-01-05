window.onload=function(){
	var picker = document.createDocumentFragment();
	var pickerCanvas = document.createElement("canvas");
	pickerCanvas.width = 500;
	pickerCanvas.height = 500;
	picker.appendChild(pickerCanvas);

	var saturationDefault = "60";
	var saturationHeight = 300;
	var saturationWidth = 300;

	/*var ctx=pickerCanvas.getContext("2d");
	ctx.fillStyle = saturationDefault;
	ctx.fillRect(0,0,saturationWidth,saturationHeight); 
	var whiteFade = ctx.createLinearGradient(50,0,saturationWidth,saturationHeight);
	whiteFade.addColorStop(0, "rgba(255,255,255,1)");
	whiteFade.addColorStop(0.75, "rgba(255,255,255,0)");
	ctx.fillStyle = whiteFade;
	ctx.fillRect(0,0,saturationWidth,saturationHeight);
	var blackFade = ctx.createLinearGradient(0,0,0,saturationHeight);
	blackFade.addColorStop(0, "rgba(0,0,0,0)");
	blackFade.addColorStop(1, "rgba(0,0,0,1)");
	ctx.fillStyle = blackFade;
	ctx.fillRect(0,0,saturationWidth,saturationHeight);*/

	var ctx=pickerCanvas.getContext("2d");
	var saturationGradient = ctx.createLinearGradient(0,0,saturationWidth/2,saturationHeight/2);
	saturationGradient.addColorStop(0, "hsl("+saturationDefault+",0%,100%)");
	saturationGradient.addColorStop(1,  "hsl("+saturationDefault+",100%,50%)");
	ctx.fillStyle = saturationGradient;
	ctx.fillRect(0,0,saturationWidth,saturationHeight);

	/*var lightnessGradient = ctx.createLinearGradient(0,0,saturationWidth/2,saturationHeight/2);
	lightnessGradient.addColorStop(0, "hsl("+saturationDefault+",0%,100%)");
	lightnessGradient.addColorStop(1, "hsl("+saturationDefault+",100%,0%)");
	ctx.fillStyle = lightnessGradient;
	ctx.fillRect(0,0,saturationWidth,saturationHeight);*/
	/*var blackFade = ctx.createLinearGradient(0,0,0,saturationHeight);
	blackFade.addColorStop(0, "rgba(0,0,0,0)");
	blackFade.addColorStop(1, "rgba(0,0,0,1)");
	ctx.fillStyle = blackFade;
	ctx.fillRect(0,0,saturationWidth,saturationHeight);*/

	var hueWidth = 300;
	var colorFade = ctx.createLinearGradient(0,0,hueWidth,0);
	colorFade.addColorStop(0, "rgb(255,0,0)");
	colorFade.addColorStop(0.166, "rgb(255,0,255)");
	colorFade.addColorStop(0.333, "rgb(0,0,255)");
	colorFade.addColorStop(0.50, "rgb(0,255,255)");
	colorFade.addColorStop(0.666, "rgb(0,255,0)");
	colorFade.addColorStop(0.833, "rgb(255,255,0)");
	colorFade.addColorStop(1.0, "rgb(255,0,0)");
	ctx.fillStyle = colorFade;
	ctx.fillRect(0,310,hueWidth,50);

	ctx.beginPath();
	ctx.moveTo(10,360);
	ctx.lineTo(20, 370);
	ctx.lineTo(0, 370);
	ctx.lineTo(10, 360);
	ctx.fill();

	document.body.appendChild(picker);
}

