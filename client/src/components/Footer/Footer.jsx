import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20  ">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-semibold text-[#ec8d9c]">
              Traditional Attire
            </h2>
            <p className="text-sm leading-relaxed">
              Traditional Attire offers you a wide variety of cultural and
              traditional outfits for rent. Embrace the beauty of ethnic fashion
              with ease and elegance.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-semibold text-[#ec8d9c]">
              Contact Information
            </h2>
            <p className="text-sm">
              <Icon
                icon="mdi:phone"
                className="inline-block mr-2 text-[#ec8d9c]"
              />
              +977-9876543210
            </p>
            <p className="text-sm">
              <Icon
                icon="ic:baseline-email"
                className="inline-block mr-2 text-[#ec8d9c]"
              />
              info@traditionalattire.com
            </p>
            <p className="text-sm">
              <Icon
                icon="mdi:map-marker"
                className="inline-block mr-2 text-[#ec8d9c]"
              />
              Butwal, Nepal
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-semibold text-[#ec8d9c]">
              Useful Links
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[#ec8d9c] transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-[#ec8d9c] transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-semibold text-[#ec8d9c]">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="hover:text-[#ec8d9c] transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="mdi:facebook" className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                className="hover:text-[#ec8d9c] transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="mdi:instagram" className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                className="hover:text-[#ec8d9c] transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="mdi:twitter" className="h-6 w-6" />
              </a>
              <a
                href="https://youtube.com"
                className="hover:text-[#ec8d9c] transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="mdi:youtube" className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Traditional Attire. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
