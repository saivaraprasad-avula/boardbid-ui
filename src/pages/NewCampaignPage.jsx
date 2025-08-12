import InternalLayout from "../layout/InternalLayout";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

export default function NewCampaignPage() {
  return (
    <InternalLayout>
      <PageHeader title="New Campaign" />
      <Card title="New Campaign Form">
        <iframe
          className="w-full h-[1000px]"
          src="https://forms.fillout.com/t/umZFxzNKgUus"
          frameBorder="0"
          style={{ background: "transparent", border: "none" }}
          allowFullScreen
        />
      </Card>
    </InternalLayout>
  );
}
