$(window).on('load', function () {
    $('body').removeClass('preload');
});

$(function () {
    $('.stamp-label').html(function () {
        var selector = $(this);
        var html = selector.text().split(' ');
        html.forEach(function (d, i) {
            html[i] = d.split('').map(function (d) {
                return '<b>' + d + '</b>';

            }).join('');
        });
        return html.map(function (d) {
            return d.indexOf(',') === -1 ? '<span>' + d + '</span>' : '<span class="comma">' + d + '</span>';
        }).join('');
    });

    var resizeTimer;
    $(window).resize(function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {

            $('.menu-item').each(function () {
                var element = $(this);
                var availableWidth = element.width() - element.find('.fixed').width();

                if (isNaN(availableWidth)) {
                    return;
                }
                availableWidth -= 70;
                var label = element.find('.menu-item-name label');
                label.html(label.html().split('<br>').join(' '));
                if (label.width() > availableWidth) {
                    label.html(fakeWrap(label.html(), label.height(), availableWidth));
                }
            });

            $(".item-slide").each(function () {
                var container = $(this);
                var slider = container.find('ul');
                var lastIndex = slider.find('li').length - 1;
                lastIndex = lastIndex >= 0 ? lastIndex : 0;
                slider.itemslide({one_item: true});
                var left = container.find('.left-caret').click(slider.previous);
                var right = container.find('.right-caret').click(slider.next);
                slider.on('changeActiveIndex', function (e) {
                    container.toggleClass('dirty', true);
                    var i = slider.getActiveIndex();
                    left.toggleClass('available', i > 0);
                    right.toggleClass('available', i < lastIndex);
                });
                
                slider.on('pan', function(){
                    console.log('pan');
                });

            });

        }, resizeTimer === undefined ? 0 : 250);
    }).resize();

    //

    function fakeWrap(text, height, maxWidth) {
        var charWidth = height * 0.7;
        text = text.trim().split('');
        var width = 0, lastSpace = 0;
        text.forEach(function (item, i) {
            width += charWidth;
            if (item === ' ') {
                lastSpace = i;
            }
            if (width > maxWidth && lastSpace) {
                text[lastSpace] = '<br>';
                width = 0;
            }
        });
        return text.join('');
    }

});