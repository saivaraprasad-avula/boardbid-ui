// src/components/DashboardPreview.jsx
export default function DashboardPreview() {
  return (
    <section className="py-20 px-6 text-center bg-gray-50 animate-fadeIn mb-12">
      <h2 className="text-3xl font-bold font-sans mb-6 animate-slideUp">Advertiser Dashboard Preview</h2>
      <p className="text-gray-600 mb-10">
        A glimpse into what our booking and reporting interface will look like.
      </p>
      <div className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-xl border border-gray-200 hover:shadow-2xl transition duration-500">
        <img
          src="https://ik.imagekit.io/boardbid/dashboard-mockup.avif?updatedAt=1748064547822"
          alt="Advertiser Dashboard Preview"
          className="w-full h-auto"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
