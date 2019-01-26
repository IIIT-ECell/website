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
                    "https://docs.google.com/forms/d/e/1FAIpQLSd6VeW-D_S4Tj8nME0IiAs3G4UP3aDMzsUQE9XB2nDQSp2wzA/viewform?usp=sf_link";
        });
    }

    function attachHandler(ctaButton){
        var nextFullPage = ctaButton.parentNode.parentNode.nextElementSibling;
        if(!nextFullPage) return;

        ctaButton.addEventListener("click", function(event){
            nextFullPage.scrollIntoView({behavior: "smooth"});
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
            changeFontSizeValue(headerToFix, true);
            changeFontSizeValue(footerToFix, true);
            above766 = false;
        }
        else if(window.innerWidth > 766 && !above766) {
            changeFontSizeValue(headerToFix, false);
            changeFontSizeValue(footerToFix, false);
            above766 = true;
            SHOULD_REDIRECT = false;
        }
        findButtonsAndFixWidth();
    }

    function changeFontSizeValue(root, shouldDouble){
        var childs = root.children, f = shouldDouble ? 2 : 0.5;

        for(let i = 0, len = childs.length; i < len; i++){
            changeFontSizeValue(childs[i], shouldDouble);
            if(childs[i].style.fontSize) {
                childs[i].style.fontSize = "";
            } else {
                var currentSize = parseInt(window.getComputedStyle(childs[i], null).getPropertyValue("font-size"));
                var newSize = currentSize * f;
                childs[i].style.fontSize = newSize + 'px';
            }
        }
    }
})();
