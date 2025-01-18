import { Container, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import { ShopList } from "./components/ShopList";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const App = () => (
  <ThemeProvider theme={theme} noSsr>
    <Container sx={{ maxWidth: "lg", mx: "auto" }}>
      <Typography variant="h4" sx={{ my: 4, ml: "10px" }}>
        Fortnite Daily Shop
      </Typography>
      <ShopList />
    </Container>
  </ThemeProvider>
);

export default App;
