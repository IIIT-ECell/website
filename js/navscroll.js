var $win = $(window),
    // native DOM-specific lookups are faster than jQuery selector lookups
    $nav = $(document.getElementsByClassName("navbar")[0]),
    $cov = $(document.getElementsByClassName("cover")[0]),
    $jump = $(document.getElementById("jump")),
    $jumpicon = $(document.getElementById("jumpicon")),
    $banner = $(document.getElementById("banner")),
    coverPageHeight = $cov.height(),
    headingTopPosition = coverPageHeight / 2,
    // make navbar opaque just before user scrolls past heading
    navBarTransparentPixelLimit = headingTopPosition * 0.3,
    transparentNavbarClass = "transparent";

function throttle(func, time) {
    var timeout, hadCalledInBetween;

    return function() {
        if (!timeout) {
            func.apply(this, arguments);

            timeout = setTimeout(function() {
                if (hadCalledInBetween) {
                    func.apply(this, arguments);
                    hadCalledInBetween = false;
                }
                timeout = null;
            }, time);
        } else {
            hadCalledInBetween = true;
        }
    };
}

function checkScroll() {
    var hiddenClass = "hiddenJumpIcon",
        scrollTop = $win.scrollTop();

    if (scrollTop > navBarTransparentPixelLimit) {
        $nav.removeClass(transparentNavbarClass);
        $banner.removeClass("transparent-banner");
        $banner.addClass("paint-banner");
    } else {
        $nav.addClass(transparentNavbarClass);
        $banner.removeClass("paint-banner");
        $banner.addClass("transparent-banner");
    }

    if (scrollTop > coverPageHeight) {
        $jump.removeClass(hiddenClass);
        $jumpicon.removeClass(hiddenClass);
    } else {
        $jump.addClass(hiddenClass);
        $jumpicon.addClass(hiddenClass);
    }
}

// demo for throttle https://jsbin.com/sagiwizuvu/1/edit?output
if ($cov.length > 0) {
    checkScroll();
    $win.on("scroll load resize", throttle(checkScroll, 100));
} else {
    // make navbar permanently opaque on non-Home pages
    $nav.removeClass(transparentNavbarClass);
}

$jump.click(function() {
    $("body, html").animate(
        {
            scrollTop: 0
        },
        500
    );
});

