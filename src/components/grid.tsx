import { Grid } from "@mui/joy";
import Card from "./card";
import BasicBreadcrumbs from "./breadCrumbs";
import PaginationComponent from "./pagination";

export default function GridComponent() {
  return (
    <>
      <BasicBreadcrumbs />
      <Grid
        container
        spacing={{ xs: 2, md: 3.5 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ flexGrow: 1 }}
        marginBottom={"2.5rem"}
        marginX={"1rem"}
        padding={"0"}
      >
        {Array.from(Array(12)).map((_, index) => (
          <Grid xs={2} sm={4} md={3} key={index}>
            <Card
              title="Премікс 1% для курей-несучок 500 г"
              price="26,22"
              src="https://ukrzoovet.com.ua/storage/products/small/W6qJ1XiQLqaTgTev1fEy0hdj8Z0dKtfkzPeKqBPo.png"
            />
          </Grid>
        ))}
      </Grid>
      <PaginationComponent />
    </>
  );
}
