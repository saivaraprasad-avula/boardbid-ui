import InternalLayout from '../layout/InternalLayout';
import NewCampaign from '../components/NewCampaign';

export default function NewCampaignPage() {
  return (
    <InternalLayout>
      <div className="max-w-5xl mx-auto w-full">
        <NewCampaign />
      </div>
    </InternalLayout>
  );
}
