chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    if (message === 'getAllVideoLinksButton') {
        let links = document.querySelectorAll('#contents a.yt-simple-endpoint.style-scope');
        // console.log('result page or group page')

        if (links.length === 0) {
            links = document.querySelectorAll('#related #items a.yt-simple-endpoint.ytd-compact-video-renderer');
            // console.log('watch page')
        }

        const linksArr = [];
        let linksStr = '';
        let lastLink = '';
        for (let i = 0; i < links.length; i++) {
            if (
                links[i].href.split("&")[0].trim() !== '' &&
                links[i].href.indexOf('watch?') !== -1 &&
                lastLink !== links[i].href.split("&")[0]
            ) {
                linksStr += links[i].href.split("&")[0] + ' \n';
                linksArr[linksArr.length] = links[i].href.split("&")[0];
                lastLink = links[i].href.split("&")[0];
            }
        }

        sendResponse({
            string: linksStr,
            array: linksArr
        });
    }
}