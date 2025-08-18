import Header from '../components/Header'
import Footer from '../components/Footer'
import PricingCTA from '../components/PricingCTA'

export default function Pricing() {
  return (
    <>
      <Header />
      <section className="bg-white py-20 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Pricing
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Choose the plan that best suits your campaign goals.
          </p>
        </div>
      </section>
      <PricingCTA />
      <Footer />
    </>
  )
}

