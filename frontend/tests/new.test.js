const React = require('react');
const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const axios = require('axios');
const NewCampaign = require('../pages/new').default;
const { ThemeProvider } = require('@mui/material/styles');
const theme = require('../utils/theme').default;
const { useRouter } = require('next/router');

jest.mock('axios');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('New Campaign Page', () => {
  const push = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push });
  });

  it('should render the form', () => {
    render(
      React.createElement(ThemeProvider, { theme: theme },
        React.createElement(NewCampaign, null)
      )
    );

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Start Date')).toBeInTheDocument();
    expect(screen.getByLabelText('End Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
  });

  it('should create a new campaign', async () => {
    axios.post.mockResolvedValue({});

    render(
      React.createElement(ThemeProvider, { theme: theme },
        React.createElement(NewCampaign, null)
      )
    );

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'New Campaign' } });
    fireEvent.change(screen.getByLabelText('Start Date'), { target: { value: '2024-06-10' } });
    fireEvent.change(screen.getByLabelText('End Date'), { target: { value: '2024-06-20' } });
    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'marketing' } });
    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/campaigns', expect.any(Object));
      expect(push).toHaveBeenCalledWith('/');
    });
  });
});
