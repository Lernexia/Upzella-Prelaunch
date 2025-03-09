
import FAQ from '@/components/FAQ';

const Faq = () => {

  const faqs = [
    {
      question: "How does Upzella's AI screening work?",
      answer: "Our AI screening analyzes resumes by extracting key information and matching it against your job requirements. It goes beyond keyword matching to understand context and can evaluate potential even when exact experience isn't present."
    },
    {
      question: "Can Upzella integrate with our existing ATS?",
      answer: "Yes, Upzella is designed to integrate seamlessly with most popular applicant tracking systems. Our platform can import candidates, export results, and sync data bidirectionally with your existing tools."
    },
    {
      question: "How does Upzella reduce hiring bias?",
      answer: "Upzella focuses on skills and qualifications by using structured evaluation criteria that are consistently applied to all candidates. The system can also anonymize certain data points during initial screening to reduce unconscious bias."
    },
    {
      question: "How long does it take to implement Upzella?",
      answer: "Most companies can be up and running with Upzella in just 1-2 weeks. Our implementation team handles the technical setup while your team receives comprehensive training on the platform's features."
    }
  ]

  return (
    <section className="bg-white">
      <div className="max-container">
 
        <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <FAQ faqs={faqs } />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
