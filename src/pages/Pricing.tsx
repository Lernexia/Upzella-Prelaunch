import FAQ from '@/components/FAQ'
import FeatureComparison from '@/components/home/Pricing/FeatureComparison'
import FeatureBenefits from '@/components/home/Pricing/FutureBenifits'
import PricingSection from '@/components/home/Pricing/PricingSection'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { cn } from '@/lib/utils'
import { ArrowRight, Hand } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Pricing() {
    const faqs = [
        {
            question: "How does per-candidate pricing work?",
            answer: "With our per-candidate pricing model, you only pay for the candidates you process through our system. The cost ranges from INR 74.75 to INR 108.5 per candidate depending on your volume. This model is ideal for businesses that want predictable costs directly tied to their hiring activities."
        },
        {
            question: "What's included in the Pay-As-You-Go plan?",
            answer: "The Pay-As-You-Go plan charges based on your actual usage of the UpZella platform. This includes the amount of interview processing time or AI analysis tokens consumed. This plan includes advanced analytics, customizable evaluation criteria, and priority customer support."
        },
        {
            question: "How do I know which pricing plan is right for my business?",
            answer: "The best plan depends on your hiring volume and specific needs. Per-Candidate is ideal for businesses with occasional hiring needs. Pay-As-You-Go works well for variable hiring volumes. Enterprise is designed for large organizations with continuous high-volume recruitment. Our team can help assess your needs and recommend the most cost-effective solution."
        },
        {
            question: "Can I upgrade or downgrade my plan?",
            answer: "Yes, you can upgrade or downgrade your plan at any time. Changes typically take effect at the start of your next billing cycle. There are no penalties for changing plans, making it easy to adjust as your hiring needs evolve."
        },
        {
            question: "Is there a free trial available?",
            answer: "Yes, we offer a free demo that allows you to experience the UpZella platform before committing to a paid plan. During the demo, you can process a limited number of test candidates to see how our AI-powered hiring platform works."
        },
        {
            question: "How are enterprise plans customized?",
            answer: "Enterprise plans are tailored to your organization's specific requirements. Our sales team will work with you to understand your hiring processes, volume, and special needs. We create a custom package that may include unlimited candidate processing, dedicated support, custom integrations, and special features specific to your organization."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, bank transfers, and in some regions, digital payment methods. Enterprise customers typically have the option for invoicing with net-30 payment terms."
        }
    ];
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-20">

                <PricingSection />
                <FeatureBenefits />
                <FeatureComparison />
                <FAQ faqs={faqs} />

                <div className="container mx-auto max-w-4xl pb-16">
                    <div className="mt-12 text-center bg-purple-50 rounded-xl p-8">
                        <h3 className="text-xl font-bold mb-3">
                            Still have questions?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Our team is ready to help you choose the right plan for your needs.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <motion.div
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to="/contact"
                                    className={cn(
                                        "bg-purple-600 text-white px-6 py-3 rounded-lg font-medium",
                                        "transition-all duration-300 hover:bg-purple-700 hover:shadow-lg",
                                        "flex items-center justify-center"
                                    )}
                                >
                                    Contact Sales
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className='relative flex '>
                                    <span className="absolute inline-flex  h-full w-full  motion-safe:animate-ping2 rounded-full bg-purple-700 opacity-75"></span>
                                    <Link
                                        to="/create-job"
                                        className={cn(
                                            "bg-white w-full text-purple-700 border border-purple-200 px-6 py-3 rounded-lg font-medium",
                                            "transition-all duration-300 hover:bg-purple-50 hover:border-purple-300",
                                            "flex items-center justify-center relative"
                                        )}
                                    >
                                        <Hand size={18} className='mr-1' />

                                        Try a Demo
                                    </Link>
                                </div>

                            </motion.div>

                        </div>
                    </div>
                </div>

            </main >
            <Footer />
        </div >
    )
}

export default Pricing
