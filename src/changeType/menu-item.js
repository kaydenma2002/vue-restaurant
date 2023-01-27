import Swal from "sweetalert2";
export async function editContent(type) {
    const { value: formValues } = await Swal.fire({
        title: 'Multiple inputs',
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Name">
          <input id="swal-input2" class="swal2-input" placeholder="description">
          <input id="swal-input3" class="swal2-input" placeholder="Price">
          `,
        focusConfirm: false,
        preConfirm: () => {
            return {
                name: document.getElementById('swal-input1').value,
                description: document.getElementById('swal-input2').value,
                price: document.getElementById('swal-input3').value
            }
        }
    })
    if (formValues) {
        type.name = formValues.name
        type.description = formValues.description
        type.price = formValues.price

    }

}
