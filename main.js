window.addEventListener("load", () => {
    const searchButton = document.querySelector('[aria-label="Search"]');
    const searchInput = document.getElementsByName("search_query")[0]
    if (searchButton && searchInput) {
        const searchButtonParent = searchButton.parentNode
        const searchButtonChild = searchButton.firstChild

        const searchAnchor = document.createElement("a");
        searchAnchor.style.cssText = searchButton.style.cssText; // Copy styles
        searchAnchor.className = searchButton.className; // Copy classes
        searchAnchor.style.display = "flex";
        searchAnchor.style.alignItems = "center";

        searchAnchor.appendChild(searchButtonChild)

        searchButtonParent.removeChild(searchButton)
        searchButtonParent.appendChild(searchAnchor)

        searchAnchor.addEventListener("mousedown", (event) => {
            searchAnchor.href = ""; // Default, will update dynamically
            searchAnchor.target = "_blank"; // Ensure it opens in a new tab
            const query = searchInput.value.trim()
            let url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
            
            const queryEmpty = query.length === 0

            if (queryEmpty) {
                url = "https://www.youtube.com/"
            }
            searchAnchor.href = url; // Default, will update dynamically
            
            if (event.button === 0 && !event.ctrlKey && !event.shiftKey) {
                searchAnchor.target = "";
                searchAnchor.removeAttribute("href")
                if (!queryEmpty) {
                    searchButton.click()
                }
            }
            
        }, true, true);
    } else {
        console.log("Youtube Search In New Tab Extension: Unable to locate necessary elements");
    }
});



