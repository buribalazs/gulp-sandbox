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

    var windowWidth = -1000, windowHeight = -1000, WINDOW = $(window), RESIZE_TRESHOLD = 70;
    WINDOW.resize(function () {
        if (Math.abs(WINDOW.width() - windowWidth) < RESIZE_TRESHOLD && Math.abs(WINDOW.height() - windowHeight) < RESIZE_TRESHOLD) {
            return;
        }
        windowWidth = WINDOW.width();
        windowHeight = WINDOW.height();

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
            var sliderReload = slider.data('reload');
            if (sliderReload) {
                sliderReload();
                return;
            }

            var lastIndex = slider.find('li').length - 1;
            lastIndex = lastIndex >= 0 ? lastIndex : 0;
            slider.itemslide(
                {
                    one_item: true,
                    disable_clicktoslide: true
                }
            );

            slider.data('reload', slider.reload);

            var left = container.find('.left-caret').click(slider.previous);
            var right = container.find('.right-caret').click(slider.next);
            slider.on('changeActiveIndex', function (e) {
                container.toggleClass('dirty', true);
                var i = slider.getActiveIndex();
                left.toggleClass('available', i > 0);
                right.toggleClass('available', i < lastIndex);
            });
        });

        $('.full-bg').height(windowHeight);
        $('.large').height(windowHeight * 0.9);

    }).resize();
    
    $('.map-cover').bind('mousewheel', function (e) {
        console.log('asd');
    });

    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                var delta = Math.abs(target.offset().top - ($('html').scrollTop() || $('body').scrollTop())) * 0.2;
                toggleMenu(false);
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 500 + delta);
                return false;
            }
        }
    });
    
    var nav = $('.se-nav'), menuOpen = false;
    $('.se-nav .nav-icon').click(function () {
        toggleMenu();
    });

    function toggleMenu(open){
        if (open === undefined){
            menuOpen = !menuOpen;
        }else{
            menuOpen = open;
        }
        nav.toggleClass('nav-open', open);
    }

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