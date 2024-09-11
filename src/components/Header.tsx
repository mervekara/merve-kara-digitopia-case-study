"use client";

import { useRef, useState } from "react";
import logo from "../assets/images/digitopiaLogoWithName.svg";
import LangSwitcher from "./LangSwitcher";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import RightSidePanel from "./RightSidePanel";
import Navigation from "./Navigation";


const Header = () => {
  const themeSwitcherRef = useRef<HTMLDivElement>(null);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo)
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  return (
    <header className="flex items-center justify-between py-4 shadow shadow-gray-200 bg-baseOne transition-colors duration-300 lg:px-[160px] sm:px-[40px] px-[16px]">
      <div>
        <Image
          src={logo}
          alt="logo"
          className="mix-blend-lighten"
        />
      </div>

      {isAuthenticated && (
      <Navigation />
      )}

      <div className="flex items-center space-x-4 sm:space-x-2" ref={themeSwitcherRef}>
        <LangSwitcher />
        {isAuthenticated && (
        <div className="flex items-center lg:space-x-4">
            <span className="text-sm hidden sm:block">{userInfo?.name}</span>
            <button className="lg:p-2 text-gray-600 hover:bg-gray-200 rounded-full" onClick={() => setIsPanelOpen(!isPanelOpen)}>
              {/* Add your menu icon here */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
        </div>)}
      </div>

      <RightSidePanel
        isVisible={isPanelOpen}
        onClose={() => setIsPanelOpen(false)} 
      />
    </header>
  );
};

export default Header
