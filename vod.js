function init(){
    if (document.readyState == 'complete'){
        var body = document.getElementsByTagName("body")[0].innerHTML;
        var links = body.match(/openMovie\(.*.\);/ig);
        if (links.length >= 1){
            links = parseLinks(links);
            notice(links);

        }
    }else{
        setTimeout(init,200);
    }
}

function notice(links){
    chrome.runtime.sendMessage({links: links,type: "videos"}, function(response) {
        console.log(response.farewell);
    });
}

function parseLinks(links){
    var newLinks = [];
    links.forEach(function(item,index){
        newLinks.push(item.replace(/openMovie\(/ig,"").replace(/\);/ig,"").replace(/'/ig,"").split(","));
    });
    return newLinks;
}

init();