var loadInterval = setInterval(function(){
    if(document && document.readyState === "complete"){
        onload();
        clearInterval(loadInterval);
    }
});

let FULL_PAGE_HEIGHT;

function onload(){
    FULL_PAGE_HEIGHT = document.querySelector(".full-page").clientHeight;

    var scrollButtons = document.querySelectorAll("[class^=\"cta-\"]");

    for(let i = 0, len = scrollButtons.length; i < len; i++){
        attachHandler(scrollButtons[i]);
    }
}

function attachHandler(ctaButton){
    var nextFullPage = ctaButton.parentNode.parentNode.nextElementSibling;
    if(!nextFullPage) return;

    ctaButton.addEventListener("click", function(event){
        console.log("Moving to " + nextFullPage.tagName + " " + nextFullPage.className);
        nextFullPage.scrollIntoView({behavior: "smooth"});
    });
}
