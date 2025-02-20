import { plans } from "@/config/constants";
import { Button } from "@heroui/button";

export default function PricesPage() {
  return (
    <main className="max-w-screen-lg mx-auto p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center">Pricing Plans</h1>
      <p className="text-gray-600 mt-2 text-center">
        Choose the plan that best suits your needs.
      </p>
      <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`space-y-4 border border-neutral-300 rounded-2xl p-6 text-center transition ${
              plan.popular ? "border-blue-600 ring-2 ring-blue-400" : ""
            }`}
          >
            <h2 className="text-2xl font-semibold">{plan.name}</h2>
            <p className="text-3xl font-bold">{plan.price}</p>
            <p className="text-gray-500">{plan.annual}</p>
            <ul className="mt-4 space-y-1 text-gray-600 text-left">
              {Object.entries(plan.features).map(([key, value], i) => (
                <li key={i} className="flex items-center space-x-2">
                  {value === true
                    ? "✅"
                    : value === false
                    ? "❌"
                    : `✅ ${value}`}
                  <span>{key}</span>
                </li>
              ))}
            </ul>
            <Button color="primary" className="w-full">
              Choose Plan
            </Button>
          </div>
        ))}
      </section>
    </main>
  );
}
