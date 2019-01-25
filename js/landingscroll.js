(function(){
    "use strict";

    var loadInterval = setInterval(function(){
        if(document && document.readyState === "complete"){
            onload();
            clearInterval(loadInterval);
        }
    }, 100);

    var fixButtonWidthInterval = setInterval(function(){
        var elements = document && document.querySelectorAll(".idea-list div");
        if(elements && elements.length == 4){
            fixButtonsWidth(elements);
            clearInterval(fixButtonWidthInterval);
        }
    }, 100);

    var above766 = true;
    window.addEventListener("resize", handleResize);

    let FULL_PAGE_HEIGHT;

    function onload(){
        FULL_PAGE_HEIGHT = document.querySelector(".full-page").clientHeight;

        var scrollButtons = document.querySelectorAll("[class^=\"cta-\"]");

        for(let i = 0, len = scrollButtons.length; i < len; i++){
            attachHandler(scrollButtons[i]);
        }

        handleResize();
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
        return;
        // need to toggle
        var headerToFix = document.querySelector("header"),
            footerToFix = document.querySelector("footer");
        if(window.innerWidth <= 766 && above766){
            changeFontSizeValue(headerToFix, true);
            changeFontSizeValue(footerToFix, true);
            console.log(headerToFix);
            console.log(footerToFix);
            above766 = false;
        }
        else if(window.innerWidth > 766 && !above766) {
            changeFontSizeValue(headerToFix, false);
            changeFontSizeValue(footerToFix, false);
            above766 = true;
        }
    }

    function changeFontSizeValue(root, shouldDouble){
        var childs = root.children, f = shouldDouble ? 2 : 0.5;

        for(let i = 0, len = childs.length; i < len; i++){
            childs[i].style.fontSize = (+window.getComputedStyle(childs[i]).fontSize.replace(/\D/g, "")) * f + "px";
            changeFontSizeValue(childs[i], shouldDouble);
        }
    }
})();
