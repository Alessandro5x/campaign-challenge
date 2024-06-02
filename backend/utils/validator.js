import Joi from 'joi';

export const validateCampaign = (campaign) => {
  const schema = Joi.object({
    nome: Joi.string().required(),
    dataInicio: Joi.date().min('now').required(),
    dataFim: Joi.date().greater(Joi.ref('dataInicio')).required(),
    status: Joi.string().valid('ativa', 'pausada', 'expirada').required(),
    categoria: Joi.string().required(),
  });

  return schema.validate(campaign);
};

export const updateCampaignStatus = (campaign) => {
  if (new Date(campaign.dataFim) < new Date()) {
    campaign.status = 'expirada';
  }
};