export default function PricingVideo() {
  return (
    <section aria-labelledby="pricing-video" className="mx-auto mt-16 max-w-4xl">
      <h3 id="pricing-video" className="sr-only">How pricing works (video)</h3>

      <div className="relative overflow-hidden rounded-2xl ring-1 ring-gray-200 shadow-sm bg-white">
        <div className="aspect-video">
          <iframe
            src="https://www.youtube.com/embed/pBG1pxlcyS8?rel=0&modestbranding=1&playsinline=1&showinfo=0&iv_load_policy=3&cc_load_policy=1"
            title="BoardBid.ai — How CPM Pricing Works"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>

      <p className="mt-3 text-center text-sm text-gray-500">
        What is CPM in 45 seconds: a quick overview of how our pricing works
      </p>
    </section>
  );
}