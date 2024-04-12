const data = {
    "insurances": [{
        "id": 3322,
        "name": "Amil"
    }, {
        "id": 3293,
        "name": "Bradesco"
    }, {
        "id": 99231,
        "name": "Hapvida"
    }, {
        "id": 1322,
        "name": "CASSI"
    }, {
        "id": 23111,
        "name": "Sulamérica"
    }],
    "guides": [{
        "number": "3210998321",
        "start_date": "2023-12-23T19:18:47.210Z",
        "patient": {
            "id": 9321123,
            "name": "Augusto Ferreira",
            "thumb_url": "https://imgsapp2.correiobraziliense.com.br/app/noticia_127983242361/2019/10/04/794834/20191004154953157610i.jpg"
        },
        "insurance_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 5567.2
    }, {
        "number": "287312832",
        "start_date": "2022-11-23T19:18:47.210Z",
        "patient": {
            "id": 93229123,
            "name": "Caio Carneiro",
            "thumb_url": "http://3.bp.blogspot.com/-XG5bGlqGnJw/T9lIcssnybI/AAAAAAAADTA/B23ezXOkx8Y/s1600/Aang.jpg"
        },
        "insurance_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 213.3
    }, {
        "number": "283718273",
        "start_date": "2023-10-22T19:18:47.210Z",
        "patient": {
            "id": 213122388,
            "name": "Luciano José",
            "thumb_url": "https://i.ytimg.com/vi/yUXd-enstO8/maxresdefault.jpg"
        },
        "insurance_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 88.99
    }, {
        "number": "009090321938",
        "start_date": "2023-09-20T19:18:47.210Z",
        "patient": {
            "id": 3367263,
            "name": "Felício Santos",
            "thumb_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSxlYabmRlKk43uvsBMIqjA7Rw_YCwK4TyA&usqp=CAU"
        },
        "insurance_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 828.99
    }, {
        "number": "8787128731",
        "start_date": "2023-08-01T19:18:47.210Z",
        "patient": {
            "id": 777882,
            "name": "Fernando Raposo",
            "thumb_url": "https://via.placeholder.com/150x150.jpg"
        },
        "insurance_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 772
    }, {
        "number": "12929321",
        "start_date": "2023-07-02T19:18:47.210Z",
        "patient": {
            "id": 221,
            "name": "Paciente com nome grante pra colocar text ellipsis testando nome com paciente grande"
        },
        "insurance_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 221
    }]
   
};

const guidesBody = document.getElementById("guidesBody"); 
const insuranceSelect = document.getElementById("insuranceSelect");
const searchInput = document.getElementById("searchInput");
const guidesPerPage = 6;
let currentPage = 1;

function displayGuides() {
    guidesBody.innerHTML = ""; /* restart tbl*/
    const selectedInsuranceId = insuranceSelect.value; 
    const searchText = searchInput.value.toLowerCase();
                            /* array para os que passaram no teste*/
    let filteredGuides = data.guides.filter(guide => 
        (selectedInsuranceId === "" || guide.insurance_id.toString() === selectedInsuranceId) && /* tratamento de error */
        (searchText === "" || guide.number.includes(searchText) || guide.patient.name.toLowerCase().includes(searchText)) /*comparação e true*/
    );

    const startIndex = (currentPage - 1) * guidesPerPage;
    const endIndex = startIndex + guidesPerPage;
    const paginatedGuides = filteredGuides.slice(startIndex, endIndex); /*recorta uma string e cria uma nova*/

    paginatedGuides.forEach((guide, index) => { /* tbl start */
        const guideStartDate = new Date(guide.start_date); /* pegando a data do guide e jogando na nova constante */
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${guideStartDate.toLocaleDateString()}</td>
            <td>${guide.number}</td>
            <td class="patient-name ${index === paginatedGuides.length - 1 ? 'last-patient-name' : ''}"> 
                <img src="${guide.patient.thumb_url || 'https://via.placeholder.com/150x150.jpg'}" alt="${guide.patient.name}">
                ${guide.patient.name}
            </td>
            <td ${guide.health_insurance.is_deleted ? 'class="deleted-insurance"' : ''}>${guide.health_insurance.name}</td> 
            <td>${guide.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        `;
        guidesBody.appendChild(tr); /* filho */
    });

    if (paginatedGuides.length === 0) {
        const tr = document.createElement("tr"); 
        tr.innerHTML = `<td colspan="5" style="text-align: center;">Nenhuma guia encontrada</td>`;
        guidesBody.appendChild(tr);
    }

}

insuranceSelect.addEventListener("change", displayGuides);
searchInput.addEventListener("input", displayGuides);

displayGuides();
