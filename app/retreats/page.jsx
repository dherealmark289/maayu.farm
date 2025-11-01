import { fetchWorkshops } from "../../lib/fetchData";
import RetreatsClient from "../ui/RetreatsClient";

export default async function RetreatsPage() {
  // Fetch data at build time for static generation
  const workshops = await fetchWorkshops();

  return <RetreatsClient initialWorkshops={workshops} />;
}


