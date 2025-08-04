import InternalLayout from "../layout/InternalLayout";

export default function NewCampaignPage() {
  return (
    <InternalLayout>
      <div className="max-w-5xl mx-auto w-full">
        <iframe
          src="https://airtable.com/embed/appq8sWGxB7KeB9EQ/pag0MpfZJx4fS4mMY/form"
          className="airtable-embed airtable-dynamic-height w-full"
          frameBorder="0"
          onWheel=""
          style={{ background: "transparent", border: "1px solid #ccc", height: '1300px' }}
        />
      </div>
    </InternalLayout>
  );
}
