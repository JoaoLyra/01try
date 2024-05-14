// Função para calcular o total de procedimentos agrupados por ID
function calcularTotalPorID() {
    const totalPorID = {};
    procedimentos.forEach(procedimento => {
        if (!totalPorID[procedimento.id]) {
            totalPorID[procedimento.id] = 0;
        }
        totalPorID[procedimento.id]++;
    });
    return totalPorID;
}

// Função para calcular o total de procedimentos por group_key
function calcularTotalPorGroupKey() {
    const totalPorGroupKey = {};
    procedimentos.forEach(procedimento => {
        if (!totalPorGroupKey[procedimento.group_key]) {
            totalPorGroupKey[procedimento.group_key] = 0;
        }
        totalPorGroupKey[procedimento.group_key]++;
    });
    return totalPorGroupKey;
}

// Função para calcular o total de procedimentos por attendance_id
function calcularTotalPorAttendanceID() {
    const totalPorAttendanceID = {};
    procedimentos.forEach(procedimento => {
        if (!totalPorAttendanceID[procedimento.attendance_id]) {
            totalPorAttendanceID[procedimento.attendance_id] = 0;
        }
        totalPorAttendanceID[procedimento.attendance_id]++;
    });
    return totalPorAttendanceID;
}

// Função para calcular o total de procedimentos por finance_id
function calcularTotalPorFinanceID() {
    const totalPorFinanceID = {};
    procedimentos.forEach(procedimento => {
        if (!totalPorFinanceID[procedimento.finance_id]) {
            totalPorFinanceID[procedimento.finance_id] = 0;
        }
        totalPorFinanceID[procedimento.finance_id]++;
    });
    return totalPorFinanceID;
}

// Função para calcular os totais por procedure_id
function calcularTotaisPorProcedureID() {
    const totaisPorProcedureID = {};
    procedimentos.forEach(procedimento => {
        if (!totaisPorProcedureID[procedimento.procedure_id]) {
            totaisPorProcedureID[procedimento.procedure_id] = {
                totalProduzido: 0,
                totalLiquido: 0,
                totalRecebido: 0,
                totalNaoRecebido: 0
            };
        }
        totaisPorProcedureID[procedimento.procedure_id].totalProduzido += procedimento.price;
        totaisPorProcedureID[procedimento.procedure_id].totalLiquido += procedimento.liquid_price;
        totaisPorProcedureID[procedimento.procedure_id].totalRecebido += procedimento.received_value;
        totaisPorProcedureID[procedimento.procedure_id].totalNaoRecebido += (procedimento.liquid_price - procedimento.received_value);
    });
    return totaisPorProcedureID;
}

// Função para calcular os totais por tiss_type
function calcularTotaisPorTissType() {
    const totaisPorTissType = {};
    procedimentos.forEach(procedimento => {
        if (!totaisPorTissType[procedimento.tiss_type]) {
            totaisPorTissType[procedimento.tiss_type] = {
                totalProduzido: 0,
                totalLiquido: 0,
                totalRecebido: 0,
                totalNaoRecebido: 0
            };
        }
        totaisPorTissType[procedimento.tiss_type].totalProduzido += procedimento.price;
        totaisPorTissType[procedimento.tiss_type].totalLiquido += procedimento.liquid_price;
        totaisPorTissType[procedimento.tiss_type].totalRecebido += procedimento.received_value;
        totaisPorTissType[procedimento.tiss_type].totalNaoRecebido += (procedimento.liquid_price - procedimento.received_value);
    });
    return totaisPorTissType;
}

// Função para agrupar procedimentos por atendimento
function agruparProcedimentosPorAtendimento() {
    const procedimentosPorAtendimento = {};
    procedimentos.forEach(procedimento => {
        if (!procedimentosPorAtendimento[procedimento.attendance_id]) {
            procedimentosPorAtendimento[procedimento.attendance_id] = [];
        }
        procedimentosPorAtendimento[procedimento.attendance_id].push(procedimento);
    });
    return procedimentosPorAtendimento;
}

// Função para agrupar procedimentos por financeiro
function agruparProcedimentosPorFinanceiro() {
    const procedimentosPorFinanceiro = {};
    procedimentos.forEach(procedimento => {
        if (!procedimentosPorFinanceiro[procedimento.finance_id]) {
            procedimentosPorFinanceiro[procedimento.finance_id] = [];
        }
        procedimentosPorFinanceiro[procedimento.finance_id].push(procedimento);
    });
    return procedimentosPorFinanceiro;
}

// Função para calcular totais por data (dia / mês / ano)
function calcularTotaisPorData() {
    const totaisPorData = {};
    procedimentos.forEach(procedimento => {
        const dataSplit = procedimento.data.split('-');
        const ano = dataSplit[0];
        const mes = dataSplit[1];
        const dia = dataSplit[2];

        const chaveData = `${ano}-${mes}-${dia}`;

        if (!totaisPorData[chaveData]) {
            totaisPorData[chaveData] = {
                totalProduzido: 0,
                totalLiquido: 0,
                totalRecebido: 0,
                totalNaoRecebido: 0
            };
        }
        totaisPorData[chaveData].totalProduzido += procedimento.price;
        totaisPorData[chaveData].totalLiquido += procedimento.liquid_price;
        totaisPorData[chaveData].totalRecebido += procedimento.received_value;
        totaisPorData[chaveData].totalNaoRecebido += (procedimento.liquid_price - procedimento.received_value);
    });
    return totaisPorData;
}
