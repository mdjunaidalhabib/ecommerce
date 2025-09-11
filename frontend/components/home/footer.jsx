import Link from "next/link";
import SocialIcons from "./SocialIcons";
import {
  FaHome,
  FaTools,
  FaInfoCircle,
  FaPhoneAlt,
  FaProjectDiagram,
  FaClipboardCheck,
  FaUsers,
  FaFileContract,
  FaUndoAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLaptopCode,
  FaSchool,
  FaShoppingCart,
  FaIdCard,
  FaPaintBrush,
  FaServer,
  FaPenNib,
  FaAddressCard,
  FaVideo,
} from "react-icons/fa";

const quickMenu = [
  {
    id: 1,
    icon: <FaHome className="text-purple-600" />,
    label: "হোম",
    href: "/",
  },
  {
    id: 2,
    icon: <FaTools className="text-green-600" />,
    label: "সার্ভিসসমূহ",
    href: "/",
  },
  {
    id: 3,
    icon: <FaInfoCircle className="text-indigo-600" />,
    label: "আমাদের সম্পর্কে",
    href: "/",
  },
];

const ourServices = [
  {
    id: 1,
    icon: <FaLaptopCode className="text-indigo-600" />,
    label: "কাস্টম ওয়েব ডিজাইন",
    href: "/web-development",
  },
  {
    id: 2,
    icon: <FaAddressCard className="text-teal-600" />,
    label: "আইডি কার্ড তৈরি",
    href: "/id-card",
  },
  {
    id: 3,
    icon: <FaVideo className="text-red-600" />,
    label: "ভিডিও এডিটিং",
    href: "/video-editing",
  },
];

const contactInfo = [
  {
    id: 1,
    icon: <FaPhoneAlt className="text-indigo-600" />,
    label: "",
    value: <a href="tel:01788563988">০১৭৮৮-৫৬৩৯৮৮</a>,
  },
  {
    id: 2,
    icon: <FaEnvelope className="text-pink-600" />,
    label: " ",
    value: <a href="mailto:habibsfashion@gmail.com">habibsfashion@gmail.com</a>,
  },
  {
    id: 3,
    icon: <FaMapMarkerAlt className="text-green-600" />,
    label: " ",
    value: "দেওয়ানগঞ্জ, জামালপুর।",
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-6">
        {/* Our Services */}
        <div className="our-services">
          <h2 className="text-xl font-semibold mb-4">আমাদের সেবা</h2>
          <ul className="space-y-2">
            {ourServices.map(({ id, icon, label, href }) => (
              <li
                key={id}
                className="flex items-center gap-2 transition duration-300 cursor-pointer hover:scale-105 hover:text-yellow-300  active:scale-105 active:text-yellow-300"
              >
                {icon}
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Menu */}
        <div className="quick-menu">
          <h2 className="text-xl font-semibold mb-4">দ্রুত মেনু</h2>
          <ul className="space-y-2">
            {quickMenu.map(({ id, icon, label, href }) => (
              <li
                key={id}
                className="flex items-center gap-2 transition duration-300 cursor-pointer hover:scale-105 hover:text-yellow-300  active:scale-105 active:text-yellow-300"
              >
                {icon}
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="contact-info">
          <h2 className="text-xl font-semibold mb-4">যোগাযোগ</h2>
          <ul className="space-y-2">
            {contactInfo.map(({ id, icon, label, value }) => (
              <li
                key={id}
                className="flex items-center gap-2 transition duration-300 cursor-pointer hover:scale-105 hover:text-yellow-300  active:scale-105 active:text-yellow-300"
              >
                {icon}
                <span>
                  {label} {value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="">
          <h2 className="text-xl font-semibold mb-4">সোশ্যাল মিডিয়া</h2>
          <SocialIcons />
        </div>
      </div>

      <hr className="border-t border-gray-600" />

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 mt-4">
        © ২০২৫ Habib's Fashion. সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
}
