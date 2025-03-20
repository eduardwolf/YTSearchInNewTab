const searchButton = document.querySelector('[aria-label="Search"]')
const searchInput = document.getElementsByName("search_query")[0]

searchButton.addEventListener("mousedown", (event) => {
    console.log( "button", event.button, "ctrl", event.ctrlKey, "shift", event.shiftKey);
    if (event.button === 1 || (event.button === 0 && event.ctrlKey && !event.shiftKey)){ // "mouse wheel click or left click + ctrl"
        console.log("open new tab")
    } else if (event.button === 0 && !event.ctrlKey && event.shiftKey){ // "left click + shift"
        console.log("open new window")
    } else if (event.button === 0 && event.ctrlKey && event.shiftKey){ // "left click + ctrl + shift"
        console.log("open new tab and switch to it")
    }
}, true, true);

console.log(searchButton, searchInput)
