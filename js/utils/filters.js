// js/utils/filters.js

export function procesarPaises(paises, texto = '', continente = '', criterioOrden = 'az') {
  if (!Array.isArray(paises)) return [];

  let resultados = [...paises];

  // 1. Filtrar por búsqueda de texto
  if (texto.trim() !== '') {
    const busqueda = texto.toLowerCase().trim();
    resultados = resultados.filter((pais) => {
      const nombreComun = pais.names?.common?.toLowerCase() || '';
      const nombreOficial = pais.names?.official?.toLowerCase() || '';
      return nombreComun.includes(busqueda) || nombreOficial.includes(busqueda);
    });
  }

  // 2. Filtrar por continente / región
  if (continente && continente !== 'todos') {
    resultados = resultados.filter((pais) => {
      const regionPais = (pais.continent || pais.region || '').toLowerCase();
      return regionPais === continente.toLowerCase();
    });
  }

  // 3. Ordenar resultados
  resultados.sort((a, b) => {
    const nombreA = a.names?.common || '';
    const nombreB = b.names?.common || '';

    if (criterioOrden === 'za') {
      return nombreB.localeCompare(nombreA);
    }
    return nombreA.localeCompare(nombreB);
  });

  return resultados;
}