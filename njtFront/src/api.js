// Axios biblioteka koja sluzi za HTTP zahteve (GET, POST, PUT, DELETE)
import axios from 'axios';

// Funkcija getToken iz auth.js fajla (sluzi za dohvatanje tokena iz local storage-a)
import { getToken } from './auth';

// Axios instanca koja ce imati bazni URL backend API-ja
// To znaci da ce svi pozivi ici na http://localhost:8080/api/  (umesto da svaki put pisemo ceo URL)
const api = axios.create({ baseURL: 'http://localhost:8080/api' });

// Axios "interceptor", ovo je deo koda koji se automatski pokrece pre svakog zahteva
// Ovde proveravamo da li postoji token i dodajemo ga u "Authorization" header
api.interceptors.request.use(config => {
  const token = getToken(); // uzimamo token iz local storage-a
  if(token){ 
    // Ako postoji token, dodajemo ga u header tako da server zna ko je korisnik
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config; 
});

// Izvozimo api instancu da bismo mogli da je koristimo u drugim komponentama
export default api;
