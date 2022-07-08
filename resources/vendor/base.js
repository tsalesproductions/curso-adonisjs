function seActiveNavItem(){
    let pageActual = document.querySelector(`.navbar_curso a[href='${location.pathname}']`);
    if(pageActual){
        $(pageActual).closest("li").addClass("active");
    }
}

$(document).ready(function(){
    $('[data-toggle="offcanvas"]').click(function(){
        $("#navigation").toggleClass("hidden-xs");
    });

    seActiveNavItem();
 });
 
 
 