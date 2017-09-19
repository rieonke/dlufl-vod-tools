function init(){
    if (document.readyState == 'complete'){
        var body = document.getElementsByTagName("body")[0].innerHTML;
        var links = body.match(/javascript:openMovie\('(.*)','(.*)','(.*)'\);/ig);
        var btns = body.match(/<td width="44" height="18" align="center" valign="middle" class="nav"><font size="1">(.*)<\/font>/g);
        if (links.length >= 1){
            links = parseLinks(links,btns);
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

function parseLinks(links,btns){
    var linksReg = /javascript:openMovie\('(.*)','(.*)','(.*)'\);/;
    var btnsReg = /<td width="44" height="18" align="center" valign="middle" class="nav"><font size="1">(.*)<\/font>/;

    var newLinks = [];
    links.forEach(function(item,index){
        linksReg.test(item);
        var name = RegExp.$1;
        var link = RegExp.$2;
        var server = RegExp.$3;
        btnsReg.test(btns[index]);
        var btn = RegExp.$1;
        newLinks.push({name:name,link:link,server:server,btn:btn})
    });
    return newLinks;
}

init();