
window.onload = function(){
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

var box=document.getElementById('box');
box.addEventListener('mousedown', function(event){
	drag(box, event);
});
//drag(box, 'mousedown');
}




/*window.onload = function(){
	var box = document.getElementById("box");
	
	
	
	var initDrag = function(event){
		console.log('Start Moving');
		box.addEventListener('mousemove', drag);
		box.addEventListener('mouseup', upHandler);
	}

	var drag = function(event){
		var startX = event.clientX;
		var startY = event.clientY;

		var origX = box.offsetLeft;
		var origY = box.offsetTop;

		var deltaX = startX - origX;
		var deltaY = startY - origY;

		box.style.left = (event.clientX) + "px";
		box.style.top = (event.clientY) + "px";
		
		console.log(event.clientX + ", " + event.clientY);
	}

	box.addEventListener('mousedown', initDrag);
	
	
	function upHandler(e){
		//box.removeEventListener('mousedown', initDrag);
		box.removeEventListener("mousemove", drag);
		//box.removeEventListener("mouseup", upHandler);
		e.stopPropagation();
	}
	

}*/



//box.addEventListener("mousedown");
//box.addEventListener("mousedown", drag);
