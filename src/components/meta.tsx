import { Roboto } from "next/font/google";
import BasicBreadcrumbs from "./breadCrumbs";
import {
  AspectRatio,
  Divider,
  Dropdown,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  Skeleton,
} from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const roboto = Roboto({ subsets: ["latin"], weight: "300" });

export default function Meta({ data }: any) {
  return (
    <>
      <BasicBreadcrumbs />
      <div
        className={`${roboto.className} flex justify-between items-center px-8 mb-4 w-full`}
      >
        <div className={`text-lg font-bold`}>{data?.length} товарів</div>
        <Dropdown>
          <MenuButton
            sx={{ border: "none", fontWeight: "400" }}
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
          >
            За популярністю
            <KeyboardArrowDownIcon />
          </MenuButton>

          <Menu>
            <MenuItem>За новизною</MenuItem>
            <MenuItem>За знижкою</MenuItem>
            <MenuItem>Від найдешевших</MenuItem>
            <MenuItem>Від найдорожчих</MenuItem>
          </Menu>
        </Dropdown>
      </div>
    </>
  );
}
