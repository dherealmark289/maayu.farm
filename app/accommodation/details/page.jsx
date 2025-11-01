import { fetchAccommodation } from "../../../lib/fetchData";
import AccommodationDetailsClient from "./AccommodationDetailsClient";

export default async function AccommodationDetailsPage() {
  // Fetch data at build time for static generation
  const accommodations = await fetchAccommodation();
  // Filter available accommodations
  const availableAccommodations = accommodations.filter(acc => acc.available !== false);

  return <AccommodationDetailsClient initialAccommodations={availableAccommodations} />;
}

