$(window).on('load', function () {
    $('body').removeClass('preload');
});

$(function () {
    $('.stamp-header').html(function () {
        console.log($(this).text());
    });
});