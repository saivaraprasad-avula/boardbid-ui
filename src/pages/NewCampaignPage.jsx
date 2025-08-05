import InternalLayout from "../layout/InternalLayout";

export default function NewCampaignPage() {
  return (
    <InternalLayout>
      <div className="max-w-5xl mx-auto w-full">
        <iframe
          className="airtable-embed"
          src="https://airtable.com/embed/appq8sWGxB7KeB9EQ/pag0MpfZJx4fS4mMY/form"
          frameBorder="0"
          width="100%"
          height="1000"
          style={{ background: "transparent", border: "1px solid #ccc" }}
        />
      </div>
    </InternalLayout>
  );
}
