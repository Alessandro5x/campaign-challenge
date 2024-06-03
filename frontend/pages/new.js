import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function NewCampaign() {
  const router = useRouter();
  const [campaign, setCampaign] = useState({
    nome: '',
    dataInicio: '',
    dataFim: '',
    status: 'ativa',
    categoria: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaign((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/campaigns', campaign)
      .then(() => router.push('/'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Create New Campaign</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" value={campaign.nome} onChange={handleChange} placeholder="Name" required />
        <input type="date" name="dataInicio" value={campaign.dataInicio} onChange={handleChange} required />
        <input type="date" name="dataFim" value={campaign.dataFim} onChange={handleChange} required />
        <select name="status" value={campaign.status} onChange={handleChange}>
          <option value="ativa">Active</option>
          <option value="pausada">Paused</option>
          <option value="expirada">Expired</option>
        </select>
        <input type="text" name="categoria" value={campaign.categoria} onChange={handleChange} placeholder="Category" required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}