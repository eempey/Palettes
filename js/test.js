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
		event.stopPropagation();
	}

	function upHandler(e){
		document.removeEventListener("mousemove", moveHandler, true);
		document.removeEventListener("mouseup", upHandler, true);
		event.stopPropagation();

	}
}
