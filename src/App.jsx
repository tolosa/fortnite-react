import { Container, Typography } from "@mui/material";
import { ShopList } from "./components/ShopList";

const App = () => (
  <Container sx={{ marginTop: 4 }}>
    <Typography variant="h4" gutterBottom align="center">
      Fortnite Daily Shop
    </Typography>
    <ShopList />
  </Container>
);

export default App;
