import React from "react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-12">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-0">
          {/* About */}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-3">About AnimeShop</h3>
            <p className="text-gray-400 text-sm">
              Your favorite destination for anime figures, collectibles, and merchandise. We bring your favorite characters to life!
            </p>
          </div>

          {/* Quick Links with SVG icons */}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2 hover:text-orange-500">
                {/* Shopping Cart SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor">
                  <path d="M6 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-1.5-2H5.21l-.2-1h11.27l-1 1zm-11.49-4L5 4h12v2H6.21z"/>
                </svg>
                <a href="/product">Shop Figures</a>
              </li>
              <li className="flex items-center gap-2 hover:text-orange-500">
                {/* Star SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor">
                  <path d="M9 0l2.7 5.5L18 6.3l-4.5 4.4L14 18l-5-2.6L4 18l1.5-7.3L1 6.3l6.3-.8L9 0z"/>
                </svg>
                <a href="/preorder">Preorders</a>
              </li>
              <li className="flex items-center gap-2 hover:text-orange-500">
                {/* Box SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor">
                  <path d="M2 2h14v14H2V2zm14-2H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z"/>
                </svg>
                <a href="/cart">Cart</a>
              </li>
              <li className="flex items-center gap-2 hover:text-orange-500">
                {/* Envelope SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor">
                  <path d="M0 4v10h18V4H0zm16 2l-7 5-7-5V6l7 5 7-5v.5z"/>
                </svg>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-3">Follow Us</h3>
            <div className="flex gap-4 text-gray-400 text-xl">
              {/* Facebook SVG */}
              <a href="#" className="hover:text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor">
                  <path d="M18 9a9 9 0 1 0-10.125 8.93v-6.3H5.25V9h2.625V7.125c0-2.6 1.55-4.031 3.925-4.031 1.15 0 2.35.2 2.35.2v2.575h-1.325c-1.3 0-1.7.8-1.7 1.625V9h2.9l-.465 2.63h-2.435v6.3A9 9 0 0 0 18 9z"/>
                </svg>
              </a>
              {/* Instagram SVG */}
              <a href="#" className="hover:text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor">
                  <path d="M9 0C4.03 0 0 4.03 0 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 14.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm6-9.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
              </a>
              {/* Twitter SVG */}
              <a href="#" className="hover:text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor">
                  <path d="M18 3.46a7.18 7.18 0 0 1-2.07.57 3.63 3.63 0 0 0 1.6-2.01 7.25 7.25 0 0 1-2.3.88A3.61 3.61 0 0 0 9 5.17a10.23 10.23 0 0 1-7.43-3.77 3.61 3.61 0 0 0 1.12 4.82 3.57 3.57 0 0 1-1.64-.45v.04a3.61 3.61 0 0 0 2.89 3.53 3.6 3.6 0 0 1-1.63.06 3.61 3.61 0 0 0 3.37 2.5A7.23 7.23 0 0 1 0 15.54a10.2 10.2 0 0 0 5.53 1.62c6.63 0 10.25-5.5 10.25-10.25 0-.16-.01-.33-.02-.49A7.32 7.32 0 0 0 18 3.46z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} AnimeShop. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
              <path d="M8 0l4 6H4l4-6zm0 16V6h2v10H8z"/>
            </svg>
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
