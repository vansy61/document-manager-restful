$("#type-page").click(function(e) {
    e.preventDefault();
    showTypePage();
})


const showTypePage = async () => {
    let types = await getTypes();
    let template = typePageTemplate(types);

    $("#main-content").html(template);


    // bind new document event
    $("#new-document").click(function(e) {
        e.preventDefault();
        showNewDocument();
    })
}