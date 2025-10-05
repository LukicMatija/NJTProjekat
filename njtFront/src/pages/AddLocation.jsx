import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function AddLocation() {
  // Forma u kojoj se pamti lokacija
  const [form, setForm] = useState({ zipCode: '', name: '' });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const submit = async () => {
    setMessage(null);
    setError(null);
    try {
      if (!form.zipCode || !form.name) {
        setError('Popunite sva polja.');
        return;
      }
      // Salje POST zahtev 
      await api.post('/locations', form);
      setMessage('Lokacija uspesno dodata.');
      setForm({ zipCode: '', name: '' });
    } catch (err) {
      console.error(err);
      setError('Greska pri dodavanju lokacije.');
    }
  };

  return (
    <div className="add-location-container">
      <button className="back-button" onClick={() => nav('/app')}>
        Nazad
      </button>
      <h2>Dodaj Lokaciju</h2>
      {/* Polje za zip code */}
      <input
        placeholder="Zip Code"
        value={form.zipCode}
        onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
      />
      {/* Polje za ime lokacije */}
      <input
        placeholder="Naziv"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      {/* Dugme za cuvanje lokacije */}
      <button className="save-button" onClick={submit}>
        Sacuvaj
      </button>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
