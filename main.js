window.addEventListener("load", () => {
    const searchButton = document.querySelector('[aria-label="Search"]');
    const searchInput = document.getElementsByName("search_query")[0];

    if (searchButton && searchInput) {

        // create the anchor element
        const searchAnchor = document.createElement("a");
        searchAnchor.style.cssText = searchButton.style.cssText;
        searchAnchor.className = searchButton.className;
        searchAnchor.style.display = "flex";
        searchAnchor.style.alignItems = "center";
        chrome.storage.sync.get(["searchButtonColor"], (result) => {
            const searchButtonColor = result.searchButtonColor || "#FF0000";
            searchAnchor.style.backgroundColor = searchButtonColor;
        });

        // append the buttons child to the anchor, replace the button with the anchor
        const searchButtonParent = searchButton.parentNode;
        const searchButtonChild = searchButton.firstChild;
        searchAnchor.appendChild(searchButtonChild);
        searchButtonParent.replaceChild(searchAnchor, searchButton);

        // event listener for mousedown to dynamically change the href and target from the search input content
        searchAnchor.addEventListener("mousedown", (event) => {
            searchAnchor.href = "";
            searchAnchor.target = "_blank";
            const query = searchInput.value.trim();
            let url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
            const queryEmpty = query.length === 0;

            // result to default YT url when empty search
            if (queryEmpty) {
                url = "https://www.youtube.com/"
            }
            searchAnchor.href = url;

            // this assures that a normal left click will result in normal youtube behavior by clicking the old button that was removed
            if (event.button === 0 && !event.ctrlKey && !event.shiftKey) {
                searchAnchor.removeAttribute("href")
                if (!queryEmpty) {
                    searchButton.click();
                }
            }

        }, true, true);
    } else {
        console.log("Youtube Search In New Tab Extension: Unable to locate necessary elements");
    }
});



