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
            "thumb_url": "tps://imgsapp2.correiobraziliense.com.br/app/noticia_127983242361/2019/10/04/794834/20191004154953157610i.jpg"
        },
        "insurance_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 5567.2
    },
     {
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
            "name": "Fernando Raposoooooooo",
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

const init = () => {
    renderGuides(data.guides);
    renderSelect();
};

const renderGuides = (data) => {
    let table = '';
       
    data.forEach(guide => {
        const imagePatient = guide.patient.thumb_url;
        console.log(guide)

        let convenioApagada = "";
        let tracejado= "";

        if (guide.health_insurance.is_deleted === true) {
            convenioApagada = "Convênio Apagado";
            tracejado = 'item_apagado'

        }

        const dinheiroBrasil = guide.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });
        
        table += `
                    <tr>
                        <td>${new Date(guide.start_date).toLocaleDateString('pt-BR')}</td>
                        <td>${guide.number}</td>
                        <td class="elipsis"><img class="roudend" src= "${imagePatient}"></img>${guide.patient.name}</td>
                        <td class="${tracejado}" title="${convenioApagada}">${guide.health_insurance.name}</td>
                        <td>${dinheiroBrasil}</td>
                    </tr>
                 `
    });

    if (!data.length) {
        table += `
            <tr>
                <td colspan="5" style="text-align: center;">Nenhuma guia encontrada</td>
            </tr>
        `
    }

    console.log(document.getElementById("guidesBody"), 'document.getElementById("guidesBody")');
    document.getElementById("guidesBody").innerHTML = table;
}; 

const renderSelect = () => {
    let selectOpcao = '<option value="">Selecionar Convênio</option>';
        
    data.insurances.forEach(insurance => {
        selectOpcao += `<option value="${insurance.id}">${insurance.name}</option>`;
        console.log(insurance)
        const insuranceSelect = document.getElementById("insuranceSelect").innerHTML = selectOpcao;
    });
};

 const filterTab = () => {
    let valueInsurance = ~~document.getElementById("insuranceSelect").value;
    console.log(valueInsurance)
    let valueInput = document.getElementById("searchInput").value;
    console.log(valueInput)
    const normalizeInput = 
    valueInput && 
    valueInput.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    const filterGuides = data.guides.filter(guide => {
        let valido = true;
        const namePacientFormated = guide.patient.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "");
    

        if (valueInsurance && valueInsurance !== guide.insurance_id) {
            valido = false;
        }

        if (normalizeInput && !namePacientFormated.includes(normalizeInput) && !guide.number.includes(normalizeInput))  {
            valido = false;
        }

        return valido;
    });

    renderGuides(filterGuides);
 }
init();
