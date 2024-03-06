//Variable global para almacenar el texto encriptado o desencriptado

// Función para encriptar un Texto
function encriptarTexto(texto) {
  // Definir un objeto que mapea cada letra a su correspondiente encriptación
  const encriptaciones = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
  };

  // Función auxiliar para encriptar un único caracter
  function encriptarCaracter(caracter) {
    return encriptaciones[caracter] || caracter;
  }

  // Encriptar el texto letra por letra
  let textoEncriptado = '';
  for (let i = 0; i < texto.length; i++) {
    const caracter = texto[i];
    if (esLetraMinuscula(caracter) || caracter === ' ') {
      textoEncriptado += encriptarCaracter(caracter);
    } else {
      return false;
    }
  }

  return textoEncriptado;
}

// Función para desncriptar un Texto
function desencriptarTexto(texto){
  const desencriptaciones = {
    'ai': 'a',
    'enter': 'e',
    'imes': 'i',
    'ober': 'o',
    'ufat': 'u'
  };

  //Funcion  para desencriptar un texto usando el metodo replace de javascript
  for (const clave in desencriptaciones) {
    const valorDesencriptado = desencriptaciones[clave];
    texto = texto.replace(new RegExp(clave, 'g'), valorDesencriptado);
  }
  return texto;
}

//Función auxiliar para asignar texto a un objeto HTML por Id
function asignarTextoId(identificador, texto) {
  let idHTML = document.getElementById(identificador);
  idHTML.innerHTML = texto;
  return;
}

// Función auxiliar para verificar si un caracter es una letra minúscula
function esLetraMinuscula(caracter) {
  return (caracter >= 'a' && caracter <= 'z') || (caracter =='ñ');
}

//  Función que verifica si hay mayusculas o caracteres espaciales en un texto
function noEsMinusculaNiEspacio(texto){
  for (let i = 0; i < texto.length; i++) {
    const caracter = texto[i];
    if (!(esLetraMinuscula(caracter) || caracter === ' ')) {
      return true;
    }
  }
}

// Funcion auxiliar para copiar contenido de un elemento por id al portapapeles
const copiarContenido = async (identificador) => {
  try {
    // Obtener el texto actualizado del párrafo
    const texto = document.getElementById(identificador).innerHTML;
    
    // Copiar el nuevo contenido del párrafo
    await navigator.clipboard.writeText(texto);
    console.log('Contenido copiado al portapapeles');
  } catch (err) {
    console.error('Error al copiar: ', err);
  }
}

// Funcion auxiliar para mostrar y ocultar elementos en encriptador.html
function mostrarTextoSalida(){
  document.getElementById('salida_inicial').style.display = 'none';
  document.getElementById('texto_generado').style.display = 'block';
  document.getElementById('boton_copiar').style.display = 'block';
}

//Funcion auxiliar para imprimir mensaje de alerta
function ingreseSoloMinusculas(){
  document.getElementById('salida_inicial').style.display = 'block';
  document.getElementById('texto_generado').style.display = 'none';
  document.getElementById('boton_copiar').style.display = 'none';
}

// Funcion para el boton encriptar texto
function botonEncriptar(){
  const textoOriginal = document.getElementById('textoUsuario').value;
  let textoGenerado = encriptarTexto(textoOriginal);

  if (textoGenerado) {
    asignarTextoId('texto_generado',textoGenerado);
    mostrarTextoSalida();
  } else {
    ingreseSoloMinusculas();
  }

  console.log("Texto original:", textoOriginal);
  console.log("Texto encriptado:", textoGenerado);
}

// Funcion para el boton desencriptar texto
function botonDesencriptar(){
  const textoOriginal = document.getElementById('textoUsuario').value;

  if (noEsMinusculaNiEspacio(textoOriginal)) {
    ingreseSoloMinusculas();
  } else {
    let textoGenerado = desencriptarTexto(textoOriginal);
    asignarTextoId('texto_generado',textoGenerado);
    mostrarTextoSalida();
  }

  console.log("Texto original:", textoOriginal);
  console.log("Texto desencriptado:", textoGenerado);
}

// Función para el boton copiar texto
function copiarTextoGenerado(){
  copiarContenido("texto_generado")
}




  
