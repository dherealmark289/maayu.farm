import { fetchTeamMembers } from "../../lib/fetchData";
import TeamClient from "../ui/TeamClient";

export default async function TeamPage() {
  // Fetch data at build time for static generation
  const members = await fetchTeamMembers();

  return <TeamClient initialMembers={members} />;
}


