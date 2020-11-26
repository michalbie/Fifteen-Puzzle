const prepareSidebar = () => {
    
    const updateSidebarLeft = () => {
        if(document.getElementById("sidebar").getAttribute("hide") == "true"){
            document.getElementById("sidebar").style.left = -(document.getElementById("sidebar").offsetWidth) + "px"
        }   
    }

    document.getElementById("open-menu-btn").addEventListener("mousedown", () => {
        if(document.getElementById("sidebar").getAttribute("hide") == "true"){
            showSidebar()
            document.getElementById("sidebar").setAttribute("hide", "false")

        }
    })

    document.getElementById("close-menu-btn").addEventListener("mousedown", () => {
        if(document.getElementById("sidebar").getAttribute("hide") == "false"){
            hideSidebar()
            document.getElementById("sidebar").setAttribute("hide", "true")
        }
    })

    window.addEventListener("resize", () => {
        updateSidebarLeft()
    })
}

const hideSidebar = () => {
    document.getElementById("sidebar").style.left = -(document.getElementById("sidebar").offsetWidth) + "px"
}

const showSidebar = () => {
    document.getElementById("sidebar").style.left = 0
}

export {prepareSidebar, hideSidebar, showSidebar}