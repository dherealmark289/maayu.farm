import { fetchGalleryAlbums } from "../../lib/fetchData";
import GalleryClient from "../ui/GalleryClient";

export default async function GalleryPage() {
  // Fetch data at build time for static generation
  const albums = await fetchGalleryAlbums();

  return <GalleryClient initialAlbums={albums} />;
}

