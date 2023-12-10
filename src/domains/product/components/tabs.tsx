import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import AllAbout from "./allAbout";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TabsComponent() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);

  const params = useParams();

  const getProduct = async () => {
    try {
      const res = await fetch(`/api/product?id=${params.id}`);
      if (!res.ok) {
        return "Failed to fetch a product";
      }
      const parsedRes = await res.json();
      setData(parsedRes);
    } catch (err) {
      console.error("Failed to fetch a product");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <Box
      bgcolor={"white"}
      sx={{
        flexGrow: 1,
        m: -2,
        overflowX: "hidden",
      }}
    >
      <Tabs
        aria-label="Pipeline"
        value={index}
        sx={{ backgroundColor: "white" }}
        onChange={(event, value) => setIndex(value as number)}
      >
        <TabList
          sx={{
            pt: 1,
            // justifyContent: "center",
            [`&& .${tabClasses.root}`]: {
              flex: "initial",
              bgcolor: "transparent",
              "&:hover": {
                bgcolor: "transparent",
              },
              [`&.${tabClasses.selected}`]: {
                color: "primary.plainColor",
                "&::after": {
                  height: 2,
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                  bgcolor: "primary.500",
                },
              },
            },
          }}
        >
          <Tab indicatorInset>Все про товар </Tab>
          <Tab indicatorInset>Характеристики </Tab>
          <Tab indicatorInset>
            Відгуки{" "}
            <Chip
              size="sm"
              variant="soft"
              color={index === 2 ? "primary" : "neutral"}
            >
              8
            </Chip>
          </Tab>
          <Tab indicatorInset>Купують разом</Tab>
        </TabList>
        <Box
          sx={(theme) => ({
            "--bg": theme.vars.palette.background.surface,
            boxShadow: "0 0 0 100vmax var(--bg)",
            clipPath: "inset(0 -100vmax)",
          })}
        >
          <TabPanel value={0}>
            <AllAbout data={data} />
          </TabPanel>
          <TabPanel value={1}>Характеристики</TabPanel>
          <TabPanel value={2}>Відгуки</TabPanel>
          <TabPanel value={3}>Купують разом</TabPanel>
        </Box>
      </Tabs>
    </Box>
  );
}
