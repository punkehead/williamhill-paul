$(function () {
    function init () {
        $(window).scroll(function () {
            var scroll = $(this).scrollTop();
            if (scroll > 390) { 
                $('#secondary_navigation').addClass('fixed');
            } else {
                $('#secondary_navigation').removeClass('fixed');
            }
        });

        $(document).on("tap click", "body", function(e){
            if ($(e.target).is(".navbtn, .navbtn img")) {
                $("#navigation").slideToggle();
            } else {
                $("#navigation").slideUp();
            }
        });           
    }
    return init();
});    

