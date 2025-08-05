import InternalLayout from "../layout/InternalLayout";
import DoohCampaignRequestForm from "../components/DoohCampaignRequestForm";

export default function NewCampaignPage() {
  return (
    <InternalLayout>
      <div className="max-w-5xl mx-auto w-full">
        <DoohCampaignRequestForm />
      </div>
    </InternalLayout>
  );
}
