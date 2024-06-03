import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import Link from 'next/link';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import Layout from '../components/Layout';

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get('/campaigns')
      .then(response => setCampaigns(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Campaigns
      </Typography>
      <Link href="/new" passHref>
        <Button variant="contained" color="primary" sx={{ mb: 2 }}>
          Create New Campaign
        </Button>
      </Link>
      <List>
        {campaigns.map(campaign => (
          <Link key={campaign.id} href={`/campaign/${campaign.id}`} passHref>
            <ListItem button>
              <ListItemText primary={campaign.nome} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Layout>
  );
}