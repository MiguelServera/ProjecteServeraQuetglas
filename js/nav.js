$(function () {
    
    $(".navMenu").click(function (e) { 
        e.preventDefault();
        $("#contenedor").attr('src', $(this).attr('id')+".html");
    });
});