import React, { useEffect, useState } from 'react';
import { isLoggedIn, removeToken } from '../auth';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function App(){
  const nav = useNavigate();
  const [items, setItems] = useState([]);   // lista konferencija
  const [form, setForm] = useState(null);   // forma za dodavanje/izmenu konferencije
  const [locations, setLocations] = useState([]); // lista lokacija

  // Ucitava sve konferencije sa servera slanjem GET zahteva
  const load = async ()=>{
    const { data } = await api.get('/conferences');
    setItems(data);
  };

  // Ucitava sve lokacije slanjem GET zahteva
  const loadLocations = async () => {
    const { data } = await api.get('/locations');
    setLocations(data);
  };

  // useEffect se pokrece kada se komponenta prvi put ucita
  useEffect(()=>{
    if(!isLoggedIn()){ nav('/login'); return; }
    load();
    loadLocations();
  },[]);

  // Logout brise token i prebacuje na login
  const logout = ()=>{ removeToken(); nav('/login'); };

  // Cuva ili menja konferenciju
  const save = async ()=>{
    if(!form.name){ alert('Potrebno ime'); return; }
    const payload = {
      ...form,
      location: form.locationId ? { id: form.locationId } : null
    };
    // AKo postoji id samo se menja konferencija
    if(form.id){
      await api.put(`/conferences/${form.id}`, payload);
    }else{
      // U suprotnom se pravi nova
      await api.post('/conferences', payload);
    }
    setForm(null);
    load();
  };

  // Brisanje konferencije
  const del = async (id)=>{
    if(!confirm('Izbrisi?')) return;
    await api.delete(`/conferences/${id}`);
    load();
  };

  return (
    <div className="container">
      <div className="hero card">
        <div>
          <h2 style={{margin:'0 0 6px'}}>Vase konferencije</h2>
          <div>Upravljajte dogadjajima kojima prisustvujete</div>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
          <button className="btn btn-gray" onClick={() => nav('/AddLocation')}>Nova lokacija</button>
          <button className="btn btn-gray" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="card" style={{marginTop:16}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h3 style={{margin:0}}>Lista</h3>
          <button
            className="btn btn-blue"
            onClick={()=>setForm({name:'',date:'',locationId:'',speaker:''})}>
            Dodaj konferenciju
          </button>
        </div>
        {/* Tabela svih konferencija */}
        <table className="table" style={{marginTop:12}}>
          <thead>
            <tr><th>Ime</th><th>Datum</th><th>Voditelj</th><th>Lokacija</th><th>Uredi</th><th>Izbrisi</th></tr>
          </thead>
          <tbody>
            {items.map(x=>(
              <tr key={x.id}>
                <td>{x.name}</td>
                <td>{x.date}</td>
                <td>{x.speaker}</td>
                <td>{x.location?.name || '-'}</td>
                <td><button className="btn btn-yellow" onClick={()=>setForm({...x, locationId: x.location?.id || ''})}>Uredi</button></td>
                <td><button className="btn btn-red" onClick={()=>del(x.id)}>Izbrisi</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Forma za dodavanje ili izmenu konferencije */}
        {form && (
          <div className="card" style={{marginTop:12}}>
            <h3 style={{marginTop:0}}>{form.id ? 'Uredi' : 'Dodaj'} Konferencija</h3>
            <input className="input" placeholder="Ime"
                   value={form.name||''}
                   onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
            <input className="input" type="datetime-local"
                   value={form.date||''}
                   onChange={e=>setForm(f=>({...f,date:e.target.value}))}/>
            <select className="input"
                    value={form.locationId||''}
                    onChange={e=>setForm(f=>({...f, locationId: e.target.value}))}>
              <option value="">Izaberi lokaciju</option>
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.zipCode})
                </option>
              ))}
            </select>
            <input className="input" placeholder="Voditelj"
                   value={form.speaker||''}
                   onChange={e=>setForm(f=>({...f,speaker:e.target.value}))}/>
            <div>
              <button className="btn btn-blue" onClick={save}>Cuvaj</button>
              <button className="btn btn-gray" onClick={()=>setForm(null)} style={{marginLeft:8}}>Odustani</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
