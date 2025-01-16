import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

const ShopList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("https://fortniteapi.io/v2/shop", {
          headers: {
            Authorization: import.meta.env.VITE_FORTNITE_API_KEY,
          },
        });
        console.log("Fortnite shop data:", response.data);
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
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4}>
          {items.map((item) => (
            <Grid item key={item.mainId} xs={12} sm={4} md={3}>
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
    </>
  );
};

export { ShopList };
