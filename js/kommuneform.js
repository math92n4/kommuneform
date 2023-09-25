
let formKommune = document.getElementById("submit");
document.addEventListener('DOMContentLoaded', createFormEventListener);


function createFormEventListener() {
    formKommune = document.getElementById("formKommune");
    formKommune.addEventListener("submit", handleSubmitForm);
}


async function handleSubmitForm(event) {
    event.preventDefault()
    const form = event.currentTarget;
    const url = form.action;
    console.log(url)
    console.log(form)

    try {
        const formData = new FormData(form);
        console.log(formData)
        const repsonseData = await postFormAsJson(url, formData)
        if (repsonseData.ok) {
            console.log(repsonseData)
            alert("Kommune er blevet gemt")
        }

    } catch (error) {
        alert(error.message)
        console.log(error)
    }
}

async function postFormAsJson(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries())
    plainFormData.region = {}
    plainFormData.region.kode = plainFormData.regionKode
    console.log(plainFormData)
    const jsonObject = JSON.stringify(plainFormData)
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonObject,
    })
    return response
}
