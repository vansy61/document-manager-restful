const BASE_API_URL = "http://localhost:8080/api/";

const showDocumentPage = async () => {
    let types = await getTypes();
    let template = documentPageTemplate(types);
    $("#main-content").html(template);

    // Bind search document form and first load documents
    $("#document-search").submit(function(e) {
        e.preventDefault();
        renderDocumentsWithSearchForm();
    }).submit();

    // Bind new document event
    $("#new-document").click(function(e) {
        e.preventDefault();
        showNewDocument();
    });
}

const showNewDocument = async () => {
    const $modal = addModal("Thêm mới tài liệu", true);

    // sống chậm lại ....
    await sleep(1500);
    // -----------------------

    let types = await getTypes();
    let template = newDocumentTemplate(types);
    $modal.find(".modal-body").html(template);

    // Bind submit button
    $modal.find(".m-submit").click(function(e) {
        e.preventDefault();
        submitNewDocument($modal);
    });
}

const validateDocument = () => {
    $(".invalid-feedback").remove();
    $(".is-invalid").removeClass("is-invalid");
    let status = true;

    const validateField = (field, condition, message) => {
        if (condition) {
            field.addClass("is-invalid");
            field.after(`<div class='invalid-feedback'>${message}</div>`);
            status = false;
        }
    };

    validateField($("#code"), !$("#code").val() || $("#code").val().length < 3 || $("#code").val().length > 10, "Vui lòng nhập mã (> 3 ký tự và < 10 ký tự)");
    validateField($("#name"), !$("#name").val(), "Vui lòng nhập tên");
    validateField($("#year"), !$("#year").val() || isNaN($("#year").val()) || $("#year").val() < 1900 || $("#year").val() > new Date().getFullYear(), "Vui lòng nhập năm hợp lệ (> 1990 và k lớn hơn năm hiện tại)");
    validateField($("#description"), !$("#description").val(), "Vui lòng nhập mô tả");

    return status;
}

const submitNewDocument = async ($modal) => {
    if (!validateDocument()) {
        return;
    }

    $modal.find(".m-submit").prop("disabled", true);

    let data = {
        code: $modal.find("#code").val(),
        name: $modal.find("#name").val(),
        year: $modal.find("#year").val(),
        type: { id: $modal.find("#type").val() },
        description: $modal.find("#description").val()
    };

    try {
        await postDocument(data);
        $modal.data().modal.hide();
        showAlert("Thành công", "success", "Thêm mới thành công");
        renderDocumentsWithSearchForm();
    } catch (error) {
        $modal.find(".m-submit").prop("disabled", false);
        showAlert("Lỗi", "error", error.message);
    }
}

const renderDocumentsWithSearchForm = async () => {
    let formData = $('#document-search').serialize();
    let tableBody = $("#table-document-body");
    addLoadingRow(tableBody);

    // sống chậm lại ....
    await sleep(1500);
    // -----------------------

    const documents = await getDocuments(formData);
    tableBody.empty();

    if (documents.content.length === 0) {
        tableBody.append(`<tr><td colspan="6" class="text-center">Không có kết quả nào</td></tr>`);
        return;
    }

    documents.content.forEach(document => {
        tableBody.append(documentRowTemplate(document));
    });

    let pagination = paginationTemplate(documents.totalPages, documents.number);
    $(".pagination").html(pagination);
    $(".pagination a").click(function(e) {
        e.preventDefault();
        $("#page").val($(this).attr("data-page"));
        renderDocumentsWithSearchForm();
    });
    $("#page").val(0);

    // Bind delete document event
    $(".delete-document").click(function(e) {
        e.preventDefault();
        if (confirm("Bạn thực sự muốn xóa?")) {
            deleteDocument($(this));
        }
    });

    // Bind edit document event
    $(".edit-document").click(function(e) {
        e.preventDefault();
        showEditDocument($(this));
    });
}

const showEditDocument = async (target) => {
    let $modal = addModal("Sửa tài liệu", true);
    let documentId = target.attr("data-id");

    // sống chậm lại ....
    await sleep(1500);
    // -----------------------

    const [types, document] = await Promise.all([getTypes(), getDocument(documentId)]);

    let template = editDocumentTemplate(types, document);
    $modal.find(".modal-body").html(template);

    // Bind submit button
    $modal.find(".m-submit").click(function(e) {
        e.preventDefault();
        submitEditDocument($modal);
    });
}

const submitEditDocument = async ($modal) => {
    if (!validateDocument()) {
        return;
    }

    $modal.find(".m-submit").prop("disabled", true);

    let data = {
        id: $modal.find("#id").val(),
        code: $modal.find("#code").val(),
        name: $modal.find("#name").val(),
        year: $modal.find("#year").val(),
        type: { id: $modal.find("#type").val() },
        description: $modal.find("#description").val()
    };

    try {
        await updateDocument(data);
        $modal.data().modal.hide();
        showAlert("Thành công", "success", "Cập nhật thành công");
        renderDocumentsWithSearchForm();
    } catch (error) {
        $modal.find(".m-submit").prop("disabled", false);
        showAlert("Lỗi", "error", error.message);
    }
}

const deleteDocument = async (target) => {
    try {
        await deleteDocumentById(target.attr("href"));
        target.closest("tr").fadeOut("slow", function() {
            $(this).remove();
            showAlert("Xóa thành công", "success");
        });
    } catch (error) {
        console.log(error);
        showAlert("Lỗi", "error", "Không thể xóa tài liệu");
    }
}

const getDocument = (id) => {
    return $.ajax({
        url: BASE_API_URL + "documents/" + id,
        type: "GET"
    });
}

const getDocuments = (search) => {
    return $.ajax({
        url: BASE_API_URL + "documents?" + search,
        type: "GET"
    });
}

const getTypes = () => {
    return $.ajax({
        url: BASE_API_URL + "types",
        type: "GET"
    });
}

const postDocument = (data) => {
    return $.ajax({
        url: BASE_API_URL + "documents",
        type: "POST",
        data: JSON.stringify(data)
    });
}

const updateDocument = (data) => {
    return $.ajax({
        url: BASE_API_URL + "documents/" + data.id,
        type: "PUT",
        data: JSON.stringify(data)
    });
}

const deleteDocumentById = (url) => {
    return $.ajax({
        url: BASE_API_URL + url,
        type: "DELETE"
    });
}


$("#document-page").click(function(e) {
    e.preventDefault();
    showDocumentPage();
});

// start
showDocumentPage();
