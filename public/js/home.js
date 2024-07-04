const body = document.querySelector("body"),
            nav = document.querySelector("nav"),
            modeToggle = document.querySelector(".dark-light"),
            searchToggle = document.querySelector(".searchToggle"),
            sidebarOpen = document.querySelector(".sidebarOpen"),
            siderbarClose = document.querySelector(".siderbarClose"),
            drop= document.querySelector(".drop-down1"),
            drop1= document.querySelector(".click"),
            drop12= document.querySelector(".drop-down2"),
            drop2= document.querySelector(".click2"),
            drop13= document.querySelector(".drop-down3"),
            drop3= document.querySelector(".click3");


        let getMode = localStorage.getItem("mode");
        if (getMode && getMode === "dark-mode") {
            body.classList.add("dark");
        }

        // js code to toggle dark and light mode
        modeToggle.addEventListener("click", () => {
            modeToggle.classList.toggle("active");
            body.classList.toggle("dark");

            // js code to keep user selected mode even page refresh or file reopen
            if (!body.classList.contains("dark")) {
                localStorage.setItem("mode", "light-mode");
            } else {
                localStorage.setItem("mode", "dark-mode");
            }
        });

        // js code to toggle search box
        searchToggle.addEventListener("click", () => {
            searchToggle.classList.toggle("active");
        });

        drop1.addEventListener("click", () => {
            drop.classList.toggle("drop-down");
        });
        drop2.addEventListener("click", () => {
            drop12.classList.toggle("drop-down");
        });
        drop3.addEventListener("click", () => {
            drop13.classList.toggle("drop-down");
        });
        //   js code to toggle sidebar
        // sidebarOpen.addEventListener("click", () => {
        //     nav.classList.add("active");
        // });

        // body.addEventListener("click", e => {
        //     let clickedElm = e.target;

        //     if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
        //         nav.classList.remove("active");
        //     }
        // });
