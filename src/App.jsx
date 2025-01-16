import { Container, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import { ShopList } from "./components/ShopList";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const App = () => (
  <>
    <ThemeProvider theme={theme} defaultMode="dark" noSsr>
      <Container
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Fortnite Daily Shop
        </Typography>
        <ShopList />
      </Container>
    </ThemeProvider>
  </>
);

export default App;
