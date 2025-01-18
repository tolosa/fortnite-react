import { Container, Typography } from "@mui/material";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ShopList } from "./components/ShopList";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#242424",
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme} noSsr>
    <CssBaseline />
    <Container sx={{ maxWidth: "lg", mx: "auto" }}>
      <Typography variant="h4" sx={{ my: 4, ml: "10px" }}>
        Fortnite Daily Shop
      </Typography>
      <ShopList />
    </Container>
  </ThemeProvider>
);

export default App;
