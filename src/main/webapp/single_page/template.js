const documentPageTemplate = (types) => {
    let typeOptions = types.map(type => {
        return `<option value="${type.id}">${type.name} (${type.count})</option>`;
    })

    return (`
        <div class="my-3 shadow-sm bg-white p-3 d-flex align-items-center justify-content-between">
            <h3 class="mb-0">Danh sách tài liệu</h3>
            <a href="#" class="btn btn-primary" id="new-document">Thêm mới</a>
        </div>
        <div class="shadow-sm bg-white p-3">
            <form action="/documents" class="d-flex justify-content-between mb-4" id="document-search">
                <input type="hidden" name="page" id="page">
                <div class="d-flex align-items-center justify-content-between w-50">
                    <input type="text"
                           name="search"
                           class="form-control submit-on-enter"
                           placeholder="Tìm kiếm theo mã, tên, mô tả, enter để tìm"
                    >
                    <select name="typeId" class="form-select ms-3 w-50 submit-on-change">
                        <option value="">Phân Loại</option>
                        ${typeOptions.join("")}
                    </select>
                </div>
                <select name="sort" class="form-select ms-3 w-25 submit-on-change">
                    <option value="" selected="selected">Sắp xếp</option>
                    <option value="name asc">Tên tăng dần</option>
                    <option value="name desc">Tên giảm dần</option>
                    <option value="code asc">Mã tăng dần</option>
                    <option value="code desc">Mã giảm dần</option>
                    <option value="year asc">Năm tăng dần</option>
                    <option value="year desc">Năm giảm dần</option>
                </select>
                
            </form>
            <table class="table table-bordered" >
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Tên</th>
                        <th>Năm</th>
                        <th>Mô tả</th>
                        <th>Phân loại</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="table-document-body">
                </tbody>
            </table>
        </div>

        <div class="d-flex align-items-center justify-content-between mt-3">
            <div>
                <select name="size" form="document-search" class="form-select submit-on-change">
                    <option value="1">1</option>
                    <option value="10" selected="selected">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div class="text-right pagination">
            </div>

        </div>
    `)
}

const documentRowTemplate = (document) => {
    return (`
        <tr>
            <td>${document.code}</td>
            <td>${document.name}</td>
            <td>${document.year}</td>
            <td>${document.description}</td>
            <td>${document?.type?.name ? document.type.name : ""}</td>
            <td>
                <a href="/documents/${document.id}" data-id="${document.id}" class="btn btn-outline-primary edit-document">Sửa</a>
                <a href="/documents/${document.id}" class="btn btn-outline-danger delete-document">Xóa</a>
            </td>
        </tr>
    `)
}

const addLoadingRow = (tableBody) => {
    let columns = tableBody.closest("table").find("thead tr th").length;
    tableBody.html(`
        <tr>
            <td colspan="${columns}" class="text-center">
                <div class="loading d-flex justify-content-center py-5">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </td>
        </tr>
    `)
}

const loadingTemplate = () => {
    return (`
        <div class="loading d-flex justify-content-center py-5">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `)
}

const  paginationTemplate = (totalPages, currentPage) => {
    let pagination = "";
    for(let i = 0; i < totalPages; i++) {
        pagination += `<li class="page-item ${i === currentPage ? "active" : ""}"><a class="page-link" href="#" data-page="${i}">${i + 1}</a></li>`;
    }
    return pagination;
}


const addModal = (title, isShow) => {
    const $modal =  $(`
    <div class="modal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${title}</h5>
          </div>
          <div class="modal-body">
            ${loadingTemplate()}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary m-close" data-bs-dismiss="modal">Hủy</button>
            <button type="button" class="btn btn-primary m-submit">Lưu</button>
          </div>
        </div>
      </div>
    </div>
    `);

    $("body").append($modal);
    const modal = new bootstrap.Modal($modal.get(0));
    $modal.on('hidden.bs.modal', event => {
        $modal.remove();
    })
    $modal.data("modal", modal);
    if(isShow) {
        modal.show();
    }
    return $modal;
}

const newDocumentTemplate = (types) => {
    let typeOptions = types.map(type => {
        return `<option value="${type.id}">${type.name} (${type.count})</option>`;
    })
    return(`
        <div class="row">
            <div class="col-6">
                <div class="mb-3">
                    <label class="form-label">Mã</label>
                    <input type="text" class="form-control" id="code">       
                </div>
                <div class="mb-3">
                    <label class="form-label">Tên</label>
                    <input type="text" class="form-control" id="name">
                </div>
                <div class="mb-3">
                    <label class="form-label">Năm</label>
                    <input type="number" class="form-control" id="year">
                </div>
            </div>
            <div class="col-6">
                <div class="mb-3">
                    <label class="form-label">Phân Loại</label>
                    <select id="type" class="form-select">
                        ${typeOptions.join("")}
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Mô tả</label>
                    <textarea class="form-control" rows="5" id="description"></textarea>
                </div>
            </div>
        </div>
    `)
}

const editDocumentTemplate = (types, document) => {
    let typeOptions = types.map(type => {
        console.log(document)
        console.log(type)
        return `<option ${type.id === document?.type?.id ? "selected" : ""} value="${type.id}">${type.name} (${type.count})</option>`;
    })
    return(`
        <div class="row">
            <input type="hidden" id="id" value="${document.id}">
            <div class="col-6">
                <div class="mb-3">
                    <label class="form-label">Mã</label>
                    <input type="text" class="form-control" id="code" value="${document.code}">       
                </div>
                <div class="mb-3">
                    <label class="form-label">Tên</label>
                    <input type="text" class="form-control" id="name" value="${document.name}">
                </div>
                <div class="mb-3">
                    <label class="form-label">Năm</label>
                    <input type="number" class="form-control" id="year" value="${document.year}">
                </div>
            </div>
            <div class="col-6">
                <div class="mb-3">
                    <label class="form-label">Phân Loại</label>
                    <select id="type" class="form-select">
                        ${typeOptions.join("")}
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Mô tả</label>
                    <textarea class="form-control" rows="5" id="description">${document.description}</textarea>
                </div>
            </div>
        </div>
    `)
}





const typePageTemplate = () => {
    return (`
        <div class="my-3 shadow-sm bg-white p-3 d-flex align-items-center justify-content-between">
            <h3 class="mb-0">Danh sách phân loại</h3>
        </div>
        <div class="shadow-sm bg-white p-3">
            <table class="table table-bordered" >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Số lượng tài liệu</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="table-type-body">
                    <tr>
                        <td colspan="4" class="text-center">
                            <div class="loading d-flex justify-content-center py-5">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `)
}

const typeRowTemplate = (type) => {
    return (`
        <tr>
            <td>${type.id}</td>
            <td>${type.name}</td>
            <td>${type.count}</td>
            <td>
                <a href="/types/${type.id}" data-id="${type.id}" class="btn btn-outline-primary edit-type">Sửa</a>
                <a href="/types/${type.id}" class="btn btn-outline-danger delete-type">Xóa</a>
            </td>
        </tr>
    `)
}


