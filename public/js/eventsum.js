function selectElementContents(el) {

    var range = document.createRange();
    range.selectNodeContents(el);

    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

}

var editableContent = document.querySelectorAll('.editable')

editableContent.forEach(function(val,index) {

    editableContent[index].onfocus = function() {

        selectElementContents(editableContent[index]);

    };

});


function indicateHowToEdit() {

    Materialize.toast('Type to edit', 2000)

}

$('.editable').each(function(index) {

    $(this).on('focus', function () {

        indicateHowToEdit();

    });

});
