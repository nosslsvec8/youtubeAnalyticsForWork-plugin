let linksStr;
let linksArr = [];
const setLinksArr = info => {
    document.getElementById('copyAllVideoLinks').textContent = 'Copy ' + (info.string.split('\n').length - 1) + ' links';
    document.getElementById('showAllVideoLinks').textContent = "Show links \u2193";
    linksArr = info.array;
    linksStr = info.string;
};

chrome.tabs.getSelected(null, function (tab) {
    isCheckAddress('youtube.com');

    let dirName = getTabLink();
    let croppedLink = tab.url.split("&")[0];
    document.querySelector("#dirName").innerHTML = "Dir. name: <span class='dirName highlightText'>" + dirName + "</span>";
    document.querySelector("#copyLink").innerHTML = croppedLink;

    document.addEventListener("click", function (e) {
        if (e.target.className === "dirName highlightText" || e.target.className === "dirName") {
            copyToClipboard(dirName);
        }
    });

    document.addEventListener("click", function (e) {
        if (e.target.className === "copyLink") {
            copyToClipboard(croppedLink);
        }
    });

    getAllVideoLinksButton.onclick = function () {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, gotTabs);
    };

    copyAllVideoLinks.onclick = function () {
        copyToClipboard(linksStr);
    };

    showAllVideoLinks.onclick = function () {
        document.getElementById('videoLinks').innerHTML = '';

        for (let i = 0; i < linksArr.length; i++) {
                let p = document.createElement('p');
                p.innerHTML = linksArr[i];
                document.getElementById('videoLinks').append(p);
        }
    };

    function gotTabs(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'getAllVideoLinksButton', setLinksArr);
    }

    function getTabLink() {
        let tabLink = tab.url.replace('https://www.youtube.com/watch?v=', '');
        tabLink = tabLink.replace('https://www.youtube.com/results?search_query=', '');
        tabLink = tabLink.replace('https://www.youtube.com/user/', '');
        tabLink = tabLink.replace('https://www.youtube.com', '');
        return tabLink.split("&")[0];
    }

    function isCheckAddress(linkStr) {
        if (tab.url.indexOf(linkStr) === -1) {
            // fail url
            window.close();
        }
    }
});

function copyToClipboard(text) {
    let virtualInput = document.createElement("input");
    document.body.appendChild(virtualInput);
    virtualInput.setAttribute('value', text);
    virtualInput.select();
    document.execCommand("copy");
    document.body.removeChild(virtualInput);
}