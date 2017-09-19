document.addEventListener('DOMContentLoaded', function() {
});

var btnOpenVodMainSite = document.getElementById("openVodMainSiteBtn");
btnOpenVodMainSite.addEventListener('click',function(){
    chrome.tabs.create({url:"http://vod.dlufl.edu.cn"},function(){
    });
});


