const prepareSliderNavigation = () => {
	const slider = document.getElementById("slider");

	slider.scrollLeft = 0;
	window.addEventListener("resize", () => {
		let current = document.querySelector("#slider").querySelectorAll(`[current="true"]`)[0];
		current.scrollIntoView({ block: "end", behavior: "smooth" });
	});

	let navButtons = document.querySelectorAll(".arrow-btn");
	navButtons[0].addEventListener("mousedown", () => {
		slide("left");
	});
	navButtons[1].addEventListener("mousedown", () => {
		slide("right");
	});
};

const slide = (direction) => {
	let slider = document.getElementById("slider");
	let current = document.querySelector("#slider").querySelectorAll(`[current="true"]`)[0];
	let images = document.querySelector("#slider").querySelectorAll(".preview");
	let firstImage = images[0];
	let lastImage = images[images.length - 1];

	const loopSlider = (currentElement, transportedElement, toWhichSide) => {
		if (toWhichSide == "left") {
			slider.scrollLeft = transportedElement.clientWidth;
			slider.insertBefore(transportedElement, slider.firstChild);
		} else {
			slider.scrollLeft = slider.scrollWidth - 2 * transportedElement.clientWidth;
			slider.insertBefore(transportedElement, slider.lastChild.nextSibling);
		}

		currentElement.setAttribute("current", false);
		transportedElement.setAttribute("current", true);
		transportedElement.scrollIntoView({ block: "end", behavior: "smooth" });
	};

	const switchToNeighbor = (index) => {
		images[index].scrollIntoView({ block: "end", behavior: "smooth" });
		current.setAttribute("current", false);
		images[index].setAttribute("current", true);
	};

	if (current == firstImage && direction == "left") {
		loopSlider(firstImage, lastImage, "left");
	} else if (current == lastImage && direction == "right") {
		loopSlider(lastImage, firstImage, "right");
	} else if (direction == "right") {
		let nextIndex = Array.prototype.indexOf.call(images, current) + 1;
		switchToNeighbor(nextIndex);
	} else if (direction == "left") {
		let previousIndex = Array.prototype.indexOf.call(images, current) - 1;
		switchToNeighbor(previousIndex);
	}
};

export { prepareSliderNavigation };
