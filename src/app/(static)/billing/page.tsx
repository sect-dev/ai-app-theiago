const BillingPage = () => {
  return (
    <div className="flex flex-col gap-[20px] p-[20px]">
      <h1 className="text-2xl font-bold">AIGO BILLING INFORMATION</h1>

      <p>
        If you have any questions or issues related to your subscription or
        billing, you can contact our support team at{" "}
        <strong>support@theaigo.com</strong>.
      </p>

      <p>
        You may cancel your subscription at any time via the
        &quot;Settings&quot; section of your profile.
      </p>

      <p>
        If you believe you were charged in error, please contact us within 24
        hours for assistance. Refunds are subject to our Refund Policy.
      </p>

      <h2 className="text-xl font-bold">FOR BILLING-RELATED INQUIRIES</h2>

      <p>For all billing-related inquiries, please include:</p>

      <ul className="list-disc space-y-2 pl-6">
        <li>The email used to sign up</li>
        <li>The last 4 digits of the card (if applicable)</li>
        <li>Date of the transaction</li>
        <li>Description of the issue</li>
      </ul>

      <p className="mt-4">
        We aim to respond to all billing inquiries within 24–48 hours.
      </p>
    </div>
  );
};

export default BillingPage;
