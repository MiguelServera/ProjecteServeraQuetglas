$(function () {
    
    $(".navMenu").click(function (e) { 
        e.preventDefault();
        console.log('http://localhost/ProjecteServeraQuetglas/'+$(this).attr('id')+".html");
        $("#contenedor").attr('src', $(this).attr('id')+".html");
    });
});