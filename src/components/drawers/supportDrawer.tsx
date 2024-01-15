"use client";

import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Label, Textarea } from "flowbite-react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BugReportIcon from "@mui/icons-material/BugReport";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import BuildIcon from "@mui/icons-material/Build";
import Button from "../base/Button";

export default function SupportDrawer() {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("Guesthouse");

  return (
    <React.Fragment>
      <div
        onClick={() => setOpen(true)}
        className="animate fixed bottom-3 right-3 z-10 flex cursor-pointer gap-1 rounded-full border-2 border-blue-600 bg-blue-600 p-2.5 text-lg text-white transition hover:bg-white hover:text-blue-600 md:bottom-10 md:right-10"
      >
        {/* <span
          style={{ animation: "ping 5s cubic-bezier(0, 0, 0.2, 1) infinite" }}
          className="absolute left-0 top-0 h-full w-full rounded-full bg-sky-600 opacity-50"
        ></span> */}
        <QuestionMarkIcon fontSize="large" />
      </div>

      <Drawer
        anchor="right"
        size="md"
        variant="plain"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          content: {
            sx: {
              bgcolor: "transparent",
              boxShadow: "none",
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: "md",
            p: 2,
            m: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "fit-content",
            overflow: "auto",
          }}
        >
          <DialogTitle>Підтримка</DialogTitle>
          <ModalClose />
          <Divider sx={{ mt: "auto" }} />
          <DialogContent sx={{ gap: 2 }}>
            <FormControl>
              <FormLabel sx={{ typography: "title-md", fontWeight: "bold" }}>
                Тип проблеми
              </FormLabel>
              <RadioGroup
                value={type || ""}
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: 1.5,
                  }}
                >
                  {[
                    {
                      name: "Замовлення",
                      icon: <ShoppingCartIcon />,
                    },
                    {
                      name: "Баг на сайті",
                      icon: <BugReportIcon />,
                    },
                    {
                      name: "Співпраця",
                      icon: <CompareArrowsIcon />,
                    },
                    {
                      name: "Інше",
                      icon: <BuildIcon />,
                    },
                  ].map((item) => (
                    <Card
                      key={item.name}
                      sx={{
                        boxShadow: "none",
                        "&:hover": {
                          bgcolor: "background.level1",
                        },
                      }}
                    >
                      <CardContent>
                        {item.icon}
                        <Typography level="title-md">{item.name}</Typography>
                      </CardContent>
                      <Radio
                        disableIcon
                        overlay
                        checked={type === item.name}
                        variant="outlined"
                        color="neutral"
                        value={item.name}
                        sx={{ mt: -2 }}
                        slotProps={{
                          action: {
                            sx: {
                              ...(type === item.name && {
                                borderWidth: 2,
                                borderColor:
                                  "var(--joy-palette-primary-outlinedBorder)",
                              }),
                              "&:hover": {
                                bgcolor: "transparent",
                              },
                            },
                          },
                        }}
                      />
                    </Card>
                  ))}
                </Box>
              </RadioGroup>
            </FormControl>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Ваше повідомлення" />
              </div>
              <Textarea
                id="comment"
                placeholder="Залиште повідомлення і наш спеціаліст з вами зв`яжеться"
                required
                rows={4}
              />
            </div>

            <Button title="Відправити" />
          </DialogContent>
        </Sheet>
      </Drawer>
    </React.Fragment>
  );
}
