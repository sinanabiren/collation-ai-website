import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | Collation.AI",
  description: "Learn about how Collation.AI collects, uses, and protects your personal information.",
};

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-muted-foreground mb-4">Published as of June 5, 2024</p>

            <h1>Privacy Policy</h1>

            <p>At Collation.AI, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information. By using our services, you consent to our use of your information as described in this policy.</p>

            <p className="font-semibold">WE WILL POST ANY CHANGES TO THIS PRIVACY POLICY IN A NOTICE OF THE CHANGE AT THE BOTTOM OF OUR WEB PAGE WITH A HYPERLINK THERETO. PLEASE REGULARLY REVIEW THIS PRIVACY POLICY. NOTWITHSTANDING IF YOU CONTINUE TO USE OUR SERVICES, YOU ARE BOUND BY ANY CHANGES THAT WE MAKE TO THIS PRIVACY POLICY.</p>

            <h2>1. INTRODUCTION</h2>

            <p>Collation.AI, Inc. ("Collation.AI," "we," "us," or "our") respects the privacy of its Users ("User," "your," or "you"). This Privacy Policy (the "Privacy Policy") explains how we collect, use, disclose, and safeguard your information when you use Collation.AI Platform (the "Platform"). Collation.AI is a state-of-the-art data aggregation and reporting platform specifically designed for Wealth Managers. Leveraging the power of artificial intelligence, Collation.AI provides comprehensive back-office support, portfolio analytics, and client reporting solutions. This enables Wealth Managers to streamline their operations, gain deeper insights into their portfolios, and deliver more transparent and insightful reports to their clients.</p>

            <p>Collation.AI is committed to protecting the privacy of its Users whose information is collected and stored while using Collation.AI's Platform. This Privacy Policy is applicable to our Website, Platform and all applications offered for sale to the public.</p>

            <p className="font-semibold">PLEASE READ THIS PRIVACY POLICY CAREFULLY TO UNDERSTAND OUR POLICIES AND PRACTICES REGARDING YOUR INFORMATION AND HOW WE WILL TREAT IT. BY ACCESSING OR USING OUR PLATFORM, YOU AGREE TO ACCEPT ALL THE TERMS CONTAINED IN THIS PRIVACY POLICY AND ACKNOWLEDGE AND AGREE WITH THE PRACTICES DESCRIBED HEREIN. IF YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, PLEASE DO NOT ACCESS AND USE OUR WEBSITE OR PLATFORM.</p>

            <p className="font-semibold">IF YOU HAVE ANY QUESTIONS REGARDING THIS PRIVACY POLICY, PLEASE SEND US AN EMAIL AT HELLO@COLLATION.AI.</p>

            <p className="font-semibold">WE DO NOT SELL YOUR PERSONAL INFORMATION, NOR DO WE INTEND TO DO SO. WE DO NOT GIVE ACCESS TO YOUR PERSONAL INFORMATION TO THIRD PARTIES EXCEPT TO SUBPROCESSORS TO ASSIST US IN THE PROVISION OF OUR SERVICES TO YOU.</p>

            <h2>2. WHAT INFORMATION DO WE COLLECT?</h2>

            <p>When you register to use our Platform, we collect personal information (also referred to as personally identifiable information or "PII") which may include your name, address, online contact information such as your email address or username, phone number, and other personal information. The information so collected will be stored on our servers. You are able to change your personal information via email by contacting us at hello@collation.ai or through your profile or account settings on our Platform.</p>

            <p><strong>a. Geolocation and Equipment Information.</strong> We may collect information that does not personally identify you such as (i) your geolocation, and (ii) information about your internet connection, the equipment you use to access our Platform, and usage details.</p>

            <p><strong>b. Financial Information.</strong> Collation.AI currently does not collect or store any credit card or bank information directly, as we utilize third-party payment processors for all transactions. However, we may collect financial information while providing our Services, and such information will be protected in accordance with the clauses mentioned in this Privacy Policy. Should we decide to start collecting and storing credit card or bank information in the future, we will update this Privacy Policy accordingly. Additionally, we will notify you through reasonable means, such as email or platform notifications, before we begin collecting this information.</p>

            <h2>3. HOW DO WE COLLECT INFORMATION?</h2>

            <p>We collect personal information from you in the following ways:</p>

            <ul>
              <li>At registration on our Platform;</li>
              <li>In email, text, and other electronic messages between you and our Platform;</li>
              <li>Through mobile and desktop applications your downloads from our Platform, which provides dedicated non-browser based interaction between you and our Platform;</li>
              <li>When you interact with our advertising and applications on third-party website and services, if those applications or advertising include a link to this Privacy Policy;</li>
              <li>From you placing an order, which includes details of transactions you carry out on our Platform;</li>
              <li>When you subscribe to a newsletter;</li>
              <li>From your responses to a survey;</li>
              <li>From forms filled out by you;</li>
              <li>From records or copies of correspondences (including email addresses) if you contact us;</li>
              <li>From search queries on our Platform; and</li>
              <li>When you post information to be published or displayed on our Platform.</li>
            </ul>

            <h2>4. HOW DO WE USE YOUR INFORMATION?</h2>

            <p>We use the information that you provide to:</p>

            <ul>
              <li>Personalize your experience in using our Platform;</li>
              <li>Provide you with information, products, or services requested from us;</li>
              <li>Present our Platform and their contents to you;</li>
              <li>Provide you with notices about account and/or subscription, including expiration and renewal notices;</li>
              <li>Carry out obligations and enforce rights arising from contracts entered into between you and us, including billing and collection;</li>
              <li>Notify you about changes to our Platform and any products or services;</li>
              <li>Allow you to participate in interactive features on our Platform;</li>
              <li>Improve the Platform;</li>
              <li>Improve our customer service;</li>
              <li>Administer contests, promotions, and surveys or other Platform features;</li>
              <li>Process transactions;</li>
              <li>Anonymize data and aggregate data for statistics;</li>
              <li>Contact you for other purposes with your consent.</li>
            </ul>

            <h2>5. DATA SECURITY</h2>

            <p>We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls. The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for access to certain parts of our Platform, you are responsible for keeping this password confidential.</p>

            <h2>6. CONTACT US</h2>

            <p>If you have any questions about this Privacy Policy, please contact us at:</p>

            <p>
              Email: hello@collation.ai<br />
              Address: 263 Tresser Blvd Floor 9, Stamford, CT 06901 United States
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
