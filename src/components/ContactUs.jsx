// src/components/ContactUs.jsx
export default function ContactUs() {
    return (
      <section className="py-20 px-6 text-center bg-gray-50 animate-fadeIn mb-4">
        <div className="flex justify-center">
          <lottie-player
            src="/assets/access-lock.json"
            background="transparent"
            speed="1"
            style={{ width: 80, height: 80 }}
            autoPlay
            loop
          />
        </div>
        <div className="py-12 text-center">
          <h3 className="text-2xl font-semibold mb-4 animate-slideUp">Ready to Get Started?</h3>
          <p className="text-gray-700 mb-6">
            We’re now onboarding early advertisers. Request access or contact us if you have any questions — we’d love to
            hear from you.
          </p>
  
          <a
            href="mailto:founders@boardbid.ai"
            className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition duration-300"
          >
            Request Access
          </a>
        </div>
      </section>
    );
  }
  