var player ; //Youtube 播放器
var currentPlay = 0 ; //紀錄目前播放到第幾首歌

//當youtubeAPI準備好時
function onYouTubeIframeAPIReady() {
    console.log("[onYouTubeIframeAPIReady] in") ;
    console.log(playListAndTime[currentPlay].youtubeId) ;
    
    player = new YT.Player("player" ,
    {
        height:"390" ,
        width:"640" ,
        videoId:playListAndTime[currentPlay].youtubeId,
        playerVars:
        {
            "autoplay":0, //是否自動播放
            "controls":0, //是否顯示控制項
            "start":playListAndTime[currentPlay].startTimeEndTime[0], //開始播放秒數
            "end":playListAndTime[currentPlay].startTimeEndTime[1], //結束播放秒數
            "showinfo":0, //上方是否顯示影片標題
            "rel":0, //結束時是否顯示相關影片
            "iv_load_policy":3 //是否顯示置入的行銷連結
        } ,
        events:
        {
            "onReady":onPlayerReady ,
            "onStateChange":onPlayerStateChange
        }
    }) ;
}

//當youtube播放器準備好時
function onPlayerReady(event) {
    //console.log("[onPlayerReady]");
    $("#playButton").click(function()
    {
        //console.log("[Click]");
        $("#title").text(player.getVideoData().title) ;
        player.playVideo() ;
    }) ;
}

//當播放器播放狀態改變時
function onPlayerStateChange(event) {
    
    //當播放到指定的最後一首時
    if(event.data == 0 &&
        (Math.floor(player.getCurrentTime()) == playListAndTime[currentPlay].startTimeEndTime[1]))
    {   //如果還沒播到最後一首
        if(currentPlay < playListAndTime.length-1)
        {
            currentPlay++;
            player.loadVideoById({
                "videoId":playListAndTime[currentPlay].youtubeId,
                "startSeconds":playListAndTime[currentPlay].startTimeEndTime[0],
                "endSeconds":playListAndTime[currentPlay].startTimeEndTime[1],
                "suggestedQuality":"large"
            }) ;
            if(player.getVideoLoadedFraction()>0) //避免影片還沒開始播時抓不到標題
    {       $("#title").text(player.getVideoData().title) ;  }
        }else //已經播到最後一首
        {
            currentPlay=0;
            player.cueVideoById({
                "videoId":playListAndTime[currentPlay].youtubeId,
                "startSeconds":playListAndTime[currentPlay].startTimeEndTime[0],
                "endSeconds":playListAndTime[currentPlay].startTimeEndTime[1],
                "suggestedQuality":"large"
            }) ;
        }
    }
    

}