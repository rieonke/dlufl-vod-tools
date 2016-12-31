setInterval(function(){
    console.log("event running");
},1000);

var movieLinks = [];

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type=="videos"){

            movieLinks = request.links;
            window.localStorage.setItem("movieLinks",JSON.stringify(movieLinks));
            chrome.tabs.update(sender.tab.id,{url:"./play.html"}, function (){
                console.log("updated a new tab");
            });
            sendResponse({farewell: "received videos"});

        }
    });

chrome.webRequest.onBeforeRequest.addListener(
    function(details) { return {cancel: true}; },
    {urls: ["*://vod.dlufl.edu.cn/vod/html/content/#"]},
    ["blocking"]);
