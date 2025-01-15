import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      console.log("key", import.meta.env.VITE_FORTNITE_API_KEY);
      try {
        const response = await axios.get("https://fortniteapi.io/v2/shop", {
          headers: {
            Authorization: import.meta.env.VITE_FORTNITE_API_KEY,
          },
        });
        setItems(response.data.shop);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the Fortnite shop data:", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Fortnite Daily Shop
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4}>
          {items.map((item) => (
            <Grid item key={item.mainId} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  image={
                    item.displayAssets[0].background ||
                    item.displayAssets[0].url
                  }
                  alt={item.displayName}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.displayName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.price.regularPrice} V-Bucks
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default App;
