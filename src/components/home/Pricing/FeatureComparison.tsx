import { Check, X } from "lucide-react";

const FeatureComparison = () => {
    const features = [
        {
            name: "AI-Powered Interview Analysis",
            perCandidate: true,
            payAsYouGo: true,
            enterprise: true,
            description: "Analyze interviews with advanced AI algorithms"
        },
        {
            name: "Candidate Evaluation",
            perCandidate: true,
            payAsYouGo: true,
            enterprise: true,
            description: "Standardized metrics to evaluate candidates"
        },
        {
            name: "Basic Reporting",
            perCandidate: true,
            payAsYouGo: true,
            enterprise: true,
            description: "Essential reporting capabilities"
        },
        {
            name: "Advanced Analytics",
            perCandidate: false,
            payAsYouGo: true,
            enterprise: true,
            description: "Comprehensive data insights and trends"
        },
        {
            name: "Custom Evaluation Criteria",
            perCandidate: false,
            payAsYouGo: true,
            enterprise: true,
            description: "Tailor evaluation metrics to your needs"
        },
        {
            name: "Team Collaboration",
            perCandidate: false,
            payAsYouGo: true,
            enterprise: true,
            description: "Collaborate with team members on hiring decisions"
        },
        {
            name: "Priority Support",
            perCandidate: false,
            payAsYouGo: true,
            enterprise: true,
            description: "Get faster responses to your support inquiries"
        },
        {
            name: "Dedicated Account Manager",
            perCandidate: false,
            payAsYouGo: false,
            enterprise: true,
            description: "Personal support from a dedicated manager"
        },
        {
            name: "Custom Integration",
            perCandidate: false,
            payAsYouGo: false,
            enterprise: true,
            description: "Integrate with your existing HR systems"
        },
        {
            name: "Unlimited Users",
            perCandidate: false,
            payAsYouGo: false,
            enterprise: true,
            description: "Add as many team members as needed"
        },
    ];

    return (
        <section className="py-16 px-4 md:px-8  bg-gradient-to-b from-purple-50 to-white">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold  mb-4">Feature Comparison</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Compare our pricing plans to find the perfect fit for your hiring needs.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all duration-700">
                        <thead>
                            <tr>
                                <th className="py-6 px-4 text-left font-medium border-b ">Features</th>
                                <th className="py-6 px-4 text-center font-medium border-b ">Per-Candidate</th>
                                <th className="py-6 px-4 text-center font-medium border-b ">Pay-As-You-Go</th>
                                <th className="py-6 px-4 text-center font-medium border-b ">Enterprise</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-upzella-50"}>
                                    <td className="py-4 px-4">
                                        <div className="font-medium">{feature.name}</div>
                                        <div className="text-sm text-gray-600">{feature.description}</div>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        {feature.perCandidate ? (
                                            <Check className="w-7 h-7 text-white bg-purple-600 rounded-full mx-auto p-1" size={24} />
                                        ) : (
                                            <X className="w-5 h-5 text-upzella-300 mx-auto" />
                                        )}
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        {feature.payAsYouGo ? (
                                            <Check className="w-7 h-7 text-white bg-purple-600 rounded-full mx-auto p-1" size={24} />
                                        ) : (
                                            <X className="w-5 h-5 text-upzella-300 mx-auto" />
                                        )}
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        {feature.enterprise ? (
                                            <Check className="w-7 h-7 text-white bg-purple-600 rounded-full mx-auto p-1" size={24} />
                                        ) : (
                                            <X className="w-5 h-5 text-upzella-300 mx-auto" />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default FeatureComparison;
