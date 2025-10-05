import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  // Cuvanje username-a i password-a dok se kuca u input polja
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Ovde se cuva poruka o uspesnoj/neuspesnoj registraciji
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const submit = async ()=>{
    try{
      // Saljemo podatke backendu (/auth/register) sa POST zahtevom
      const { data } = await api.post('/auth/register', { username, password });
      // Ako se u gresci javi exists to znaci da korisnik sa tim username-om vec postoji
      if(data.message && data.message.includes('exists')){
        setMsg('Username vec postoji');
      }else{
        // Ako je registracija uspesna vraca na login posle 1000ms
        setMsg('Uspesna registracija');
        setTimeout(()=>nav('/login'), 1000);
      }
    }catch(e){
      setMsg('Neuspesna registracija');
    }
  };

  return (
    <div className="container" style={{display:'flex', height:'100vh', alignItems:'center', justifyContent:'center'}}>
      <div className="card" style={{minWidth:360}}>
        <h2 style={{marginTop:0}}>Registracija</h2>
        {msg && <div style={{marginBottom:8}}>{msg}</div>}
        {/* Polje za unos username-a */}
        <input className="input" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        {/* Polje za unos sifre */}
        <input className="input" type="password" placeholder="Sifra" value={password} onChange={e=>setPassword(e.target.value)} />
        {/* Dugme za registraciju */}
        <button className="btn btn-blue" onClick={submit} style={{width:'100%'}}>Napravi nalog</button>
      </div>
    </div>
  );
}
