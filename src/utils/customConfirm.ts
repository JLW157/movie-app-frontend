import Swal from "sweetalert2";

export default function customConfirm(
    onConfirm: any,
    title: string = "Are you sure?",
    confirmButtonText: string = "Delete"
){
    Swal.fire({
        title,
        icon: "warning",
        confirmButtonText,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: '#d33'
    }).then(result => {
        if (result.isConfirmed) {
            onConfirm();
        }
    });
}