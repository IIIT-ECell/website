/* manually slice out the first 250 characters to retain
    complete words in the post content
*/
window.manualSlice = function() {
    var postContentElements = document.getElementsByClassName("post-content"),
        minSubstringLength = 250;

    if (!postContentElements) return;
    clearInterval(window.manualSliceInterval);

    Array.prototype.forEach.call(postContentElements, function(postContentElm) {
        var allWords = postContentElm.innerHTML.split(/ /g),
            substringedPost = "",
            word;

        for (var i = 0, len = allWords.length; i < len; i++) {
            word = allWords[i];
            if (substringedPost.length > minSubstringLength) break;

            substringedPost += word + " ";
        }

        postContentElm.innerHTML = substringedPost.replace(/ $/, "") + "...";
    });
};
