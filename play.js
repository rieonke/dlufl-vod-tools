var movieLinks = [];

movieLinks = JSON.parse(window.localStorage.getItem("movieLinks"));

function generatePlayHtml(links) {
    var htmlContent = "";
    links.forEach(function(item,index){
        htmlContent += '<li><button class="play-btn" data-item="'+ index +'" >' + item[0] + '(第'+(index+1)+'集)'+'</button></li>';
    });
    return htmlContent;
}

function generateDownloadHtml(links){
    var htmlContent = "";
    links.forEach(function(item,index){
        htmlContent += '<li><a class="download-btn" href="'+item[2]+item[1]+'">' + item[0] + '(第'+(index+1)+'集)'+'</a></li>';
    });
    return htmlContent;
}

var pageTitle = document.getElementsByTagName("title")[0];
pageTitle.innerText += movieLinks[0][0];

var playHtmlContent = generatePlayHtml(movieLinks);
var downloadHtmlContent = generateDownloadHtml(movieLinks);

var playList = document.getElementById("play-list");
var downloadList = document.getElementById("download-list");


playList.innerHTML = playHtmlContent;
downloadList.innerHTML = downloadHtmlContent;


var playBtn = document.getElementsByClassName("play-btn");

for(var i = 0 ;i<playBtn.length;i++){
    playBtn[i].addEventListener('click',function(){
        setPlaySource(this.dataset.item);
        setHeadTitle(this.dataset.item);
        player.src({type: "video/mp4", src: buildSourceLink(this.dataset.item)});
        player.load();
        player.play();
    })
}

function setPlaySource(index){

    var playSource = document.getElementById("play-source");

    playSource.setAttribute("src",buildSourceLink(index));

}

function buildSourceLink(index){
    return movieLinks[index][2] + movieLinks[index][1];
}

function setHeadTitle(index){
    var headTitle = document.getElementById("head-title");
    headTitle.innerText="正在播放 - " + movieLinks[index][0] + " " + (index+1) ;
}


setPlaySource(0);
setHeadTitle(0);

var player = videojs('my-player');
player.play();
