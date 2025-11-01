import { fetchAnimals } from "../../lib/fetchData";
import AnimalsClient from "../ui/AnimalsClient";

export default async function AnimalsPage() {
  // Fetch data at build time for static generation
  const animals = await fetchAnimals();

  return <AnimalsClient initialAnimals={animals} />;
}


