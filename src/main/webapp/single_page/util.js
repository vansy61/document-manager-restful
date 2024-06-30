const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const showAlert = (message, type, text) => {
    Swal.fire({
        icon: type,
        title: message,
        text: text
    });
}