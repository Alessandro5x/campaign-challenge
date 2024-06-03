import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get('/api/campaigns')
      .then(response => setCampaigns(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Campaigns</h1>
      <Link href="/new">
        <a>Create New Campaign</a>
      </Link>
      <ul>
        {campaigns.map(campaign => (
          <li key={campaign.id}>
            <Link href={`/campaign/${campaign.id}`}>
              <a>{campaign.nome}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}