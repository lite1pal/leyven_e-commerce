"use client";

import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Switch from "@mui/joy/Switch";

export default function SwitchAvailability() {
  const [checked, setChecked] = React.useState<boolean>(false);
  return (
    <FormControl
      orientation="horizontal"
      //   sx={{ width: 300, justifyContent: "space-between" }}
    >
      <div>
        <FormLabel>Товари не в наявності</FormLabel>
        {/* <FormHelperText sx={{ mt: 0 }}>Товари не в наявності</FormHelperText> */}
      </div>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        color={checked ? "success" : "neutral"}
        variant={checked ? "solid" : "outlined"}
        endDecorator={checked ? "On" : "Off"}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
  );
}
