import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center py-[12px]">
      <ul className="flex items-center justify-center gap-x-4 py-[10px]">
        <li className="text-[14px] font-semibold leading-[100%]">
          <Link href="/terms">Terms & Conditions</Link>
        </li>
        <li className="text-[14px] font-semibold leading-[100%]">
          <Link href="/privacy">Privacy Policy</Link>
        </li>
        <li className="text-[14px] font-semibold leading-[100%]">
          <Link href="/billing">Billing Support</Link>
        </li>
        <li className="text-[14px] font-semibold leading-[100%]">
          <Link href="/complains">Complaints & Content Removal</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
