import { useUser } from "@clerk/clerk-react";   // ✅ import from Clerk
import InternalLayout from "../layout/InternalLayout";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

export default function NewCampaignPage() {
  const { user } = useUser(); // gives you the logged-in Clerk user object

  // Guard: don’t render iframe until we have a user
  if (!user) {
    return (
      <InternalLayout>
        <Card title="New Campaign Form">
          <p className="text-gray-600 text-sm">Loading user session...</p>
        </Card>
      </InternalLayout>
    );
  }

  const userId = user.id; // Clerk’s unique user id

  return (
    <InternalLayout>
      <Card title="New Campaign Form">
        <iframe
          className="w-full h-[1000px]"
          src={`https://forms.fillout.com/t/umZFxzNKgUus?user_id=${userId}`}
          frameBorder="0"
          style={{ background: "transparent", border: "none" }}
          allowFullScreen
        />
      </Card>
    </InternalLayout>
  );
}