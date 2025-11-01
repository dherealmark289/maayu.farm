import { fetchExperiences } from "../../lib/fetchData";
import ExperiencesClient from "../ui/ExperiencesClient";

export default async function ExperiencesPage() {
  // Fetch data at build time for static generation
  const experiences = await fetchExperiences();
  
  // Extract unique categories from experiences
  const uniqueCategories = experiences && experiences.length > 0
    ? ["All", ...new Set(experiences.map(exp => exp.category).filter(Boolean))]
    : ["All", "Wellness", "Adventure", "Recovery", "Farm Life", "Craft & Build"];

  return <ExperiencesClient initialExperiences={experiences} initialCategories={uniqueCategories} />;
}

