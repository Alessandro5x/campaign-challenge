/**
 * @swagger
 * components:
 *   schemas:
 *     Campaign:
 *       type: object
 *       required:
 *         - nome
 *         - dataInicio
 *         - dataFim
 *         - status
 *         - categoria
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID da campanha
 *         nome:
 *           type: string
 *           description: O nome da campanha
 *         dataCadastro:
 *           type: string
 *           format: date-time
 *           description: A data de cadastro da campanha
 *         dataInicio:
 *           type: string
 *           format: date-time
 *           description: A data de início da campanha
 *         dataFim:
 *           type: string
 *           format: date-time
 *           description: A data de fim da campanha
 *         status:
 *           type: string
 *           enum: [ativa, pausada, expirada]
 *           description: O status da campanha
 *         categoria:
 *           type: string
 *           description: A categoria da campanha
 */

/**
 * @swagger
 * tags:
 *   name: Campaigns
 *   description: API para gerenciar campanhas
 */

/**
 * @swagger
 * /api/campaigns:
 *   get:
 *     summary: Lista todas as campanhas
 *     tags: [Campaigns]
 *     responses:
 *       200:
 *         description: Lista de campanhas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Campaign'
 */
export default function handler(req, res) {
    if (req.method === 'GET') {
      // Lógica para listar campanhas
      res.status(200).json([]);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  
  /**
   * @swagger
   * /api/campaigns/{id}:
   *   get:
   *     summary: Obter campanha por ID
   *     tags: [Campaigns]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: O ID da campanha
   *     responses:
   *       200:
   *         description: Detalhes da campanha
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Campaign'
   *       404:
   *         description: Campanha não encontrada
   */
  export function handler(req, res) {
    const { id } = req.query;
    if (req.method === 'GET') {
      // Lógica para obter uma campanha por ID
      res.status(200).json({});
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  