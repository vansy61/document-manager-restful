$("#type-page").click(function(e) {
    e.preventDefault();
    showTypePage();
})


const showTypePage = async () => {
    let template = typePageTemplate();
    $("#main-content").html(template);

    // sống chậm lại ....
    await sleep(500);
    // -----------------------

    let tableBody = $("#table-type-body");
    let types = await getTypes();
    tableBody.empty();

    if (types.length === 0) {
        tableBody.append(`<tr><td colspan="4" class="text-center">Không có kết quả nào</td></tr>`);
        return;
    }
    types.forEach(type => {
        console.log(type)

        tableBody.append(typeRowTemplate(type));
    });



}