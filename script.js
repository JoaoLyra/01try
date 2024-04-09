$(document).ready(function() {
    var insurances = [
      {"id": 3322, "name": "Amil"},
      {"id": 3293, "name": "Bradesco"},
      {"id": 99231, "name": "Hapvida"},
      {"id": 1322, "name": "CASSI"},
      {"id": 23111, "name": "Sulamérica"}
    ];
  
    var guides = [
      {"number": "3210998321", "start_date": "2021-04-23T19:18:47.210Z", "patient": {"id": 9321123, "name": "Augusto Ferreira", "thumb_url": "https://imgsapp2.correiobraziliense.com.br/app/noticia_127983242361/2019/10/04/794834/20191004154953157610i.jpg"}, "insurane_id": 1322, "health_insurance": {"id": 1322, "name": "CASSI", "is_deleted": false}, "price": 5567.2},
      {"number": "287312832", "start_date": "2021-04-23T19:18:47.210Z", "patient": {"id": 93229123, "name": "Caio Carneiro", "thumb_url": "http://3.bp.blogspot.com/-XG5bGlqGnJw/T9lIcssnybI/AAAAAAAADTA/B23ezXOkx8Y/s1600/Aang.jpg"}, "insurane_id": 1322, "health_insurance": {"id": 1322, "name": "CASSI", "is_deleted": false}, "price": 213.3},
      {"number": "283718273", "start_date": "2021-04-22T19:18:47.210Z", "patient": {"id": 213122388, "name": "Luciano José", "thumb_url": "https://i.ytimg.com/vi/yUXd-enstO8/maxresdefault.jpg"}, "insurane_id": 3293, "health_insurance": {"id": 3293, "name": "Bradesco", "is_deleted": true}, "price": 88.99},
      {"number": "009090321938", "start_date": "2021-04-20T19:18:47.210Z", "patient": {"id": 3367263, "name": "Felício Santos", "thumb_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSxlYabmRlKk43uvsBMIqjA7Rw_YCwK4TyA&usqp=CAU"}, "insurane_id": 3293, "health_insurance": {"id": 3293, "name": "Bradesco", "is_deleted": true}, "price": 828.99},
      {"number": "8787128731", "start_date": "2021-04-01T19:18:47.210Z", "patient": {"id": 777882, "name": "Fernando Raposo"}, "insurane_id": 3322, "health_insurance": {"id": 3322, "name": "Amil", "is_deleted": false}, "price": 772},
      {"number": "12929321", "start_date": "2021-04-02T19:18:47.210Z", "patient": {"id": 221, "name": "Paciente com nome grande para testar o texto elíptico com nome grande do paciente"}, "insurane_id": 3322, "health_insurance": {"id": 3322, "name": "Amil", "is_deleted": false}, "price": 221}
    ];
  
    function renderGuides(guidesData) {
      $('#guidesTable tbody').empty();
      $.each(guidesData, function(index, guide) {
        var patientImage = guide.patient.thumb_url ? guide.patient.thumb_url : 'https://via.placeholder.com/150x150.jpg';
        var insuranceName = insurances.find(insurance => insurance.id === guide.insurane_id).name;
        var formattedDate = new Date(guide.start_date).toLocaleDateString('pt-BR');
        var formattedPrice = 'R$ ' + guide.price.toFixed(2).replace('.', ',');
  
        var guideRow = $('<tr>').append(
          $('<td>').text(guide.number),
          $('<td>').text(formattedDate),
          $('<td>').append($('<img>').attr('src', patientImage).addClass('patient-image')).append(' ' + guide.patient.name),
          $('<td>').text(insuranceName),
          $('<td>').text(formattedPrice)
        );
  
        if (guide.health_insurance.is_deleted) {
          guideRow.addClass('deleted-guide');
          guideRow.find('td:eq(3)').addClass('insurance-tooltip').attr('title', 'Convênio Apagado');
        }
  
        $('#guidesTable tbody').append(guideRow);
      });
    }
  
    function renderInsuranceOptions() {
      $.each(insurances, function(index, insurance) {
        $('#insuranceSelect').append($('<option>').attr('value', insurance.id).text(insurance.name));
      });
    }
  
    
    renderGuides(guides);
    renderInsuranceOptions();
  
    
    $('#searchInput').on('input', function() {
      var searchText = $(this).val().toLowerCase();
      var filteredGuides = guides.filter(function(guide) {
        return guide.patient.name.toLowerCase().includes(searchText) || guide.number.includes(searchText);
      });
      $('#noResult').toggleClass('d-none', filteredGuides.length > 0);
      renderGuides(filteredGuides);
    });
  
    $('#insuranceSelect').on('change', function() {
      var selectedInsuranceId = $(this).val();
      if (selectedInsuranceId) {
        var filteredGuides = guides.filter(function(guide) {
          return guide.insurane_id == selectedInsuranceId;
        });
        renderGuides(filteredGuides);
      } else {
        renderGuides(guides);
      }
    });
  });
  