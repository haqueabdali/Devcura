import { AdminPageHeading, ContentTable } from "@/components/admin/content-table";
import { getContentSources } from "@/services/admin";
import { getTeamMembers } from "@/services/content";

export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  const [team, sources] = await Promise.all([getTeamMembers(), getContentSources()]);

  return (
    <>
      <AdminPageHeading
        title="Team"
        description="Leadership profiles shown on the About page. Monogram avatars are used until photography is supplied."
      />
      <ContentTable
        entity="team members"
        source={sources.team.source}
        rows={team.map((member) => ({
          id: member.slug,
          title: member.name,
          subtitle: member.role,
          meta: member.focus.join(" · "),
          href: "/about",
        }))}
      />
    </>
  );
}
