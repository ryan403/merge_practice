$(document).ready(function() {
    
    $("#courseTable").append("<tr>") ;
    $("#courseTable").append("<th>場次</th>") ;
    $("#courseTable").append("<th>時間</th>") ;
    $("#courseTable").append("<th>主題</th>") ;
    $("#courseTable").append("</tr>") ;

    $( "input[type=date]" ).change(function() {
        //alert( $( "input[type=date]" ).val() );
        //2018-09-03
        var inputDate = $( "input[type=date]" ).val();
        var splitText = inputDate.split("-");
        console.log(splitText[1]);
        setMonthAndDay(splitText[1],splitText[2]);
        setTable();
    });
     
});

function setTable(){
    
    $("#courseTable").empty();
    
    $("#courseTable").append("<tr>");
    $("#courseTable").append("<th>場次</th>");
    $("#courseTable").append("<th>時間</th>");
    $("#courseTable").append("<th>主題</th>");
    $("#courseTable").append("</tr>");
    

    var topicCount = topic.length;
    //定義變數確認陣列的長度
    
    var secondUnit = 1000 ;
    var minuteUnit = secondUnit * 60 ;
    var hourUnit = minuteUnit * 60 ;
    var dayUnit = hourUnit * 24 ;
    //將時間單位轉換為毫秒數=統一單位成為數值
    
    for(var x=0;x<topicCount;x++)
    {
            //解決tr包住td寫法 (因append把元素加入故導致 append這行執行完 下一行td在append的時候會在tr外 所以要寫在同一個append內才會tr包住td) 
            $("#courseTable").append("<tr><td>"+(x+1)+"</td><td>"+(new Date((startDate.getTime()+x*7*dayUnit))).toLocaleDateString().slice(5)+"</td><td>"+topic[x]+"</td></tr>") ;
            
            
            // $("#courseTable").append("<td>"+(x+1)+"</td>") ;
            // $("#courseTable").append("<td>"+(new Date((startDate.getTime()+x*7*dayUnit))).toLocaleDateString().slice(5)+"</td>") ;
            // $("#courseTable").append("<td>"+topic[x]+"</td>");
            // $("#courseTable").append("</tr>") ;
        
    }
    
// 此為A版本 css需開啟A版本CSS
    $("tr:odd").addClass("odd") ;
    $("tr:even").addClass("even") ;
// A版本內容結束   
   
    
}/*)*/;