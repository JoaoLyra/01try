 };

  const insuranceSelect = document.getElementById("insuranceSelect");
  const searchInput = document.getElementById("searchInput");
  const startDatePicker = $("#startDatePicker");
  const guidesBody = document.getElementById("guidesBody");
  const pagination = document.getElementById("pagination");

  let currentPage = 1;
  const guidesPerPage = 2;

  
  function populateInsuranceOptions() {
    data.insurances.forEach(insurance => {
      const option = document.createElement("option");
      option.value = insurance.id;
      option.textContent = insurance.name;
      insuranceSelect.appendChild(option);
    });
  }

  
  function displayGuides() {
    guidesBody.innerHTML = "";
    const selectedInsuranceId = insuranceSelect.value;
    const searchText = searchInput.value.toLowerCase();
    const selectedStartDate = startDatePicker.datepicker('getDate');

    let filteredGuides = data.guides.filter(guide => 
      (selectedInsuranceId === "" || guide.insurance_id.toString() === selectedInsuranceId) &&
      (searchText === "" || guide.number.includes(searchText) || guide.patient.name.toLowerCase().includes(searchText))
    );

 
        
    const startIndex = (currentPage - 1) * guidesPerPage;
    const endIndex = startIndex + guidesPerPage;
    const paginatedGuides = filteredGuides.slice(startIndex, endIndex);

    paginatedGuides.forEach(guide => {
      const guideStartDate = new Date(guide.start_date);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${guide.number}</td>
        <td>${guideStartDate.toLocaleDateString()}</td>
        <td class="patient-name">
          <img src="${guide.patient.thumb_url || 'https://via.placeholder.com/150x150.jpg'}" alt="${guide.patient.name}">
          ${guide.patient.name}
        </td>
        <td ${guide.health_insurance.is_deleted ? 'class="deleted-insurance"' : ''}>${guide.health_insurance.name}</td>
        <td>${guide.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      `;
      guidesBody.appendChild(tr);
    });

    
    if (paginatedGuides.length === 0) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="5" style="text-align: center;">Nenhuma guia encontrada</td>`;
      guidesBody.appendChild(tr);
    }

    
    renderPagination(filteredGuides.length);
  }

  
  function renderPagination(totalGuides) {
    pagination.innerHTML = "";

    const totalPages = Math.ceil(totalGuides / guidesPerPage);

    if (totalPages > 1) {
      const prevButton = document.createElement("button");
      prevButton.textContent = "Anterior";
      prevButton.classList.add("btn", "btn-secondary", "mr-2");
      prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            displayGuides();
          }
        });
        pagination.appendChild(prevButton);

        const nextButton = document.createElement("button");
        nextButton.textContent = "Próximo";
        nextButton.classList.add("btn", "btn-secondary");
        nextButton.addEventListener("click", () => {
          if (currentPage < totalPages) {
            currentPage++;
            displayGuides();
          }
        });
        pagination.appendChild(nextButton);
      }
    }

    
    insuranceSelect.addEventListener("change", displayGuides);
    searchInput.addEventListener("input", displayGuides);
    startDatePicker.datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true,
      todayHighlight: true,
      endDate: '0d',
      language: 'pt-BR'
    });
    startDatePicker.on('changeDate', displayGuides);

    
    populateInsuranceOptions();
    displayGuides();
</script>
