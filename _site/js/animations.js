// START: Animating the text

// END: Animating the text

// START: Animating the "Reach and stats" section

var animatedTextElm = $(document.getElementById("count-1")),
    animatedTextPosition = animatedTextElm.length
        ? animatedTextElm.offset().top
        : Number.MAX_VALUE,
    screenHeight = $(window).height(),
    activationOffset = 0.8, // determines how far up the the page the element needs to be before triggering the function
    activationPoint = animatedTextPosition - screenHeight * activationOffset,
    maxScrollHeight = $(document.body).height() - screenHeight - 5; // -5 for a little bit of buffer

// Does something when user scrolls to it OR
// Does it when user has reached the bottom of the page and hasn't triggered the function yet
$(window).on("scroll", function() {
    var yScrollPos = window.pageYOffset,
        elementInView = yScrollPos > activationPoint,
        hasReachedBottomOfPage =
            maxScrollHeight <= yScrollPos && !elementInView,
        $animatedNumbers = $(".numeric");

    if ((elementInView || hasReachedBottomOfPage) && $animatedNumbers.length) {
        $animatedNumbers.each(function() {
            var $this = $(this),
                countTo = this.getAttribute("count");

            $({ countNum: $this.text() }).animate(
                {
                    countNum: countTo
                },
                {
                    duration: 1000,
                    easing: "linear",
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                }
            );
        });
    }
});

// END: Animating the "Reach and stats" section
