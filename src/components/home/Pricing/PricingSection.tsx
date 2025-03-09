import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import {
    Check,
    BadgeDollarSign,
    Database,
    CreditCard
} from "lucide-react";

function PricingSection() {
    return (

        <section className="py-10 px-4 md:px-8 bg-white">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
                Pricing Model
              </span>
                    <h2 className="text-3xl font-bold text-black mb-4">Choose the Right Plan for Your Hiring Needs</h2>
                    <p className="text-purple-1100/50 max-w-2xl mx-auto">
                        Whether you're processing individual candidates or hiring at scale, UpZella offers flexible pricing
                        models that adapt to your recruitment requirements.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Per-Candidate Pricing */}
                    <div className="bg-white rounded-2xl border border-purple-200 p-8 hover:shadow-lg transition-shadow duration-300 relative flex flex-col h-full">
                        <div className="mb-8">
                            <div className="flex items-center mb-4">
                                <BadgeDollarSign className="w-8 h-8 text-purple-500 mr-3" />
                                <h3 className="text-2xl font-bold text-purple-800">Per-Candidate</h3>
                            </div>
                            <p className="text-black mb-4">Perfect for businesses processing individual candidates with precision.</p>
                            <div className="mt-4 mb-6">
                                <span className="text-3xl font-bold text-black block">₹74.75 - ₹108.5</span>
                                <span className="bg-purple-500 animate-pulse text-white px-5 py-2 rounded-md text-sm w-fit block mt-1">per candidate</span>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-white bg-purple-500 p-1 rounded-md mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-purple-1100/80">Pay only for candidates you process</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-white bg-purple-500 p-1 rounded-md mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-purple-1100/80">AI-powered interview analysis</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-white bg-purple-500 p-1 rounded-md mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-purple-1100/80">Standardized evaluation metrics</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-white bg-purple-500 p-1 rounded-md mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-purple-1100/80">Basic reporting and analytics</span>
                            </li>
                        </ul>

                        <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-6 rounded-xl">
                            Get Started
                        </Button>
                    </div>

                    {/* Pay-As-You-Go Pricing */}
                    <div className="bg-gradient-to-b from-purple-100 to-white rounded-2xl border border-purple-300 p-8 hover:shadow-lg transition-shadow duration-300 relative flex flex-col h-full">
                        <Badge className="absolute top-4 right-4 bg-purple-500 animate-pulse hover-group:bg-purple-600">Most Popular</Badge>
                        <div className="mb-8">
                            <div className="flex items-center mb-4">
                                <CreditCard className="w-8 h-8 text-purple-500 mr-3" />
                                <h3 className="text-2xl font-bold text-purple-800">Pay-As-You-Go</h3>
                            </div>
                            <p className="text-black mb-4">Flexible usage-based model for varied hiring needs.</p>
                            <div className="mt-4 mb-6">
                                <span className="text-3xl font-bold text-black">Usage-Based</span>
                                <span className="text-sm px-2 py-1 ml-1 bg-purple-600 rounded-md text-white">pricing</span>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-start">
                                <Check className="w-5 h-5 p-1 bg-purple-500 rounded-md text-white mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-black/90">Pay per minute of interview processing</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 p-1 bg-purple-500 rounded-md text-white mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-black/90">Advanced AI analysis and insights</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 p-1 bg-purple-500 rounded-md text-white mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-black/90">Customizable evaluation criteria</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 p-1 bg-purple-500 rounded-md text-white mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-black/90">Comprehensive analytics dashboard</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 p-1 bg-purple-500 rounded-md text-white mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-black/90">Priority customer support</span>
                            </li>
                        </ul>

                        <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-6 rounded-xl">
                            Sign Up Now
                        </Button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-purple-800 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 text-white relative flex flex-col h-full">
                        <div className="mb-8">
                            <div className="flex items-center mb-4">
                                <Database className="w-8 h-8 text-purple-300 mr-3" />
                                <h3 className="text-2xl font-bold">Enterprise</h3>
                            </div>
                            <p className="text-purple-200 mb-4">Custom solutions for large-scale hiring operations.</p>
                            <div className="mt-4 mb-6">
                                <span className="text-3xl font-bold">Custom</span>
                                <span className="text-purple-300 ml-1">pricing</span>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-purple-300 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-purple-200">Unlimited candidate processing</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-purple-300 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-purple-200">Full access to all AI features</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-purple-300 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-purple-200">Custom integration with your HR systems</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-purple-300 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-purple-200">Advanced security and compliance features</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-purple-300 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-purple-200">Dedicated account manager</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-purple-300 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-purple-200">24/7 premium support</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-purple-300 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-purple-200">Custom reporting and analytics</span>
                            </li>
                        </ul>

                        <Button variant="outline" className="w-full border-purple-300 text-black py-6 rounded-xl">
                            Contact Sales
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PricingSection
