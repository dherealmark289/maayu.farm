import { fetchAccommodation } from "../../../../lib/fetchData";
import PropertyDetailsClient from "./PropertyDetailsClient";

export default async function PropertyDetailsPage({ params }) {
  const accommodations = await fetchAccommodation();
  const propertyId = params.id;
  
  // Find the property by ID or name
  const property = accommodations.find(acc => {
    const idMatch = acc.id === propertyId;
    const nameMatch = acc.name?.toLowerCase().replace(/\s+/g, '-') === propertyId;
    return idMatch || nameMatch;
  });

  if (!property) {
    return <div>Property not found</div>;
  }

  return <PropertyDetailsClient property={property} />;
}

