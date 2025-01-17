import { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { groupBy } from "lodash";

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

  const groupedItems = groupBy(items, (i) => i.section.name); // name, id, category

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {Object.entries(groupedItems).map(([sectionName, sectionItems]) => (
            <Accordion
              defaultExpanded
              key={sectionName}
              sx={{ backgroundColor: "grey.900" }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">{sectionName}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  {sectionItems.slice(0, 20).map((item) => (
                    <Grid item key={item.mainId} xs={12} sm={4} md={3}>
                      <Card sx={{ position: "relative" }}>
                        <CardMedia
                          component="img"
                          image={
                            item.displayAssets[0].background ||
                            item.displayAssets[0].url
                          }
                          alt={item.displayName}
                        />
                        <CardContent
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            pt: 5,
                            background:
                              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
                          }}
                        >
                          <Typography variant="h6" noWrap>
                            {item.displayName}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ pb: 0 }}
                          >
                            {item.price.finalPrice} V-Bucks
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}
    </>
  );
};

export { ShopList };
