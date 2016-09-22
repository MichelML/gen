function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

var editableContent = document.querySelectorAll('.editable')

editableContent.forEach(function(val,index) {
    editableContent[index].onfocus = function() {
        selectElementContents(editableContent[index]);
    };
});
