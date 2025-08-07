import InternalLayout from "../layout/InternalLayout";

export default function NewCampaignPage() {
  return (
    <InternalLayout>
      <div className="w-full px-0 py-10">
        <iframe
          className="w-full h-[1000px]"
          src="https://forms.fillout.com/t/umZFxzNKgUus"
          frameBorder="0"
          style={{ background: "transparent", border: "none" }}
          allowFullScreen
        />
      </div>
    </InternalLayout>
  );
}
