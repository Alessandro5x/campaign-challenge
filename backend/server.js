const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let campaigns = [];
let id = 0;

app.get('/api/campaigns', (req, res) => {
  res.json(campaigns);
});

app.post('/api/campaigns', (req, res) => {
  const campaign = { id: id++, ...req.body, dataCadastro: new Date(), isDeleted: false };
  campaigns.push(campaign);
  res.json(campaign);
});

app.put('/api/campaigns/:id', (req, res) => {
  const { id } = req.params;
  const campaign = campaigns.find(c => c.id === parseInt(id) && !c.isDeleted);
  if (campaign) {
    Object.assign(campaign, req.body);
    res.json(campaign);
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
