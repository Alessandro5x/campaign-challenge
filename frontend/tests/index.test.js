const React = require('react');
const { render, screen, waitFor } = require('@testing-library/react');
const axios = require('axios');
const Home = require('../pages/index').default;
const { ThemeProvider } = require('@mui/material/styles');
const theme = require('../utils/theme').default;

jest.mock('axios');

describe('Home Page', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the list of campaigns', async () => {
    const campaigns = [
      { id: 1, nome: 'Campaign 1' },
      { id: 2, nome: 'Campaign 2' },
    ];

    axios.get.mockResolvedValue({ data: campaigns });

    render(
      React.createElement(ThemeProvider, { theme: theme },
        React.createElement(Home, null)
      )
    );

    await waitFor(() => {
      expect(screen.getByText('Campaign 1')).toBeInTheDocument();
      expect(screen.getByText('Campaign 2')).toBeInTheDocument();
    });
  });

  it('should render create new campaign link', () => {
    render(
      React.createElement(ThemeProvider, { theme: theme },
        React.createElement(Home, null)
      )
    );

    expect(screen.getByText('Create New Campaign')).toBeInTheDocument();
  });
});
