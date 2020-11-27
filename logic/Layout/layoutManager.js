const prepareSidebar = () => {
    
    const updateSidebarLeft = () => {
        if(document.getElementById("sidebar").getAttribute("hide") == "true"){
            document.getElementById("sidebar").style.left = -(document.getElementById("sidebar").offsetWidth) + "px"
        }   
    }

    document.getElementById("open-menu-btn").addEventListener("mousedown", () => {
        if(document.getElementById("sidebar").getAttribute("hide") == "true"){
            showSidebar()
        }
    })

    document.getElementById("close-menu-btn").addEventListener("mousedown", () => {
        if(document.getElementById("sidebar").getAttribute("hide") == "false"){
            hideSidebar()
        }
    })
    
    updateSidebarLeft();

    window.addEventListener("resize", () => {
        document.getElementById("sidebar").style.transition = "0s";
        updateSidebarLeft()
    })
}

const hideSidebar = () => {
    document.getElementById("sidebar").style.transition = "left 0.5s";
    document.getElementById("sidebar").style.left = -(document.getElementById("sidebar").offsetWidth) + "px"
    document.getElementById("sidebar").setAttribute("hide", "true")
}

const showSidebar = () => {
    document.getElementById("sidebar").style.transition = "left 0.5s";
    document.getElementById("sidebar").style.left = 0
    document.getElementById("sidebar").setAttribute("hide", "false")
}

export {prepareSidebar, hideSidebar, showSidebar}