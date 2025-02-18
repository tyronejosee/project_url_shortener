import { plans } from "@/config/constants";
import { Button } from "@heroui/button";

export default function PricesPage() {
  return (
    <div className="min-h-screen flex flex-col items-center py-6 px-4">
      <h1 className="text-4xl font-bold text-center">Pricing Plans</h1>
      <p className="text-gray-600 mt-2 text-center">
        Choose the plan that best suits your needs.
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`space-y-4 border border-neutral-300 rounded-xl p-6 text-center hover:shadow-xl transition ${
              plan.popular ? "border-blue-600 ring-4 ring-blue-400" : ""
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
      </div>
    </div>
  );
}
