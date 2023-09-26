async function postObjectAsJson(url, object, httpVerb) {
    const objAsJsonString = JSON.stringify(object)
    const fetchOptions = {
        method: httpVerb,
        headers: {
            "Content-Type": "application/json",
        },
        body: objAsJsonString
    }
    const response = await fetch(url, fetchOptions)
    return response
}

async function restDelete(url, object) {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: object
    }
    const response = await fetch(url, fetchOptions)
    return response
}

function fetchAnyUrl(url) {
    return fetch(url).then(response => response.json())
}



export {fetchAnyUrl, postObjectAsJson, restDelete}