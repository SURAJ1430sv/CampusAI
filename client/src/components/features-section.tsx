interface Feature {
  icon: string;
  title: string;
  description: string;
}

export default function FeaturesSection() {
  const features: Feature[] = [
    {
      icon: "fas fa-user-graduate",
      title: "Admissions Assistance",
      description: "Get answers to all your questions about courses, eligibility, fees, deadlines, and the entire admission process."
    },
    {
      icon: "fas fa-calendar-alt",
      title: "Student Support",
      description: "Access academic calendars, exam schedules, class timetables, and receive timely reminders for important events."
    },
    {
      icon: "fas fa-id-card",
      title: "Administrative Help",
      description: "Get assistance with fee payment queries, hostel information, library hours, and other administrative matters."
    },
    {
      icon: "fas fa-user-check",
      title: "Personalized Experience",
      description: "Receive personalized course suggestions and club recommendations based on your interests and academic profile."
    },
    {
      icon: "fas fa-globe",
      title: "Multilingual Support",
      description: "Communicate in multiple languages based on your preferences for a more comfortable experience."
    },
    {
      icon: "fas fa-clock",
      title: "24/7 Availability",
      description: "Unlike human staff, CampusAI is always available to assist you, day or night, weekends and holidays."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How CampusAI Can Help You</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our AI-powered assistant is designed to make your college experience smoother by providing instant help with everything you need.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className={`${feature.icon} text-primary`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
