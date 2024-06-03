import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import Link from 'next/link';

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get('/campaigns')
      .then(response => setCampaigns(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Campaigns</h1>
      <Link href="/new">Create New Campaign</Link>
      <ul>
        {campaigns.map(campaign => (
          <li key={campaign.id}>
            <Link href={`/campaign/${campaign.id}`}>{campaign.nome}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
