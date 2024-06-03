import { Container, CssBaseline, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../utils/theme';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Campaign Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={4}>
          {children}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;