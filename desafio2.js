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
            "name": "Augusto Ferreira"
        },
        "insurance_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI"
        },
        "price": 5567.2
    },
     {
        "number": "287312832",
        "start_date": "2022-11-23T19:18:47.210Z",
        "patient": {
            "id": 93229123,
            "name": "Caio Carneiro"
        },
        "insurance_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI"
        },
        "price": 213.3
    }, {
        "number": "283718273",
        "start_date": "2023-10-22T19:18:47.210Z",
        "patient": {
            "id": 213122388,
            "name": "Luciano José"
        },
        "insurance_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco"
        },
        "price": 88.99
    }, {
        "number": "009090321938",
        "start_date": "2023-09-20T19:18:47.210Z",
        "patient": {
            "id": 3367263,
            "name": "Felício Santos"
        },
        "insurance_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco"
        },
        "price": 828.99
    }, {
        "number": "8787128731",
        "start_date": "2023-08-01T19:18:47.210Z",
        "patient": {
            "id": 777882,
            "name": "Fernando Raposoooooooo"
        },
        "insurance_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil"
        },
        "price": 772
    }, {
        "number": "12929321",
        "start_date": "2023-07-02T19:18:47.210Z",
        "patient": {
            "id": 221,
            "name": "Paciente com nome grande"
        },
        "insurance_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil"
        },
        "price": 221
    }]
};

document.addEventListener("DOMContentLoaded", function() {
    const insuranceSelect = document.getElementById("insuranceSelect");
    const datepicker = document.getElementById("datepicker");
    const todayButton = document.getElementById("todayButton");

    insuranceSelect.innerHTML = data.insurances.map(insurance => `<option value="${insurance.id}">${insurance.name}</option>`).join('');

    datepicker.addEventListener("change", filterGuides);
    insuranceSelect.addEventListener("change", filterGuides);
    todayButton.addEventListener("click", function() {
        const today = new Date().toISOString().split('T')[0];
        datepicker.value = today;
        filterGuides();
    });        
});
const filterGuides = () => {
    const selectedInsuranceId = document.getElementById("insuranceSelect").value;
    const selectedDate = document.getElementById("datepicker").value;

    const filteredGuides = data.guides.filter(guide => {
        const guideInsuranceId = guide.insurance_id.toString();
        const guideStartDate = guide.start_date.split('T')[0];
        return guideInsuranceId === selectedInsuranceId && guideStartDate === selectedDate;
    });

    renderGuides(filteredGuides);
};

const renderGuides = (guides) => {
    const tableBody = document.getElementById("guidesBody");
    let html = '';

    guides.forEach(guide => {
        html += `
            <tr>
                <td>${new Date(guide.start_date).toLocaleDateString('pt-BR')}</td>
                <td>${guide.number}</td>
                <td>${guide.patient.name}</td>
                <td>${guide.health_insurance.name}</td>
                <td>${guide.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            </tr>
        `;
    });

    tableBody.innerHTML = html;
};
