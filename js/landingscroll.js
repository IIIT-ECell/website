(function(){
    "use strict";

    var loadInterval = setInterval(function(){
        if(document && document.readyState === "complete"){
            onload();
            clearInterval(loadInterval);
        }
    }, 100);

    var fixButtonWidthInterval = setInterval(findButtonsAndFixWidth, 100);
    function findButtonsAndFixWidth(){
        var elements = document && document.querySelectorAll(".idea-list div");
        if(elements && elements.length == 4){
            fixButtonsWidth(elements);
            clearInterval(fixButtonWidthInterval);
        }
    }
    var above766 = true;
    window.addEventListener("resize", handleResize);

    let FULL_PAGE_HEIGHT;
    var SHOULD_REDIRECT;

    function onload(){
        FULL_PAGE_HEIGHT = document.querySelector(".full-page").clientHeight;
        SHOULD_REDIRECT = window.innerWidth <= 766;

        var scrollButtons = document.querySelectorAll("[class^=\"cta-\"]");

        for(let i = 0, len = scrollButtons.length; i < len; i++){
            attachHandler(scrollButtons[i]);
        }

        handleResize();
        var formApplicationButton = document.querySelector(".cta-3");
        formApplicationButton.addEventListener('click', function() {
            if(SHOULD_REDIRECT)
                window.location.href =
                    "https://goo.gl/forms/UkIl0vywOBVzrALg2";
        });
    }

    function attachHandler(ctaButton){
        var nextFullPage = ctaButton.parentNode.parentNode.nextElementSibling;
        if(!nextFullPage) return;


        ctaButton.addEventListener("click", function(event){
            smoothScroll(nextFullPage)
        });
    }

    function fixButtonsWidth(elements){
        for(let i = 0, len = elements.length; i < len; i++){
            let height = window.getComputedStyle(elements[i], ":after").height;
            document.styleSheets[0].addRule('.idea-list div:nth-child(' + (i + 1) + ')::after', 'width: ' + height + ';');
        }
    }

    function handleResize(){
        // need to toggle
        var headerToFix = document.querySelector("header"),
            footerToFix = document.querySelector("footer");
        if(window.innerWidth <= 766 && above766){
            SHOULD_REDIRECT = true;
            changeFontSizeValue(headerToFix, 2);
            changeFontSizeValue(footerToFix, 1.75);
            above766 = false;
        }
        else if(window.innerWidth > 766 && !above766) {
            changeFontSizeValue(headerToFix, 1 / 2);
            changeFontSizeValue(footerToFix, 1 / 1.75);
            above766 = true;
            SHOULD_REDIRECT = false;
        }
        findButtonsAndFixWidth();
    }

    function changeFontSizeValue(root, f){
        var childs = root.children;

        for(let i = 0, len = childs.length; i < len; i++){
            changeFontSizeValue(childs[i], f);
            if(childs[i].style.fontSize) {
                childs[i].style.fontSize = "";
            } else {
                var currentSize = parseInt(window.getComputedStyle(childs[i], null).getPropertyValue("font-size"));
                var newSize = currentSize * f;
                childs[i].style.fontSize = newSize + 'px';
            }
        }
    }

    // from SO: https://stackoverflow.com/questions/18071046/smooth-scroll-to-specific-div-on-click
    function smoothScroll(target) {
        var MIN_PIXELS_PER_STEP = 16;
        var MAX_SCROLL_STEPS = 30;
        var scrollContainer = target;
        do {
            scrollContainer = scrollContainer.parentNode;
            if (!scrollContainer) return;
            scrollContainer.scrollTop += 1;
        } while (scrollContainer.scrollTop == 0);

        var targetY = 0;
        do {
            if (target == scrollContainer) break;
            targetY += target.offsetTop;
        } while (target = target.offsetParent);

        var pixelsPerStep = Math.max(MIN_PIXELS_PER_STEP,
            (targetY - scrollContainer.scrollTop) / MAX_SCROLL_STEPS);

        var stepFunc = function() {
            scrollContainer.scrollTop =
                Math.min(targetY, pixelsPerStep + scrollContainer.scrollTop);

            if (scrollContainer.scrollTop >= targetY) {
                return;
            }

            window.requestAnimationFrame(stepFunc);
        };

        window.requestAnimationFrame(stepFunc);
    }
})();
