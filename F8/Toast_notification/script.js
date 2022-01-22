function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fas fa-exclamation-circle",
    };

    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");

        const autoRemoved = setTimeout(() => {
            main.removeChild(toast);
        }, duration + 1000);

        toast.addEventListener("click", (e) => {
            if (e.target.closest(".toast_close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoved);
            }
        });

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${(
            duration / 1000
        ).toFixed(2)}s forwards`;
        toast.innerHTML = `
            <div class="toast_icon ${icons[type]}">
                <i class="fas }"></i>
            </div>
            <div class="toast_body">
                <h3 class="toast_tittle">${title}!</h3>
                <p class="toast_msg">
                    ${message}
                </p>
            </div>
            <div class="toast_close">
                <i class="fas fa-times"></i>
            </div>`;
        main.appendChild(toast);
    }
}

function showSuccessToast() {
    toast({
        title: "Thành công!",
        message: "Thực hiện thành công.",
        type: "success",
        duration: 3000,
    });
}

function showErrorToast() {
    toast({
        title: "Thất bại!",
        message: "Có lỗi xảy ra, vui lòng liên hệ quản trị viên.",
        type: "error",
        duration: 3000,
    });
}
