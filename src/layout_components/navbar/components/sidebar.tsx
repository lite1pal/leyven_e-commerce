import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import MenuIcon from "@/icons/menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Footer } from "flowbite-react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import HealingIcon from "@mui/icons-material/Healing";
import CelebrationIcon from "@mui/icons-material/Celebration";

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      //   if (
      //     event.type === "keydown" &&
      //     ((event as React.KeyboardEvent).key === "Tab" ||
      //       (event as React.KeyboardEvent).key === "Shift")
      //   ) {
      //     return;
      //   }

      setOpen(inOpen);
    };

  return (
    <Box sx={{ display: "flex" }}>
      {/* <Button variant="outlined" color="neutral" onClick={toggleDrawer(true)}>
        Open drawer
      </Button> */}
      <div onClick={toggleDrawer(true)}>
        <MenuIcon />
      </div>
      <Drawer size="sm" open={open} onClose={toggleDrawer(false)}>
        <Footer.Brand
          href="/"
          src="https://images.prom.ua/4809555867_w100_h50_leyven.jpg"
          alt="Flowbite Logo"
          name=""
          className="p-4"
        />
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem sx={{ padding: "1rem", paddingTop: "0" }}>
              <AccountCircleIcon fontSize="large" color="primary" />
              <div>Denis Tarasenko</div>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton sx={{ padding: "1rem" }}>
                <FormatListBulletedIcon color="primary" />
                <div>Категорії товару</div>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton sx={{ padding: "1rem" }}>
                <ShoppingCartIcon color="primary" />
                <div>Кошик</div>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton sx={{ padding: "1rem" }}>
                <FoodBankIcon color="primary" />
                <div>Годування</div>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton sx={{ padding: "1rem" }}>
                <HealingIcon color="primary" />
                <div>Ветеринарна аптека</div>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton sx={{ padding: "1rem" }}>
                <CelebrationIcon color="primary" />
                <div>Ігри та розваги</div>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>Контакти</ListItem>
            <ListItem>Про нас</ListItem>
            <ListItem>Відгуки</ListItem>
            <ListItem>Сертифікації</ListItem>
            <ListItem>Цікаві факти</ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
