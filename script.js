$(document).ready(function() {
    $('.navlink').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            $('section').removeClass('active')
            $('li').removeClass('selected')
            $(this.hash).addClass('active')
            $(this).children().addClass('selected')
        }
    });
});