const filtrarTabela = () => {
    const convenioSelecionado = document.getElementById('insuranceSelect').value;
    const textoPesquisa = document.getElementById('searchText').value.trim().toLowerCase();

    const textoFormatado = textoPesquisa.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); // Normaliza e remove acentos do texto de pesquisa

    const guiasFiltradas = data.guides.filter(guide => {
        let incluirGuia = true; // Flag para controlar se a guia deve ser incluída no resultado final

        const nomePacienteFormatado = guide.patient.name.trim().toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, ""); // Normaliza e remove acentos do nome do paciente

        if (convenioSelecionado !== '' && guide.insurance_id != convenioSelecionado) {
            incluirGuia = false; // Se o convênio selecionado for diferente do convênio da guia, não incluir
        }

        if (textoFormatado !== '') {
            // Verifica se o nome do paciente contém o texto pesquisado
            if (!nomePacienteFormatado.includes(textoFormatado)) {
                incluirGuia = false; // Se o nome do paciente não corresponder ao texto pesquisado, não incluir
            }
        }

        return incluirGuia; // Retorna true se a guia deve ser incluída no resultado final
    });

    renderGuides(guiasFiltradas); // Chama a função para renderizar a tabela com as guias filtradas
};

// Chama a função de filtragem ao digitar no campo de pesquisa ou ao selecionar um convênio
document.getElementById('searchText').addEventListener('input', filtrarTabela);
document.getElementById('insuranceSelect').addEventListener('change', filtrarTabela);
