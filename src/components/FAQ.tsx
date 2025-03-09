
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'

const FAQ = ({faqs}) => {


    return (
        <section className="py-16 px-4 md:px-8 bg-white">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600">
                        Find answers to common questions about our pricing and plans.
                    </p>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`faq-${index}`}
                            className="border rounded-xl px-6 shadow-sm"
                        >
                            <AccordionTrigger className="text-left  font-medium py-5">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 pb-5">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                
            </div>
        </section>
    );
};

export default FAQ;
