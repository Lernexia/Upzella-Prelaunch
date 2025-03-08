import { useState, useEffect } from "react";
import JobPostingForm from "@/components/job-posting/JobPostingForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCookie, setCookie } from "@/hooks/cookies";
import DashboardView from "@/components/dashboard/dashboard";

const Index = () => {
  let userId = getCookie("user_id");

  if (!userId) {
    document.cookie = `user_id=${crypto.randomUUID()}; path=/; max-age=1800`; // Expires in 30 minutes
    userId = getCookie("user_id");
  }

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = getCookie("seen_demo_modal");

    if (!hasSeenModal) {
      setIsModalOpen(true);
      setCookie("seen_demo_modal", "true", 0.02); // 0.02 days = 30 minutes
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-purple-50/30 to-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <DashboardView />
      </main>

      <Footer />

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Information</h2>
            <p className="text-gray-600">
              The data displayed on this page is for demonstration purposes only and does not represent real information.
            </p>
            <button
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
              onClick={() => setIsModalOpen(false)}
            >
              OK, Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
