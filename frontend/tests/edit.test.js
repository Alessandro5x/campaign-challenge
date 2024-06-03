const React = require('react');
const { render, screen, waitFor, fireEvent } = require('@testing-library/react');
const axios = require('axios');
const EditCampaign = require('../pages/edit/[id]').default;
const { ThemeProvider } = require('@mui/material/styles');
const theme = require('../utils/theme').default;
const { useRouter } = require('next/router');

jest.mock('axios');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Edit Campaign Page', () => {
  const push = jest.fn();
  const query = { id: '1' };

  beforeEach(() => {
    useRouter.mockReturnValue({ push, query });
  });

  it('should render the form with campaign data', async () => {
    const campaign = {
      id: 1,
      nome: 'Campaign 1',
      dataInicio: '2024-06-10',
      dataFim: '2024-06-20',
      status: 'ativa',
      categoria: 'marketing',
    };

    axios.get.mockResolvedValue({ data: campaign });

    render(
      React.createElement(ThemeProvider, { theme: theme },
        React.createElement(EditCampaign, null)
      )
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Name').value).toBe('Campaign 1');
      expect(screen.getByLabelText('Start Date').value).toBe('2024-06-10');
      expect(screen.getByLabelText('End Date').value).toBe('2024-06-20');
      expect(screen.getByLabelText('Category').value).toBe('marketing');
    });
  });

  it('should update the campaign', async () => {
    axios.get.mockResolvedValue({ data: { id: 1, nome: 'Campaign 1', dataInicio: '2024-06-10', dataFim: '2024-06-20', status: 'ativa', categoria: 'marketing' } });
    axios.put.mockResolvedValue({});

    render(
      React.createElement(ThemeProvider, { theme: theme },
        React.createElement(EditCampaign, null)
      )
    );

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Updated Campaign' } });
    fireEvent.click(screen.getByText('Update'));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('/api/campaigns/1', expect.any(Object));
      expect(push).toHaveBeenCalledWith('/campaign/1');
    });
  });
});
