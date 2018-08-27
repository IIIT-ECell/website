var $win = $(window),
    $nav = $(document.getElementsByClassName("navbar")[0]),
    $cov = $(document.getElementsByClassName("cover")[0]),
    $jump = $(document.getElementById("jump")),
    $jumpicon = $(document.getElementById("jumpicon")),
    coverPageHeight = $cov.height(),
    headingTopPosition = coverPageHeight / 2,
    // make navbar opaque just before user scrolls past heading
    navBarTransparentPixelLimit = headingTopPosition * 0.4;

function throttle(func, time){
    var timeout, hadCalledInBetween;

    return function(){
        if(!timeout){
            func.apply(this, arguments);

            timeout = setTimeout(function(){
                if(hadCalledInBetween){
                    func.apply(this, arguments);
                    hadCalledInBetween = false;
                }
                timeout = null;
            }, time);
        }else{
            hadCalledInBetween = true;
        }
    };
}

function checkScroll() {
    var transparentClass = "transparent",
        scrollTop = $win.scrollTop();
    
    if(scrollTop > navBarTransparentPixelLimit) {
        $nav.removeClass(transparentClass);
    } else {
        $nav.addClass(transparentClass);
    }

    if(scrollTop > coverPageHeight) {
        $jump.removeClass(transparentClass);
        $jumpicon.removeClass(transparentClass);
    }
    else {
        $jump.addClass(transparentClass);
        $jumpicon.addClass(transparentClass);
    }
}

checkScroll();

// demo for throttle https://jsbin.com/sagiwizuvu/1/edit?output
if($cov.length > 0) {
    $win.on("scroll load resize", throttle(checkScroll, 100));
}

$jump.click(function() {
    $("body, html").animate({
        scrollTop : 0
    }, 500);
});
