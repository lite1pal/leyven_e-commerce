"use client";

import Box from "@mui/joy/Box";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import AllAbout from "./allAbout";
import { useState } from "react";
import Reviews from "./reviews";
import { Chip } from "@mui/joy";
import { type Product } from "@/types";
import { type Session } from "next-auth";

type IProps = {
  data: Product;
  session: Session | null;
};

export default function TabsComponent({ data, session }: IProps) {
  const [index, setIndex] = useState(0);
  return (
    // <AnimatePresence>
    //   <motion.div
    //     initial={{ opacity: 0.75 }}
    //     animate={{ opacity: 1 }}
    //     transition={{ duration: 1 }}
    //   >
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
          {/* <Tab indicatorInset>Відгуки </Tab> */}
          <Tab indicatorInset>
            Відгуки{" "}
            <Chip size="sm" variant="soft" color={"primary"}>
              {data.reviews ? data?.reviews.length : "0"}
            </Chip>
          </Tab>
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
          <TabPanel value={1}>
            <Reviews data={data} session={session} />
          </TabPanel>
        </Box>
      </Tabs>
    </Box>
    //   </motion.div>
    // </AnimatePresence>
  );
}
