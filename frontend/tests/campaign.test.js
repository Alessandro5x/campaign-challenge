const React = require('react');
const { render, screen, waitFor, fireEvent } = require('@testing-library/react');
const axios = require('axios');
const Campaign = require('../pages/campaign/[id]').default;
const { ThemeProvider } = require('@mui/material/styles');
const theme = require('../utils/theme').default;
const { useRouter } = require('next/router');

jest.mock('axios');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Campaign Page', () => {
  const push = jest.fn();
  const query = { id: '1' };

  beforeEach(() => {
    useRouter.mockReturnValue({ push, query });
  });

  it('should render campaign details', async () => {
    const campaign = {
      id: 1,
      nome: 'Campaign 1',
      status: 'ativa',
      categoria: 'marketing',
      dataInicio: '2024-06-10',
      dataFim: '2024-06-20',
    };

    axios.get.mockResolvedValue({ data: campaign });

    render(
      React.createElement(ThemeProvider, { theme: theme },
        React.createElement(Campaign, null)
      )
    );

    await waitFor(() => {
      expect(screen.getByText('Campaign 1')).toBeInTheDocument();
      expect(screen.getByText('Status: ativa')).toBeInTheDocument();
      expect(screen.getByText('Category: marketing')).toBeInTheDocument();
    });
  });

  it('should delete the campaign', async () => {
    axios.get.mockResolvedValue({ data: { id: 1 } });
    axios.delete.mockResolvedValue({});

    render(
      React.createElement(ThemeProvider, { theme: theme },
        React.createElement(Campaign, null)
      )
    );

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('/api/campaigns/1');
      expect(push).toHaveBeenCalledWith('/');
    });
  });

  it('should navigate to edit page', () => {
    axios.get.mockResolvedValue({ data: { id: 1 } });

    render(
      React.createElement(ThemeProvider, { theme: theme },
        React.createElement(Campaign, null)
      )
    );

    fireEvent.click(screen.getByText('Edit'));

    expect(push).toHaveBeenCalledWith('/edit/1');
  });
});
