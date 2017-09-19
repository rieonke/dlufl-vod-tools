var movieLinks = JSON.parse(window.localStorage.getItem("movieLinks"));
adjustHeight();
if (movieLinks != null && movieLinks.length > 0) {
    $("#video-name").text(movieLinks[0].name + " - 列表");

    var playSource = $("#play-source");
    playSource.attr("src",movieLinks[0].server + movieLinks[0].link);

    var player = videojs('my-player',{ aspectRatio: "16:9", height: 300});
    player.play();

    var tpl = "<li><a onclick='selectVideo()'>title</a></li>"
    var result = "";

    movieLinks.forEach(function (item, index) {
        console.log(item.btn);
        result += "<li>" +
            "<a class='select-video' data-name='" + item.btn + "'" +
            " data-server='" + item.server + "' " +
            "data-url='" + item.server + item.link + "'>" + item.btn + "  " +
            " <button type=\"button\" class=\"btn btn-primary btn-sm\">播</button> " +
            "<button data-url='" + item.server + item.link + "'" +
            " type=\"button\" class=\"btn btn-danger btn-sm download-action\">下</button></a></li>";
    });

    $("#video-links").html(result);

    $(".download-action").click(function (event) {
        window.open($(this).data("url"));
    });

    $(".select-video").click(function () {
        var data = $(this).data("url");
        console.log(data);
        playSource.attr("src",data);
        player.src({type: "video/mp4", src: data});
        player.load();
        player.play();
    })
}else {
    $('#errorModal').modal('show')
}

$(window).on("resize",function (){
    adjustHeight();
});

function adjustHeight(){
    $(".full-height").height($("body").height()-$("header").height()-20);
}