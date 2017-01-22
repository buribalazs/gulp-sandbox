$(window).on('load', function () {
    $('body').removeClass('preload');
});

$(function () {
    $('.stamp-label').html(function () {
        var selector = $(this);
        var html = selector.text().split(' ');
        html.forEach(function(d,i){
            html[i] = d.split('').map(function(d){
                return '<b>' + d + '</b>';

            }).join('');
        });
        return html.map(function(d){
            return d.indexOf(',') === -1 ? '<span>' + d + '</span>' : '<span class="comma">' + d + '</span>';
        }).join('');

    });
});