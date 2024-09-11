  // Función para generar un color hexadecimal aleatorio
  function generarColorHexAleatorio() {
    const colorAleatorio = Math.floor(Math.random() * 16777215).toString(16);
    return `#${colorAleatorio.padStart(6, '0')}`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    fetch('datos.json')
      .then(response => response.json())
      .then(data => {
        document.getElementById('generar').addEventListener('click', () => {
          let resultado = '';

          for (let categoria in data) {
            const subcategorias = data[categoria];

            if (Object.keys(subcategorias).length > 0) {
              resultado += `<p class="category">${categoria.charAt(0).toUpperCase() + categoria.slice(1)}:</p>`;
              
              for (let subcategoria in subcategorias) {
                const opciones = subcategorias[subcategoria];

                // Si la subcategoría es "Color", generamos un color hexadecimal aleatorio
                if (subcategoria === "Color") {
                  const colorAleatorio = generarColorHexAleatorio();
                  resultado += `<p class="subcategory">${subcategoria.charAt(0).toUpperCase() + subcategoria.slice(1)}:</p><p class="resultado-item">${colorAleatorio}</p>`;
                } else {
                  // Para las demás subcategorías, seleccionamos una opción al azar
                  const opcionAleatoria = opciones[Math.floor(Math.random() * opciones.length)];
                  resultado += `<p class="subcategory">${subcategoria.charAt(0).toUpperCase() + subcategoria.slice(1)}:</p><p class="resultado-item">${opcionAleatoria}</p>`;
                }
              }
            }
          }

          document.getElementById('resultado').innerHTML = resultado;
        });
      })
      .catch(error => console.error('Error al cargar los datos:', error));
  });