import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../style";
import { navLinks } from "../constant";
import { logoDGM, menu, close } from "../assets";
const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <nav
        className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-transparent`}
      >
        <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
          <Link
            to={"/"}
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
            className="flex items-center gap-2"
          >
            <img src={logoDGM} alt="logo" className="object-contain w-9 h-9" />
            <p className="text-white text-[18px] font-bold cursor-pointer flex">
              Dwi G.M &nbsp;
              <span className="hidden sm:block">| Front End Dev</span>
            </p>
          </Link>
          <ul className="flex-row hidden gap-10 list-none sm:flex">
            {navLinks.map((link, idx) => {
              return (
                <li
                  key={idx}
                  className={`${
                    active == link.title ? "text-white" : "text-secondary"
                  } hover:text-white text-[18px] cursor-pointer`}
                  onClick={() => setActive(link.title)}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-end flex-1 sm:hidden">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain cursor-pointer"
              onClick={() => setToggle(!toggle)}
            />
            <div
              className={`${
                !toggle ? "hidden" : "flex"
              } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-[140px] z-10 rounded-xl`}
            >
              <ul className="flex flex-col items-start justify-end gap-4 list-none ">
                {navLinks.map((link, idx) => {
                  return (
                    <li
                      key={idx}
                      className={`${
                        active == link.title ? "text-white" : "text-secondary"
                      } font-poppins font-medium cursor-pointer text-[16px]`}
                      onClick={() => {
                        setToggle(!toggle);
                        setActive(link.title);
                      }}
                    >
                      <a href={`#${link.id}`}>{link.title}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
