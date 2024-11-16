// Function for determining the name of the html page in which the script is being run
function getPageName() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    return page;
}

// Function for loading the navigation bar
function loadNavBar() {
    const navBar = document.getElementById("navbar");

    // Create a container for the logo
    const logoDiv = document.createElement("div");
    logoDiv.classList.add("navbar-logo");

    // Add the logo image
    const logo = document.createElement("img");
    logo.src = "assets/images/logo.webp"; // Updated path to your logo
    logo.alt = "ReadEase Logo";
    logoDiv.appendChild(logo);

    // Create navigation links
    const pages = ["index.html", "site-viewer.html", "text-viewer.html", "about.html"];
    const ul = document.createElement("ul");

    for (const page of pages) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = page;

        a.textContent = page === "index.html" ? "Home" : capitalizeFirstLetter(getPageNamewithoutExtension(page));

        if (page === getPageName()) {
            a.classList.add("active");
        }

        li.appendChild(a);
        ul.appendChild(li);
    }

    // Add the logo and navigation links to the navbar
    navBar.appendChild(logoDiv);
    navBar.appendChild(ul);
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Get page name without extension
function getPageNamewithoutExtension(page) {
    page = page.split(".")[0];
    return page;
}

// Load the navigation bar
loadNavBar();
