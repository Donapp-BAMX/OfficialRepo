function verificarContrasena(contrasena) {
    if (contrasena.length < 8) {
      return false;
    }
  
    let numeroCount = 0;
  
    for (let i = 0; i < contrasena.length; i++) {
      if (!isNaN(parseInt(contrasena[i]))) {
        numeroCount++;
      }
  
      if (numeroCount >= 2) {
        return true;
      }
    }
  
    return false;
  }
  
  export default verificarContrasena;
  