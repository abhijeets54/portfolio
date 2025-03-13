import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#2c2c27] text-[#f4f3f0]">
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Column 1: About */}
            <div>
              <h4 className="font-serif text-lg mb-6">
                <Image src="/logo.PNG" alt="Ankkor" width={160} height={50} className="h-12 w-auto invert" />
              </h4>
              <p className="text-[#d5d0c3] text-sm leading-relaxed mb-6">
                Timeless menswear crafted with exceptional materials and artisanal techniques, 
                designed for the discerning gentleman who values understated luxury.
              </p>
              <div className="flex space-x-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#8a8778] hover:text-[#f4f3f0] transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#8a8778] hover:text-[#f4f3f0] transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#8a8778] hover:text-[#f4f3f0] transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Column 2: Shop */}
            <div>
              <h4 className="font-serif text-lg mb-6">Shop</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/collection/shirts" className="text-[#d5d0c3] hover:text-[#f4f3f0] transition-colors">
                    Shirts
                  </Link>
                </li>
                <li>
                  <Link href="/collection/pants" className="text-[#d5d0c3] hover:text-[#f4f3f0] transition-colors">
                    Pants
                  </Link>
                </li>
                <li>
                  <Link href="/collection/polos" className="text-[#d5d0c3] hover:text-[#f4f3f0] transition-colors">
                    Polos
                  </Link>
                </li>
                <li>
                  <Link href="/collection" className="text-[#d5d0c3] hover:text-[#f4f3f0] transition-colors">
                    View All
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Customer Service */}
            <div>
              <h4 className="font-serif text-lg mb-6">Customer Service</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/customer-service/contact" className="text-[#d5d0c3] hover:text-[#f4f3f0] transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/shipping-policy" className="text-[#d5d0c3] hover:text-[#f4f3f0] transition-colors">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link href="/return-policy" className="text-[#d5d0c3] hover:text-[#f4f3f0] transition-colors">
                    Return Policy
                  </Link>
                </li>
                <li>
                  <Link href="/customer-service/size-guide" className="text-[#d5d0c3] hover:text-[#f4f3f0] transition-colors">
                    Size Guide
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Company */}
            <div>
              <h4 className="font-serif text-lg mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/about" className="text-[#d5d0c3] hover:text-[#f4f3f0] transition-colors">
                    Our Heritage
                  </Link>
                </li>
                <li>
                  <Link href="/about/craftsmanship" className="text-[#d5d0c3] hover:text-[#f4f3f0] transition-colors">
                    Craftsmanship
                  </Link>
                </li>
                <li>
                  <Link href="/about/sustainability" className="text-[#d5d0c3] hover:text-[#f4f3f0] transition-colors">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-[#d5d0c3] hover:text-[#f4f3f0] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-[#d5d0c3] hover:text-[#f4f3f0] transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#3d3d35] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#8a8778] text-xs">
              &copy; {new Date().getFullYear()} <Image src="/logo.PNG" alt="Ankkor" width={80} height={25} className="h-5 w-auto inline-block invert align-text-bottom ml-1" />. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-[#8a8778] text-xs hover:text-[#f4f3f0] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-[#8a8778] text-xs hover:text-[#f4f3f0] transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-[#8a8778] text-xs hover:text-[#f4f3f0] transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 