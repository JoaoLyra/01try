function mostrarItensPorPagina(paginaAtual, itensPorPagina) {
  const startIndex = (paginaAtual - 1) * itensPorPagina;
  const endIndex = startIndex + itensPorPagina;
  const itensPagina = listaItens.slice(startIndex, endIndex);

document.getElementById("btnAnterior").addEventListener("click", () => {
  if (paginaAtual > 1) {
    paginaAtual--;
    mostrarItensPorPagina(paginaAtual, itensPorPagina);
  }
});

document.getElementById("btnProxima").addEventListener("click", () => {
  const totalPages = Math.ceil(listaItens.length / itensPorPagina);
  if (paginaAtual < totalPages) {
    paginaAtual++;
    mostrarItensPorPagina(paginaAtual, itensPorPagina);
  }
});

document.getElementById("btnHoje").addEventListener("click", () => {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  let mes = hoje.getMonth() + 1;
  let dia = hoje.getDate();
  if (mes < 10) mes = '0' + mes;
  if (dia < 10) dia = '0' + dia;
  const dataHoje = `${ano}-${mes}-${dia}`;
  document.getElementById("dataFiltro").value = dataHoje;
  dataFiltrada = dataHoje;
  mostrarItensPorPagina(paginaAtual, itensPorPagina, dataFiltrada);

let ordenacao = { coluna: 'data', ordem: 'desc' };

document.querySelectorAll('[data-coluna]').forEach(coluna => {
  coluna.addEventListener('click', () => {
    const colunaSelecionada = coluna.dataset.coluna;
    if (ordenacao.coluna === colunaSelecionada) {
      // Se já está ordenado pela mesma coluna, inverte a ordem
      ordenacao.ordem = ordenacao.ordem === 'asc' ? 'desc' : 'asc';
    } else {
      // Se não, define a nova coluna de ordenação e a ordem ascendente
      ordenacao.coluna = colunaSelecionada;
      ordenacao.ordem = 'asc';                                                
