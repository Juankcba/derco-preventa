function validateRut(rut) {
  if (!rut || rut.trim().length < 3) return false;
  const cleanRutlower = rut.toLowerCase();
  const cleanRut = cleanRutlower.replace(/[^0-9kK-]/g, "");

  if (cleanRut.length < 3) return false;

  const split = cleanRut.split("-");
  if (split.length !== 2) return false;

  const num = parseInt(split[0], 10);
  const dgv = split[1];

  const dvCalc = calculateDV(num);
  return dvCalc === dgv;
}

function calculateDV(rut) {
  const cuerpo = `${rut}`;
  // Calcular Dígito Verificador
  let suma = 0;
  let multiplo = 2;

  // Para cada dígito del Cuerpo
  for (let i = 1; i <= cuerpo.length; i++) {
    // Obtener su Producto con el Múltiplo Correspondiente
    const index = multiplo * cuerpo.charAt(cuerpo.length - i);

    // Sumar al Contador General
    suma += index;

    // Consolidar Múltiplo dentro del rango [2,7]
    if (multiplo < 7) {
      multiplo += 1;
    } else {
      multiplo = 2;
    }
  }

  // Calcular Dígito Verificador en base al Módulo 11
  const dvEsperado = 11 - (suma % 11);
  if (dvEsperado === 10) return "k";
  if (dvEsperado === 11) return "0";
  return `${dvEsperado}`;
}

function filterRutQuantity(rut, quantity) {
  if (rut.length > quantity) {
    return rut.substring(0, 9);
  }
  return rut;
}

function formatRut(rut) {
  if (!rut) {
    return "";
  }

  let rutFormated = rut;
  rutFormated = rutFormated.replace("-", "");
  let lastchar = "";
  let other = "";
  if (rutFormated.length > 2) {
    let lastchar = rutFormated.substring(
      rutFormated.length - 1,
      rutFormated.length
    );
    let other = rutFormated.substring(0, rutFormated.length - 1);

    if (other.length > 3) {
      other = other.split(/(?=(?:...)*$)/).join(".");
    }
    return other + "-" + lastchar;
  }

  return rut;
}

function filterRutKeys(event, rut) {
  if (event.key === "Backspace") {
    return rut;
  }
  if (rut) {
    let rutFormated = rut.replace(/[^0-9kK]/g, "");
    rutFormated = filterRutQuantity(rutFormated, 9);
    rutFormated = formatRut(rutFormated);
    return rutFormated;
  }
}

export {
  formatRut,
  filterRutQuantity,
  validateRut,
  calculateDV,
  filterRutKeys,
};
