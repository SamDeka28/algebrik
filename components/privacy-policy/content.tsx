import BookADemo from "../BookADemo";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";

export default function Content() {
    return (
        <div className="container max-w-7xl mx-auto p-4 pt-36 md:pt-[160px] md:pb-20 flex items-center justify-center font-plus-jakarta flex-col">
            <CustomHeader text="Privacy Policy" className="md:pb-[20px] text-[32px] md:text-[56px] font-semibold" />
            <div>
                <div className="flex flex-col gap-6">
                    <h5 className="text-2xl font-bold">1. Introduction</h5>
                    <p>Algebrik AI Inc. (collectively, "Algebrik," "we," "us," or "our") respect your privacy and are committed to protecting it through this Privacy Policy.</p>

                    <p>This policy describes the types of information we may collect from you or that you may provide when you visit our website ("www.algebrik.com") or interact with our services, and our practices for collecting, using, maintaining, protecting, and disclosing that information.</p>
                    <p>
                        This policy governs the information we collect from you or that you provide to us during your interaction with our Website, including through email, text, and other electronic communications between you and our Website. It does not extend to information gathered offline or through other means, such as on any other website operated by the Company or by third parties, including affiliates and subsidiaries. Additionally, our Website may feature content from or provide links to third-party websites, services, or social networks, which may collect, use, and disclose information differently from the practices outlined in this policy. We do not assume responsibility for the collection, use, or disclosure of information by such third parties and expressly disclaim all liability arising from their practices.
                    </p>
                    <p>
                        By accessing or using this Website, you agree to this Privacy Policy. If you do not agree with our policies and practices, your choice is not to use our Website.
                    </p>
                    <p>
                        Our Website is intended for a U.S. audience and is administered from the United States. By providing information, you consent to its processing in the United States and other locations where we operate.
                    </p>
                </div>
                <div className="flex flex-col gap-6 mt-10">
                    <h5 className="text-2xl font-bold">2. Children Under the Age of 18</h5>
                    <p>Our Website is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you are under 18, do not use or provide any information on this Website. If we learn we have collected personal information from a child under 18 without parental consent, we will delete it. For concerns, contact us at <a href="mailto:soc@algebrik.com">soc@algebrik.com</a>.
                    </p>
                </div>

                <div className="flex flex-col gap-6 mt-10">
                    <h5 className="text-2xl font-bold">3. Information We Collect About You</h5>
                    <p>We collect several types of information:</p>
                    <ul className="list-disc ml-4">
                        <li>
                            <strong className="text-xl">Personal Information:</strong>
                            <ul className="list-disc ml-6">
                                <li>Name, email, phone number and company name.</li>
                            </ul>
                        </li>
                        <li className="mt-2">
                            <strong className="text-xl">Usage Data:</strong>
                            <ul className="list-disc ml-6">
                                <li>IP address, browser type, operating system, device information, pages visited, and time spent on the Website. </li>
                            </ul>
                        </li>
                        <li className="mt-2">
                            <strong className="text-xl">Third-Party Data:</strong>
                            <ul className="list-disc ml-6">
                                <li>Information shared via linked accounts (e.g., social media).</li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="">
                        <li>
                            <strong className="text-xl">Collection Methods:</strong>
                            <ul className="list-disc ml-6">
                                <li  className="mt-2">
                                    <strong>Directly from You:</strong> Through forms, subscriptions, or customer support interactions.
                                </li>
                                <li className="mt-2">
                                <strong>Automatically:</strong> Via cookies, web beacons, and other tracking technologies.
                                </li>
                                <li className="mt-2"> 
                                <strong>From Third Parties:</strong> Such as business partners or social media platforms.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-6 mt-10">
                    <h5 className="text-2xl font-bold">4. How We Use Your Information</h5>
                    <p>We use the information we collect to:
                        <ul className="list-disc ml-4 mt-4">
                            <li>Provide and maintain our Website and services.
                            </li>
                            <li className="mt-4">Process requests and account management.
                            </li>
                            <li className="mt-4">Notify you of changes to our services.
                            </li>
                            <li className="mt-4">Personalize your experience on the Website.
                            </li>
                            <li className="mt-4">Enforce our legal rights and comply with applicable laws.
                            </li>
                            <li className="mt-4">Improve and develop new services.
                            </li>
                        </ul>
                    </p>
                    <p className="mt-4">You may opt out of promotional communications by following the instructions in our emails or contacting us directly.
                    </p>
                </div>


                <div className="flex flex-col gap-6 mt-10">
                    <h5 className="text-2xl font-bold">5. Disclosure of Your Information</h5>
                    <p>We may disclose personal information:
                        <ul className="list-disc ml-4 mt-4 list">
                            <li>
                                <strong>To Service Providers:</strong> Who support our operations under confidentiality agreements.
                            </li>
                            <li className="mt-4">
                                <strong>To Affiliates:</strong> For shared services or joint ventures.

                            </li>
                            <li className="mt-4">
                            <strong>During Business Transactions:</strong> In the event of mergers, acquisitions, or asset sales.

                            </li>
                            <li className="mt-4">
                            <strong>For Legal Obligations:</strong> To comply with laws or government requests.

                            </li>
                            <li className="mt-4">
                            <strong>With Your Consent:</strong> For any purpose you authorize.

                            </li>
                        </ul>
                    </p>
                    <p className="mt-4">We may also disclose aggregated data that does not identify individuals without restriction.
                    </p>
                </div>

                <div className="flex flex-col gap-6 mt-10">
                    <h5 className="text-2xl font-bold">6. Cookies and Tracking Technologies                    </h5>
                    <p>We use cookies to improve Website functionality and personalize content. Cookies may include:
                        <ul className="list-disc ml-4 mt-4 list">
                            <li>
                                <strong>Essential Cookies:</strong> Necessary for the Website’s operation.

                            </li>
                            <li className="mt-4">
                                <strong>Analytics Cookies: </strong> To track and analyze user behavior.


                            </li>
                            <li className="mt-4">
                            <strong>Preference Cookies: </strong> To remember user settings and preferences.

                            </li>
                        </ul>
                    </p>
                    <p className="mt-4">You can manage or disable cookies through browser settings. However, doing so may limit certain functionalities of our Website.
                    </p>
                </div>


                <div className="flex flex-col gap-6 mt-10">
                    <h5 className="text-2xl font-bold">7. Accessing and Correcting Your Information</h5>
                    <p>You may request access to, correction, or deletion of your personal information by contacting us at <a href="mailto:soc@algebrik.com">soc@algebrik.com</a>. We may retain certain data as required by law or for legitimate business purposes.
                    </p>
                </div>

                <div className="flex flex-col gap-6 mt-10">
                    <h5 className="text-2xl font-bold">8. Your California Privacy Rights                    </h5>
                    <p>If you are a California resident, California law provides additional rights, including:

                        <ul className="list-disc ml-4 mt-4 list">
                            <li>
                            The right to know what personal information we collect, use, disclose, or sell.

                            </li>
                            <li className="mt-4">
                            The right to request the deletion of your personal information.

                            </li>
                            <li className="mt-4">
                            The right to opt out of the sale of personal information (if applicable).
                            </li>
                        </ul>
                    </p>
                    <p className="mt-4">To exercise these rights, contact us at soc@algebrik.com or submit a privacy rights request.
                    </p>
                </div>

                <div className="flex flex-col gap-6 mt-10">
                    <h5 className="text-2xl font-bold">9. Data Security
                    </h5>
                    <p>We employ safeguards to protect personal information, including:


                        <ul className="list-disc ml-4 mt-4 list">
                            <li>
                            Encryption for data transmission.

                            </li>
                            <li className="mt-4">
                            Restricted access to authorized personnel.

                            </li>
                            <li className="mt-4">
                            Regular security audits.
  </li>
                        </ul>
                    </p>
                    <p className="mt-4">While we strive to protect your data, no system can guarantee complete security. Notify us immediately if you suspect unauthorized access to your account.
                    </p>
                </div>

                <div className="flex flex-col gap-6 mt-10">
                    <h5 className="text-2xl font-bold">10. Retention of Information

                    </h5>
                    <p>We retain personal data as long as necessary for business or legal purposes. Data may be anonymized or securely deleted after retention periods expire.

                    </p>
                </div>

                <div className="flex flex-col gap-6 mt-10">
                    <h5 className="text-2xl font-bold">11. Changes to This Privacy Policy


                    </h5>
                    <p>We may update this Privacy Policy periodically. Material changes will be communicated via email or a Website notice. Please review this policy regularly.

                    </p>
                </div>


                <div className="flex flex-col gap-6 mt-10">
                    <h5 className="text-2xl font-bold">12. Contact Information

                    </h5>
                    <p>If you have questions or concerns about this Privacy Policy, contact us at:


                        <ul className="list-disc ml-4 mt-4 list">
                            <li>
                            <strong>Email</strong>: <a href="mailto:soc@algebrik.com">soc@algebrik.com</a>
                            </li>
                            <li>
                            <strong>Phone</strong>: <a href="tel:+(917)974-8905">+(917)974-8905                            </a>
                            </li>
                        </ul>
                    </p>
                    <p className="mt-4">While we strive to protect your data, no system can guarantee complete security. Notify us immediately if you suspect unauthorized access to your account.
                    </p>
                </div>

                <div className="flex flex-col gap-6 mt-10">
                    <h5 className="text-2xl font-bold">13. Jurisdiction and Applicable Law
                    </h5>
                    <p>This Privacy Policy is governed by the laws of the United States. Any disputes arising under this policy will be resolved under U.S. law.
                    </p>
                </div>
            </div>
        </div>
    )
}