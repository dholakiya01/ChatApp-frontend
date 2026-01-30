// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle, User, Camera, Video } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-700 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
            <MessageCircle className="w-6 h-6" />
            <span>ChatApp</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-gray-200">Home</Link>
            <Link href="/chats" className="hover:text-gray-200">Chats</Link>
            {/* <Link href="/stream" className="hover:text-gray-200"> <Video/> </Link> */}
            <Link href="/#" className="hover:text-gray-200 cursor-pointer"><User/></Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 px-4 pb-4 space-y-2">
          <Link href="/profile" className="block hover:text-gray-200">Profile</Link>
        </div>
      )}
    </nav>
  );
}
