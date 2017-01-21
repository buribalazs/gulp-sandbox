$(window).on('load', function () {
    $('body').removeClass('preload');
});

$(function () {
    $('.stamp-header').html(function () {
        var selector = $(this);
        var html = selector.text().split(' ');
        html.forEach(function(d,i){
            html[i] = d.split('').map(function(d){
                return '<b>' + d + '</b>';

            }).join('');
        });
        return html.map(function(d){
            return '<span>' + d + '</span>';
        }).join('');

    });
});