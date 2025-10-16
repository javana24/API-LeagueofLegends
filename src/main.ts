import './style.css'
import { fromFetch } from 'rxjs/fetch';
import { switchMap, of} from 'rxjs';

document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.querySelector<HTMLDivElement>('#app');
  
  if (!appElement) {
    console.error('No se encontró el elemento #app');
    return;
  }

  appElement.innerHTML = `
    <div>
        <h1>Personajes de League of Legends</h1>
        <div id="mostrarPersonajes">
          
        </div>
    </div>
  `
;


 
const respuestaPersonajesFetchRXJS = fromFetch('http://localhost:3000/champions').pipe(
  switchMap(respuestaPersonajesFetchRXJS => {
    if (respuestaPersonajesFetchRXJS.ok) {
      return respuestaPersonajesFetchRXJS.json();
    } else {
      return of({ error: true, message: `Error ${respuestaPersonajesFetchRXJS.status}` });
    }
  })
);
 
respuestaPersonajesFetchRXJS.subscribe({
  next: (result: any) => {
    console.log('Respuesta:', result);
    
    const element = document.getElementById('mostrarPersonajes');
    if (!element) return;

    // Buscar el array de personajes
    let characters = result.items || result.data || result;
    
    if (!Array.isArray(characters)) {
      element.innerHTML = '<p>Error: No se encontraron personajes</p>';
      return;
    }

    characters.forEach((character: any) => {
      element.innerHTML += `
        <div class="card">
          <div class="data-container">
             <h2>ID: ${character.id || 'N/A'}</h2>
          </div>

          <div class="data-container">
             <p>Titulo: ${character.titulo || 'N/A'}</p>
          </div>

          <div class="data-container">
             <p>Descripcion: ${character.descripcion || 'N/A'}</p>
          </div>

          <div class="data-container">
             <p>URL: ${character.url || 'N/A'}</p>
          </div>
        </div>
      `;
    });
  },
  error: (err) => console.error('Error:', err),
  complete: () => console.log('Completado'),
})
});
