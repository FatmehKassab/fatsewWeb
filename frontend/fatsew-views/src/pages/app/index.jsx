import { benefitSections, pricingPlans } from "../../utils/data";
import React from "react";

function FeaturesPage() {
  return (
    <div className="px-6 py-12 space-y-16">
      {/* Benefit Sections */}
      <div className="grid md:grid-cols-2 gap-10">
        {benefitSections.map((section, index) => (
          <div key={index}>
            <h2 className={`text-xl font-bold mb-2 ${section.color}`}>{section.title}</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {section.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <img src={section.image} alt={section.title} className="w-40 mt-6" />
          </div>
        ))}
      </div>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow ${plan.bgColor} flex flex-col items-center`}
          >
            <h3 className="text-xl font-bold">{plan.name}</h3>
            {plan.subtext && <p className="text-sm text-gray-500">{plan.subtext}</p>}
            <p className="text-2xl font-bold my-4">{plan.price}</p>
            <ul className="text-sm text-gray-700 space-y-1 mb-4">
              {plan.features.map((feature, i) => (
                <li key={i}>✓ {feature}</li>
              ))}
            </ul>
            <button
              className={`px-4 py-2 text-white rounded-full font-semibold ${plan.buttonColor}`}
            >
              Sign up now!
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturesPage;
