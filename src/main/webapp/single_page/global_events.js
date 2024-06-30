$(document).on("keypress",".submit-on-enter",function(e) {
    if(e.which === 13) {
        $(this.form).submit();
    }
})

$(document).on("change", ".submit-on-change", function(e) {
    $(this.form).submit();
})

