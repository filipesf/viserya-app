import { Metadata } from 'next';
import { MainContainer } from '@viserya/ui';

export const metadata: Metadata = {
  title: 'Privacy Policy - ViseryaApp',
};

export default function Privacy() {
  return (
    <MainContainer>
      <h1 id="privacy-policy">Privacy Policy</h1>
      <h2 id="introduction">Introduction</h2>
      <p>
        Welcome to ViseryaApp Actions. We value your privacy and are committed
        to protecting your personal data. This Privacy Policy outlines how we
        collect, use, and safeguard your information when you interact with our
        API services. By using our services, you agree to the terms of this
        Privacy Policy.
      </p>
      <h2 id="information-we-collect">Information We Collect</h2>
      <h3 id="personal-data">Personal Data</h3>
      <p>
        When using our API services, we may collect personal data that you
        provide to us, including but not limited to:
      </p>
      <ul>
        <li>
          <strong>Prompt Data</strong>: The text prompts you submit for
          generating characters, adventures, locations, organisations, items, or
          images.
        </li>
      </ul>
      <h3 id="automatically-collected-data">Automatically Collected Data</h3>
      <p>
        We may also collect certain information automatically when you use our
        services, including:
      </p>
      <ul>
        <li>
          <strong>Usage Data</strong>: Information about your interactions with
          our API endpoints.
        </li>
      </ul>
      <h2 id="how-we-use-your-information">How We Use Your Information</h2>
      <p>We use the information we collect for the following purposes:</p>
      <ul>
        <li>
          <strong>To Provide Services</strong>: We use your prompt data to
          generate characters, adventures, locations, organisations, items, or
          images as requested through our API.
        </li>
        <li>
          <strong>To Improve Our Services</strong>: We analyze usage data to
          understand how our services are used and to improve their performance
          and functionality.
        </li>
      </ul>
      <h2 id="data-sharing-and-disclosure">Data Sharing and Disclosure</h2>
      <p>
        We do not share your personal data with third parties, except in the
        following circumstances:
      </p>
      <ul>
        <li>
          <strong>Service Providers</strong>: We may share data with third-party
          service providers who assist us in operating our services and
          performing related business functions.
        </li>
        <li>
          <strong>Legal Requirements</strong>: We may disclose your data if
          required to do so by law or in response to valid requests by public
          authorities.
        </li>
      </ul>
      <h2 id="data-security">Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to
        protect your personal data against unauthorized access, loss, or misuse.
        However, no system is completely secure, and we cannot guarantee the
        absolute security of your information.
      </p>
      <h2 id="data-retention">Data Retention</h2>
      <p>
        We retain your personal data only for as long as necessary to fulfill
        the purposes for which it was collected and to comply with legal
        obligations. Prompt data is retained only for the duration needed to
        generate the requested outputs.
      </p>
      <h2 id="your-rights">Your Rights</h2>
      <p>
        Depending on your location, you may have certain rights regarding your
        personal data, including:
      </p>
      <ul>
        <li>
          <strong>Access</strong>: The right to request access to the personal
          data we hold about you.
        </li>
        <li>
          <strong>Correction</strong>: The right to request correction of
          inaccurate or incomplete data.
        </li>
        <li>
          <strong>Deletion</strong>: The right to request deletion of your
          personal data, subject to certain exceptions.
        </li>
        <li>
          <strong>Objection</strong>: The right to object to the processing of
          your personal data in certain circumstances.
        </li>
      </ul>
      <h2 id="changes-to-this-privacy-policy">
        Changes to This Privacy Policy
      </h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        in our practices or for other operational, legal, or regulatory reasons.
        We will notify you of any significant changes by posting the new Privacy
        Policy on our website.
      </p>
      <h2 id="contact-us">Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy or our data
        practices, please contact us at:
      </p>
      <ul>
        <li>
          <strong>Email</strong>: me@filipesf.com
        </li>
        <li>
          <strong>Address</strong>: ViseryaApp Actions, Privacy Department, 123
          API Drive, Tech City, TC 12345
        </li>
      </ul>
      <p>
        Thank you for trusting ViseryaApp Actions with your data. We are
        committed to protecting your privacy and providing a secure and reliable
        service.
      </p>
    </MainContainer>
  );
}
