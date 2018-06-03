let win = $(window);
let nav = $('.navbar');
let cov = $('.cover');

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
