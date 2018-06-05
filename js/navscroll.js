let win = $(window);
let nav = $('.navbar');
let cov = $('.cover');
let jump = $('#jump');
let jumpicon = $('#jumpicon');

let shiftY = cov.height() - nav.height();

let scrollHandler = {
  allow: true,
  reallow: function() {
    scrollHandler.allow = true;
  },
  delay: 200
}

function checkScroll() {
  console.log('op');

  if(win.scrollTop() > shiftY) {
    nav.removeClass('transparent');
  }
  else {
    nav.addClass('transparent');
  }

  if(win.scrollTop() > shiftY/2) {
    jump.removeClass('transparent');
    jumpicon.removeClass('transparent');
  }
  else {
    jump.addClass('transparent');
    jumpicon.addClass('transparent');
  }
}

checkScroll();
if(cov.length > 0) {
  win.on("scroll load resize", function(){
    if(scrollHandler.allow) {
      checkScroll();
      scrollHandler.allow = false;
      setTimeout(scrollHandler.reallow, scrollHandler.delay);
    }
  });
}

jump.click(function() { // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0 // Scroll to top of body
    }, 500);
});
