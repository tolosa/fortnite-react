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
    <ShopList />
  </ThemeProvider>
);

export default App;
