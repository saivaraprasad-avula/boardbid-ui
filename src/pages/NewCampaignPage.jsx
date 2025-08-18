import InternalLayout from "../layout/InternalLayout";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

export default function NewCampaignPage() {
  return (
    <InternalLayout>
      <Card title="New Campaign Form">
        <iframe
          className="w-full h-[1000px]"
          src="https://forms.fillout.com/t/umZFxzNKgUus?hideCookieBanner=true"
          frameBorder="0"
          style={{ background: "transparent", border: "none" }}
          allowFullScreen
        />
      </Card>
    </InternalLayout>
  );
}
