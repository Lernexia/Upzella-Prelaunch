
import JobPostingForm from '@/components/job-posting/JobPostingForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getCookie } from '@/hooks/cookies';
import DashboardView from '@/components/dashboard/dashboard';

const Index = () => {

  let userId = getCookie("user_id");

  if (!userId) {
    document.cookie = `user_id=${crypto.randomUUID()}; path=/; max-age=3600`; // Expires in 1 hour
    userId = getCookie("user_id");
  }  

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-purple-50/30 to-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <DashboardView />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
