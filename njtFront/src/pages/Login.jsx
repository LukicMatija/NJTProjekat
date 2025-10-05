import React, { useState } from 'react';
import { saveToken } from '../auth';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

export default function Login(){
  // Cuvanje username-a i password-a dok se kuca u input polja
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Za prebacivanje na drugu stranicu
  const nav = useNavigate();
  // Funkcija koja se poziva kada se klikne na dugme "Login"
  const submit = async ()=>{
    try{
      // Pozivanje backenda da proveri da li postoji korisnik slanjem POST zahteva
      const { data } = await api.post('/auth/login', { username, password });
      // Za cuvanje tokena
      saveToken(data.token);
      // Kada je login uspesan prebacujemo korisnika na pocetnu stranicu
      nav('/');
    }catch(e){
      // Ako je doslo do greske prikazujemo poruku
      alert(e.response?.data?.message || 'Neuspesna prijava');
    }
  };

  return (
    // Div polja i odmah upisan stajl za njih
    <div className="container" style={{display:'flex', height:'100vh', alignItems:'center', justifyContent:'center'}}>
      <div className="card" style={{minWidth:360}}>
        <h2 style={{marginTop:0}}>Login</h2>
        {/* Polje za unos username-a */}
        <input className="input" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        {/* Polje za unos sifre */}
        <input className="input" type="password" placeholder="Sifra" value={password} onChange={e=>setPassword(e.target.value)} />
        {/* Dugme za prijavu */}
        <button className="btn btn-blue" onClick={submit} style={{width:'100%'}}>Login</button>
        {/* Stranica za registraciju */}
        <div style={{marginTop:8}}>Nemate nalog? <Link to="/register">Registrujte se</Link></div>
      </div>
    </div>
  );
}

