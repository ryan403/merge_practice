$(document).ready(function() {
    $("input").click(function()
    {
        //alert("um...");
        //$("H1").text("Hello");
        //$("H1").text($("li:first").text());
        //$("H1").text($("li:last").text());
        //$("H1").text($("li").eq(1).text());
        
        var numberOfListItem=$("#choices li").length;
        var randomChildNumber=Math.floor(Math.random()*numberOfListItem);
        console.log(randomChildNumber)
        $("h1").text($("#choices li").eq(randomChildNumber).text());
    });
});
 