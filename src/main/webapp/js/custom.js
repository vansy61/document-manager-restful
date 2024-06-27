$(function() {
    $(".btn-destroy").click(function(e) {
        if(!confirm("Bạn thực sự muốn xóa?")) {
            e.preventDefault();
        }
    })

    $(".submit-on-enter").keypress(function(e) {
        if(e.which === 13) {
            this.form.submit();
        }
    })

    $(".submit-on-change").change(function(e) {
        this.form.submit();
    })


    $("#document-form").submit(function(e) {
        $(".invalid-feedback").remove();
        $(".is-invalid").removeClass("is-invalid");
        let status = true;

        let code = $("#code");
        if(!code.val() || code.val().length < 3 || code.val().length > 10) {
            code.addClass("is-invalid");
            code.after("<div class='invalid-feedback'>Vui lòng nhập mã (> 3 ký tự và < 10 ký tự)</div>");
            status = false;
        }

        let name = $("#name");
        if(!name.val()) {
            name.addClass("is-invalid");
            name.after("<div class='invalid-feedback'>Vui lòng nhập tên</div>");
            status = false;
        }

        let year = $("#year");
        // check year is number like YYYY and minimum 1900 max current year
        if(!year.val() || isNaN(year.val()) || year.val() < 1900 || year.val() > new Date().getFullYear()) {
            year.addClass("is-invalid");
            year.after("<div class='invalid-feedback'>Vui lòng nhập năm hợp lệ (> 1990 và k lớn hơn năm hiện tại)</div>");
            status = false;
        }

        let description = $("#description");
        if(!description.val()) {
            description.addClass("is-invalid");
            description.after("<div class='invalid-feedback'>Vui lòng nhập mô tả</div>");
            status = false;
        }

        if(!status) {
            e.preventDefault();
        }
    })
})