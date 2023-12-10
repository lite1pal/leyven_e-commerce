import GridComponent from "../../components/grid";
import SupportDrawer from "../../components/supportDrawer";

export default async function CatalogView({ session, data }: any) {
  return (
    <>
      <SupportDrawer />
      <GridComponent session={session} data={data} />
    </>
  );
}
