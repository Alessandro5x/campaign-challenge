import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Campaign() {
  const router = useRouter();
  const { id } = router.query;
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/campaigns/${id}`)
        .then(response => setCampaign(response.data))
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleDelete = () => {
    axios.delete(`/api/campaigns/${id}`)
      .then(() => router.push('/'))
      .catch(error => console.error(error));
  };

  if (!campaign) return <div>Loading...</div>;

  return (
    <div>
      <h1>{campaign.nome}</h1>
      <p>Status: {campaign.status}</p>
      <p>Category: {campaign.categoria}</p>
      <p>Start Date: {new Date(campaign.dataInicio).toLocaleDateString()}</p>
      <p>End Date: {new Date(campaign.dataFim).toLocaleDateString()}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => router.push(`/edit/${id}`)}>Edit</button>
    </div>
  );
}