import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/axios';
import { Button, TextField, MenuItem, Typography, Box } from '@mui/material';
import Layout from '../components/Layout';

const statuses = [
  { value: 'ativa', label: 'Active' },
  { value: 'pausada', label: 'Paused' },
  { value: 'expirada', label: 'Expired' },
];

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
    axios.post('/campaigns', campaign)
      .then(() => router.push('/'))
      .catch(error => console.error(error));
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Create New Campaign
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="nome"
          value={campaign.nome}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Start Date"
          type="date"
          name="dataInicio"
          value={campaign.dataInicio}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <TextField
          label="End Date"
          type="date"
          name="dataFim"
          value={campaign.dataFim}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <TextField
          label="Status"
          name="status"
          value={campaign.status}
          onChange={handleChange}
          select
          fullWidth
          required
          margin="normal"
        >
          {statuses.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Category"
          name="categoria"
          value={campaign.categoria}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </Box>
      </form>
    </Layout>
  );
}