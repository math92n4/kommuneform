import {fetchAnyUrl, restDelete} from "./modulejson.js";

const urlGetKommuner = "http://localhost:8080/kommuner"
const urlDeleteKommune = "http://localhost:8080/deletekommune"
const pbGetKommuner = document.getElementById("pbGetKommuner")
const tblKommuner = document.getElementById("tblKommuner")
let kommuner = []


async function fetchKommuner() {
    const colhead = document.getElementById("colhead")
    tblKommuner.innerHTML = ""
    tblKommuner.appendChild(colhead)
    kommuner = await fetchAnyUrl(urlGetKommuner)
    sortArray(kommuner)
    kommuner.forEach(createTable)
}

function sortArray(kommuner) {
    return kommuner.sort((kom1, kom2) => {
        if (kom1.region.kode > kom2.region.kode)  {
            return 1
        }
        else if (kom2.region.kode > kom1.region.kode) {
            return -1
        }
        else if (kom1.navn > kom2.navn) {
            return 1
        }
        else
            return -1
    })
}

function actionGetKommuner() {
    return fetchKommuner()
}


function createTable(kommune) {
    let cellCount = 0
    let rowCount = tblKommuner.rows.length
    let row = tblKommuner.insertRow(rowCount)
    let cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.kode
    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.navn
    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.href
    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.region.kode
    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.region.navn

    cell = row.insertCell(cellCount++)
    let img = document.createElement("img")
    img.setAttribute("src", kommune.hrefPicture)
    img.setAttribute("alt", "Picture")
    img.setAttribute("width", 150)
    img.setAttribute("height", 150)
    cell.appendChild(img)

    cell = row.insertCell(cellCount++)
    const dropdown = document.createElement('select');
    const option = document.createElement("option")
    option.textContent = kommune.region.navn
    cell.append(dropdown)
    dropdown.appendChild(option)

    row.id = kommune.navn
    const pbDelete = document.createElement("input")
    pbDelete.type = "button"
    pbDelete.setAttribute("value", "Slet kommune")
    pbDelete.className = "btn1"
    pbDelete.onclick = function() {
        document.getElementById(kommune.navn).remove();
        deleteKommune(kommune)
    }
    row.appendChild(pbDelete)
}

async function deleteKommune(kommune) {
    try {
        const url = urlDeleteKommune + "/" + kommune.kode
        console.log(url)
        const resp = await restDelete(url, kommune)
        console.log(resp)
        const body = await resp.text();
        alert(body)
    } catch (error) {
        alert(error.message);
        console.log(error);
    }
}



pbGetKommuner.addEventListener("click", actionGetKommuner)