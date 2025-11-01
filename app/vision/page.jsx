import { fetchVisionContent } from "../../lib/fetchData";
import VisionClient from "../ui/VisionClient";

export default async function VisionPage() {
  // Fetch data at build time for static generation
  const visionContent = await fetchVisionContent();

  return <VisionClient visionContent={visionContent} />;
}


