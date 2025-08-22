import { useUser } from "@clerk/clerk-react";
import InternalLayout from "../layout/InternalLayout";
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
          src={`https://boardbid.fillout.com/new-campaign?user_id=${encodeURIComponent(
            userId
          )}`}
          frameBorder="0"
          style={{ background: "transparent", border: "none" }}
          allowFullScreen
        />
      </Card>
    </InternalLayout>
  );
}
