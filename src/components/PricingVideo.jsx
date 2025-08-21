export default function PricingVideo() {
  return (
    <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-lg aspect-video">
        <iframe
          src="https://www.youtube.com/embed/VzCY-NefSQE?rel=0&modestbranding=1&playsinline=1&showinfo=0"
          title="BoardBid.ai Video"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        ></iframe>
      </div>
    </div>
  )
}
