const saveOptions = () => {
    const color = document.getElementById('color').value;
    chrome.storage.sync.set({ searchButtonColor: color });
  };

document.getElementById('color').addEventListener('change', saveOptions);
