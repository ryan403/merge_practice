var mapArray, ctx, currentImgMainX, currentImgMainY ;
var imgMountain, imgMain, imgEnemy ;
//mapArray：決定地圖中每個格子的元素
//ctx：HTML5 Canvas用
//currentImgManX、currentImgManY：決定主角的所在座標
//imgMountain、imgMain、imgEnemy：障礙物、敵人的圖片物件

//當網頁原件載入完成後要做的事情
$(document).ready(function() 
{
    
    //遊戲地形設定
    //0:可走 1:障礙 2:終點 3:敵人
    mapArray = [0,1,1,0,0,0,3,1,2] ;
    ctx = $("#myCanvas")[0].getContext("2d") ; //畫面顯示2d

    //擺上主角 - 使用預設位置
    imgMain = new Image() ;
    imgMain.src = "simple_rgb/images/spritesheet.png" ;
    currentImgMainX = 0 ;
    currentImgMainY = 0 ;
    imgMain.onload = function()
    {
        ctx.drawImage(imgMain,0,0,80,130,currentImgMainX,currentImgMainY,200,200) ;
    } ;

    //擺上障礙物、敵人
    imgMountain = new Image() ; //障礙物圖片物件
    imgMountain.src = "simple_rgb/images/material.png" ;
    imgEnemy = new Image() ; //敵人圖片物件
    imgEnemy.src = "simple_rgb/images/enemy.png" ;
    imgMountain.onload = function() 
    {
        imgEnemy.onload = function() 
        {
            for(var x in mapArray)
            {
        
                if(mapArray[x]==1) //擺上障礙物
                {
                    ctx.drawImage(imgMountain,32,65,32,32,x%3*200,Math.floor(x/3)*200,200,200) ;                
                }else if(mapArray[x]==3) //擺上敵人
                {
                    ctx.drawImage(imgEnemy,7,40,104,135,x%3*200,Math.floor(x/3)*200,200,200) ;                
                } ;
            } ;
        } ; 
    } ;
}) ;

//當有人按下按鍵後要做的事情
$(document).keydown(function(event) 
{
    var targetImgMainX, targetImgMainY, targetBlock, cutImagePositionX ;
    //targetImgMainX、targetImgMainY：主角即將移動過去的具體位置
    //targetBlock：主角即將要移動過去的那一格編號
    //cutImagePositionX：依據主角朝向什麼方向而決定的圖片
    event.preventDefault() ;
    
    //避免點擊鍵盤出現瀏覽器做其他行為，如捲動、放大、換頁...
    //依據使用者點擊按鍵，計算出目標位置以及設定新的圖片
    switch(event.which) 
    {
        case 37://往左走
            targetImgMainX = currentImgMainX-200 ;
            targetImgMainY = currentImgMainY ;
            cutImagePositionX = 175 ;
            break ;
        case 38://往上走
            targetImgMainX = currentImgMainX ;
            targetImgMainY = currentImgMainY-200 ;
            cutImagePositionX = 355 ;
            break ;
        case 39://往右走
            targetImgMainX = currentImgMainX+200 ;
            targetImgMainY = currentImgMainY ;
            cutImagePositionX = 540 ;
            break ;
        case 40://往下走
            targetImgMainX = currentImgMainX ;
            targetImgMainY = currentImgMainY+200 ;
            cutImagePositionX = 0 ;
            break ;
        default://當有人按了這四個按鍵以外的狀況
            return ;
    }
    console.log (event.which) ;
    
    if(targetImgMainX<=400 && targetImgMainX>=0 &&
       targetImgMainY<=400 && targetImgMainY>=0) //沒有超出邊界
    {
        targetBlock=targetImgMainX/200+targetImgMainY/200*3 ;
    }
    else
    {
        targetBlock=-1 ; //-1代表異常不移動
    }

    ctx.clearRect(currentImgMainX, currentImgMainY,200,200) ; //清除主角原本所在位置
    if(targetBlock==-1 || mapArray[targetBlock]==1 || mapArray[targetBlock]==3)
    {
        //目標位置異常，遇到障礙物，遇到敵人都不能走，在原地 (但稍後會依移動方向轉頭)
    }
    else
    {
        $("#talkBox").text("") ;
        currentImgMainX=targetImgMainX ;
        currentImgMainY=targetImgMainY ;
    }
        ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMainX,currentImgMainY,200,200) ;

        switch(mapArray[targetBlock])
            {
                case undefined://牆壁
                    $("#talkBox").text("邊界") ;
                break ;
                case 1://障礙
                    $("#talkBox").text("有竹筍") ;
                break ;
                case 2://終點
                    $("#talkBox").text("抵達") ;
                break ;
                case 3://有人
                    $("#talkBox").text("哈囉") ;
                break ;
            }
}) ;