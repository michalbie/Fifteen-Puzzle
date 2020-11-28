
const prepareSliderNavigation = () => {
    document.getElementById('slider').scrollLeft = 0;
    let navButtons = document.querySelectorAll(".arrow-btn");
    navButtons[0].addEventListener("mousedown", () =>{
        slide("left")
    })
    navButtons[1].addEventListener("mousedown", () =>{
        slide("right")
    })
}   

const slide = (direction) => {
    let slider = document.getElementById('slider');
    let current = document.querySelector("#slider").querySelectorAll(`[current="true"]`)[0];
    let images = document.querySelector("#slider").querySelectorAll(".preview")
    let firstImage = images[0];
    let lastImage =  images[images.length - 1]

    const loopSlider = (currentElement, transportedElement, toWhichSide) => {
        if(toWhichSide == "left"){
            slider.scrollLeft = transportedElement.clientWidth;
            slider.insertBefore(transportedElement, slider.firstChild);
        } else {
            slider.scrollLeft = slider.scrollWidth - 2 * transportedElement.clientWidth;
            slider.insertBefore(transportedElement, slider.lastChild.nextSibling);
        }

        currentElement.setAttribute("current", false)
        transportedElement.setAttribute("current", true)
        transportedElement.scrollIntoView({ block: 'end',  behavior: 'smooth' });
    }

    if(current == firstImage && direction == "left") {
        loopSlider(firstImage, lastImage, "left")
    } else if(current == lastImage && direction == "right") {
        loopSlider(lastImage, firstImage, "right")
    } else if(direction == "right"){
        let nextIndex = Array.prototype.indexOf.call(images, current) + 1;
        images[nextIndex].scrollIntoView({ block: 'end',  behavior: 'smooth' });
        current.setAttribute("current", false)
        images[nextIndex].setAttribute("current", true)
    } else if(direction == "left") {
        let previousIndex = Array.prototype.indexOf.call(images, current) - 1;
        images[previousIndex].scrollIntoView({ block: 'end',  behavior: 'smooth' });
        current.setAttribute("current", false)
        images[previousIndex].setAttribute("current", true)
    }

    //document.querySelectorAll(".preview")[1].scrollIntoView({ block: 'end',  behavior: 'smooth' });
}

export { prepareSliderNavigation };