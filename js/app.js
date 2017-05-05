$(document).ready(function(){
    click_handlers();
});

function click_handlers(){
    $('#start').click(function(){
        var title=$('#title_page');
        title.css("transform","translateY(-5000px)");
        setTimeout(function(){
            title.hide();
        },1000);

    })
}