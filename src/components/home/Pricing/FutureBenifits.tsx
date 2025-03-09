
import { cn } from "@/lib/utils";
import { Shield, Zap, BadgeDollarSign, Users, Scale, BarChart, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const FeatureBenefits = () => {

    const benefits = [
        {
            icon: <BadgeDollarSign className="" size={24} />,
            title: "Transparent Pricing",
            description: "No hidden fees or surprise charges. Pay only for what you use with clear, upfront pricing.",
            delay: 100,
        },
        {
            icon: <Zap className="" size={24} />,
            title: "Faster Hiring",
            description: "Reduce time-to-hire by up to 60% with AI-powered candidate processing.",
            delay: 200,
        },
        {
            icon: <Shield className="" size={24} />,
            title: "Data Security",
            description: "Enterprise-grade security ensures your candidate data is always protected.",
            delay: 300,
        },
        {
            icon: <Scale className="" size={24} />,
            title: "Scalable Solution",
            description: "Easily scale up or down based on your hiring needs without complex contracts.",
            delay: 400,
        },
        {
            icon: <Users className="" size={24} />,
            title: "Team Collaboration",
            description: "Enable your entire hiring team to collaborate efficiently on candidate selection.",
            delay: 500,
        },
        {
            icon: <BarChart className="" size={24} />,
            title: "Powerful Analytics",
            description: "Gain insights into your hiring process with comprehensive reporting tools.",
            delay: 600,
        },
    ];

    return (
        <section className="py-16 px-4 md:px-8 bg-white">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
                        Key Features
                    </span>
                    <h2 className="text-3xl font-bold  mb-4">Why Choose UpZella</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our intelligent hiring platform delivers tangible benefits that transform your recruitment process.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <Feature key={index} {...benefit} />
                    ))}
                </div>

                <div className="w-full flex justify-center mt-12">
                    <Link
                        to="/how-it-works"
                        className={cn(
                            "bg-purple-600 text-white px-6 py-3 rounded-lg font-medium",
                            "transition-all duration-300 hover:bg-purple-700 hover:shadow-lg",
                            "inline-flex items-center hover:-translate-y-1"
                        )}
                    >
                        View More
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeatureBenefits;




type FeatureProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
};

const Feature = ({ icon, title, description, delay }: FeatureProps) => {
    const featureRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('opacity-100');
                        entry.target.classList.remove('translate-y-10');
                    }, delay);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        if (featureRef.current) {
            observer.observe(featureRef.current);
        }

        return () => {
            if (featureRef.current) {
                observer.unobserve(featureRef.current);
            }
        };
    }, [delay]);

    return (
        <div
            ref={featureRef}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all duration-700 opacity-0 translate-y-10 hover:shadow-md hover:-translate-y-1"
        >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">{icon}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};