import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, Typography, Box } from '@mui/material';
import Layout from '../../components/Layout';

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
    <Layout>
      <Typography variant="h4" gutterBottom>
        {campaign.nome}
      </Typography>
      <Typography>Status: {campaign.status}</Typography>
      <Typography>Category: {campaign.categoria}</Typography>
      <Typography>Start Date: {new Date(campaign.dataInicio).toLocaleDateString()}</Typography>
      <Typography>End Date: {new Date(campaign.dataFim).toLocaleDateString()}</Typography>
      <Box mt={2}>
        <Button variant="contained" color="secondary" onClick={handleDelete} sx={{ mr: 2 }}>
          Delete
        </Button>
        <Button variant="contained" color="primary" onClick={() => router.push(`/edit/${id}`)}>
          Edit
        </Button>
      </Box>
    </Layout>
  );
}