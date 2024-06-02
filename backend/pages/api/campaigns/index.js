import { campaigns } from '../../../data/campaigns';
import { validateCampaign, updateCampaignStatus } from '../../../utils/validators';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(campaigns);
  } else if (req.method === 'POST') {
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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
