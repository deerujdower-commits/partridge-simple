import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EnquiryModal from '@/components/EnquiryModal';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {/* Back link */}
          <Link 
            to="/" 
            className="inline-flex items-center text-foreground/60 hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Page header */}
          <div className="mb-12">
            <h1 className="font-display text-5xl md:text-7xl font-light text-foreground tracking-tight mb-4">
              Cookie Policy
            </h1>
            <p className="text-muted-foreground">
              Effective date: January 1, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            <div>
              <p className="text-foreground/80 leading-relaxed">
                Partridge Laundry & Linen Hire Ltd ("us", "we", or "our") operates this website (the "Service").
              </p>
              <p className="text-foreground/80 leading-relaxed mt-4">
                This Cookie Policy explains what cookies are, how we use cookies, how third-parties we may partner with may use cookies on the Service, your choices regarding cookies and further information about cookies.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light text-foreground mb-4">What are cookies?</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light text-foreground mb-4">How we use cookies</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. We use traffic log cookies to identify which pages are being used. This helps us analyse data about web page traffic and improve our website in order to tailor it to visitors' needs. We only use this information for statistical analysis purposes and then the data is removed from the system.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light text-foreground mb-4">Types of cookies we use</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Partridge Laundry & Linen Hire Ltd uses the following types of cookies:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Session Cookies</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    We use Session Cookies to operate our Service. These cookies are temporary and expire once you close your browser.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">Preference Cookies</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    We use Preference Cookies to remember your preferences and various settings. These cookies help us provide you with a personalized experience.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">Security Cookies</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    We use Security Cookies for security purposes. These cookies help us keep your information safe and protect our Service from malicious activity.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light text-foreground mb-4">Your choices regarding cookies</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                To learn more about cookies and how to manage them, visit <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.allaboutcookies.org</a>.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light text-foreground mb-4">Tracking and usage data</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We may also collect and store information about your browsing device, including, where available, your IP address, operating system and browser type. This is anonymous statistical data about your browsing activities and patterns and does not contain any personal data.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light text-foreground mb-4">Third-party cookies</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service and deliver advertisements on and through the Service.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Please note that third-party websites and services have their own privacy policies. When you click on links to other websites, we encourage you to read their privacy policies and cookie policies.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light text-foreground mb-4">Changes to this Cookie Policy</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Effective date" at the top of this Cookie Policy.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light text-foreground mb-4">Contact us</h2>
              <p className="text-foreground/80 leading-relaxed">
                If you have any questions about this Cookie Policy, please <Link to="/contact" className="text-accent hover:underline">contact us</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer onEmailClick={() => setIsEnquiryOpen(true)} />
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </div>
  );
};

export default CookiePolicy;
