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
  Icon,
  MenuItem,
  Divider,
  AppBar,
  Container,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { groupBy } from "lodash";

const sanitizeTypes = (items) => {
  items.forEach((i) => {
    i.displayType = i.displayType.replace(/\d+/g, "").trim();
  });
};

const ShopList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("https://fortniteapi.io/v2/shop", {
          headers: {
            Authorization: import.meta.env.VITE_FORTNITE_API_KEY,
          },
        });
        console.log("Fortnite shop data:", response.data);
        sanitizeTypes(response.data.shop);
        setItems(response.data.shop);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the Fortnite shop data:", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const itemTypes = new Set(items.map((i) => i.displayType));
  const filteredItems = selectedType
    ? items.filter((i) => i.displayType === selectedType)
    : items;
  const groupedItems = groupBy(filteredItems, (i) => i.section.name); // name, id, category
  return (
    <>
      <AppBar position="sticky" sx={{ mb: 2 }}>
        <Container
          sx={{
            maxWidth: "lg",
            mx: "auto",
            display: "flex",
            alignItems: "center",
            py: 1.5,
          }}
        >
          <img
            fetchPriority="high"
            alt="Fortnite Logo"
            src="fortniteLogo.svg"
            width="100"
          />
          <Typography variant="h5" sx={{ flexGrow: 1, ml: "1ex" }}>
            Daily Item Shop
          </Typography>
          <TextField
            select
            label="Filter"
            size="small"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            sx={{ minWidth: 120 }}
            disabled={!itemTypes.size}
            defaultValue={""}
          >
            <MenuItem key="all" value={""}>
              All
            </MenuItem>
            <Divider />
            {Array.from(itemTypes).map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Container>
      </AppBar>
      <Container sx={{ maxWidth: "lg", mx: "auto" }}>
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
                  <Typography variant="h5" color="text.secondary">
                    {sectionName}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    {sectionItems.slice(0, 20).map((item) => (
                      <Grid item key={item.mainId} xs={12} sm={4} md={3}>
                        <Card
                          sx={{
                            position: "relative",
                            "&:hover .MuiTypography-body2": {
                              visibility: "visible",
                            },
                            "& .MuiCardContent-root": {
                              pb: "1.1rem",
                            },
                          }}
                        >
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
                              pt: 2,
                              background:
                                "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ visibility: "hidden" }}
                            >
                              {item.displayType}
                            </Typography>
                            <Typography variant="h6" noWrap>
                              {item.displayName}
                            </Typography>
                            <Typography
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <Icon
                                sx={{
                                  fontSize: "1.3rem",
                                  mr: "3px",
                                }}
                              >
                                paid
                              </Icon>
                              <strong>{item.price.finalPrice}</strong>
                              &nbsp;
                              <Typography
                                color="text.secondary"
                                component="span"
                              >
                                V-Bucks
                              </Typography>
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
      </Container>
    </>
  );
};

export { ShopList };
