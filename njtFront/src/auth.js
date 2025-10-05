// Cuva token u local storage (brauzerova memorija koja ostaje i kad se refresuje stranica)
// Ovo radimo kada se korisnik uspesno uloguje
export const saveToken = (t)=>localStorage.setItem('token', t);

// Vraca token iz local storage-a
// Koristi se da se vidi da li ima ulogovan korisnik
export const getToken = ()=>localStorage.getItem('token');

// Brise token iz local storage-a
// Koristi se kod logout-a
export const removeToken = ()=>localStorage.removeItem('token');

// Proverava da li postoji token
export const isLoggedIn = ()=>!!getToken();
