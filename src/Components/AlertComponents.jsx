import Swal from 'sweetalert2';
import 'animate.css';

export default function AlertComponents(iconStatus, msg) {
    const Toast = Swal.mixin({
        customClass: 'custom-toast',
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: iconStatus,
        title: msg,
        showClass: {
            popup: `
                animate__animated
                animate__fadeInDown
                animate__faster
            `
            },
        hideClass: {
            popup: `
                animate__animated
                animate__fadeOutUp
                animate__faster
            `
        }
    });
}