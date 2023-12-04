import { API_ENDPOINT } from '../utils/constants'

export const getReport = (params) => {
    fetch(API_ENDPOINT)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos de la API:', data);
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:', error);
        });
}