import { redirect } from "next/navigation";

export default async function SetupRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/playbook/${slug}`);
}
