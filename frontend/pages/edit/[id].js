import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function EditCampaign() {
  const router = useRouter();
  const { id } = router.query;
  const [campaign, setCampaign] = useState({
    nome: '',
    dataInicio: '',
    dataFim: '',
    status: 'ativa',
    categoria: '',
  });

  useEffect(() => {
    if (id) {
      axios.get(`/api/campaigns/${id}`)
        .then(response => setCampaign(response.data))
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaign((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/campaigns/${id}`, campaign)
      .then(() => router.push(`/campaign/${id}`))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Edit Campaign</h1>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
