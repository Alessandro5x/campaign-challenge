const { validateCampaign, updateCampaignStatus } = require('../utils/validator');

describe('Validator Tests', () => {
  it('should validate a valid campaign', () => {
    const campaign = {
      nome: 'Campanha de Teste',
      dataInicio: '2024-06-10',
      dataFim: '2024-06-20',
      status: 'ativa',
      categoria: 'marketing',
    };

    const { error } = validateCampaign(campaign);
    expect(error).toBeUndefined();
  });

  it('should invalidate a campaign with end date before start date', () => {
    const campaign = {
      nome: 'Campanha de Teste',
      dataInicio: '2024-06-20',
      dataFim: '2024-06-10',
      status: 'ativa',
      categoria: 'marketing',
    };

    const { error } = validateCampaign(campaign);
    expect(error).toBeDefined();
  });

  it('should mark a campaign as expired if end date is in the past', () => {
    const campaign = {
      id: 1,
      nome: 'Campanha Expirada',
      dataCadastro: new Date(),
      dataInicio: '2023-06-10',
      dataFim: '2023-06-20',
      status: 'ativa',
      categoria: 'marketing',
      isDeleted: false,
    };

    updateCampaignStatus(campaign);
    expect(campaign.status).toBe('expirada');
  });
});
