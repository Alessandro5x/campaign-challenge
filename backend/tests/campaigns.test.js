const express = require('express');
const bodyParser = require('body-parser');
const { campaigns } = require('../data/campaigns');
const { validateCampaign, updateCampaignStatus } = require('../utils/validator');

const app = express();
app.use(bodyParser.json());

app.get('/api/campaigns', (req, res) => {
  res.status(200).json(campaigns);
});

app.post('/api/campaigns', (req, res) => {
  const { error } = validateCampaign(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const newCampaign = {
    id: campaigns.length + 1,
    nome: req.body.nome,
    dataCadastro: new Date(),
    dataInicio: new Date(req.body.dataInicio),
    dataFim: new Date(req.body.dataFim),
    status: req.body.status,
    categoria: req.body.categoria,
    isDeleted: false,
  };
  campaigns.push(newCampaign);
  res.status(201).json(newCampaign);
});

app.put('/api/campaigns/:id', (req, res) => {
  const { id } = req.params;
  const campaign = campaigns.find(c => c.id === parseInt(id) && !c.isDeleted);
  if (campaign) {
    const { error } = validateCampaign(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    Object.assign(campaign, req.body);
    updateCampaignStatus(campaign);
    res.status(200).json(campaign);
  } else {
    res.status(404).json({ error: 'Campaign not found' });
  }
});

app.delete('/api/campaigns/:id', (req, res) => {
  const { id } = req.params;
  const campaign = campaigns.find(c => c.id === parseInt(id) && !c.isDeleted);
  if (campaign) {
    campaign.isDeleted = true;
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Campaign not found' });
  }
});

describe('Campaign API Tests', () => {
  it('should list all campaigns', () => {
    const response = { status: 200, body: campaigns };
    expect(response.status).toBe(200);
    expect(response.body).toEqual(campaigns);
  });

  it('should create a new campaign', () => {
    const newCampaign = {
      nome: 'Nova Campanha',
      dataInicio: '2024-06-10',
      dataFim: '2024-06-20',
      status: 'ativa',
      categoria: 'marketing',
    };

    const { error } = validateCampaign(newCampaign);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const createdCampaign = {
      id: campaigns.length + 1,
      ...newCampaign,
      dataCadastro: new Date(),
      isDeleted: false,
    };

    campaigns.push(createdCampaign);

    expect(createdCampaign.nome).toBe(newCampaign.nome);
    expect(createdCampaign.id).toBeDefined();
  });

  it('should update an existing campaign', () => {
    const updatedCampaign = {
      nome: 'Campanha Atualizada',
      dataInicio: '2024-06-11',
      dataFim: '2024-06-21',
      status: 'pausada',
      categoria: 'vendas',
    };

    const campaignId = 1; // Supondo que temos uma campanha com ID 1

    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const { error } = validateCampaign(updatedCampaign);
    if (error) {
      throw new Error(error.details[0].message);
    }

    Object.assign(campaign, updatedCampaign);
    updateCampaignStatus(campaign);

    expect(campaign.nome).toBe(updatedCampaign.nome);
  });

  it('should delete a campaign (soft delete)', () => {
    const campaignId = 1; // Supondo que temos uma campanha com ID 1

    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    campaign.isDeleted = true;

    expect(campaign.isDeleted).toBe(true);
  });
});