import { campaigns } from '../../../data/campaigns';
import { validateCampaign, updateCampaignStatus } from '../../../utils/validators';

export default function handler(req, res) {
  const { id } = req.query;
  const campaign = campaigns.find(c => c.id === parseInt(id) && !c.isDeleted);

  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  if (req.method === 'GET') {
    res.status(200).json(campaign);
  } else if (req.method === 'PUT') {
    const { error } = validateCampaign(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    campaign.nome = req.body.nome;
    campaign.dataInicio = new Date(req.body.dataInicio);
    campaign.dataFim = new Date(req.body.dataFim);
    campaign.status = req.body.status;
    campaign.categoria = req.body.categoria;

    updateCampaignStatus(campaign);
    res.status(200).json(campaign);
  } else if (req.method === 'DELETE') {
    campaign.isDeleted = true;
    res.status(204).end();
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
