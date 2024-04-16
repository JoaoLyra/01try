function renderGuides() {
    let tableContent = '';
   
    data.guides.forEach(guide => {
        const patientName = guide.patient.name;
        const guideNumber = guide.number;
        const startDate = new Date(guide.start_date).toLocaleDateString('pt-BR');
        const insurance = data.insurances.find(ins => ins.id === guide.insurane_id);
        const insuranceName = insurance ? insurance.name : '';

        
        const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(guide.price);

        
        const insuranceLabel = insurance && insurance.is_deleted ?
            `<span class="deleted" title="Convênio Apagado">${insuranceName}</span>` :
            insuranceName;

        const patientImageUrl = guide.patient.thumb_url || 'https://via.placeholder.com/150x150.jpg';

        tableContent += `
            <tr>
                <td>${guideNumber}</td>
                <td>${startDate}</td>
                <td>
                    <img src="${patientImageUrl}" alt="Foto do paciente" class="default-thumb">
                    ${patientName}
                </td>
                <td>${insuranceLabel}</td>
                <td>${formattedPrice}</td>
            </tr>
        `;
    });

    const guidesBody = document.getElementById('guidesBody');

    guidesBody.innerHTML = '';

    if (data.guides.length === 0) {
        const noGuidesRow = `<tr><td colspan="5">Nenhuma guia encontrada</td></tr>`;
        guidesBody.innerHTML = noGuidesRow;
    } else {
        guidesBody.innerHTML = tableContent;
    }
}

renderGuides();
