import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../style";
import { navLinks } from "../constant";
import { logoDGM, menu, close } from "../assets";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [colorChange, setColorchange] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const toggleMobileNav = () => {
    setMobileNav(!mobileNav);
  };

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  useLayoutEffect(() => {
    window.addEventListener("scroll", changeNavbarColor);

    return () => {
      removeEventListener("scroll", changeNavbarColor);
    };
  }, [colorChange]);
  return (
    <div>
      <nav
        className={`${
          styles.paddingX
        } w-full flex items-center py-5 fixed top-0 z-20 ${
          colorChange ? "bg-primary" : "bg-transparent"
        } transition-all ease-in-out`}
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
            {/* <img
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
            </div> */}
            <AnimatePresence>
              {/* <div
                className="absolute z-50 top-5 left-3"
                style={{ display: mobileNav ? "block" : "none" }}
              > */}
                <MotionConfig
                  transition={{
                    type: "spring",
                    bounce: 0.1,
                  }}
                >
                  {" "}
                  <motion.div  key="mobile-nav" variants={{
                      hide: {
                        x: "-100%",
                        transition: {
                          type: "spring",
                          bounce: 0.1,
                          when: "afterChildren",
                          staggerChildren: 0.25,
                        },
                      },
                      show: {
                        x: "0%",
                        transition: {
                          type: "spring",
                          bounce: 0.1,
                          when: "beforeChildren",
                          staggerChildren: 0.25,
                        },
                      },
                    }}  initial='hide' animate='show' exit={'hide'}
                    className="absolute z-50 top-5 left-3"
                    style={{ display: mobileNav ? "block" : "none" }}>
                  <Link
                    to={"/"}
                    onClick={() => {
                      setActive("");
                      window.scrollTo(0, 0);
                      toggleMobileNav();
                      setToggle(!toggle)
                    }}
                    className="flex items-center gap-2"
                  >
                    <img
                      src={logoDGM}
                      alt="logo"
                      className="object-contain w-9 h-9"
                    />
                    <p className="text-white text-[18px] font-bold cursor-pointer flex">
                      Dwi G.M &nbsp;
                      <span className="hidden sm:block">| Front End Dev</span>
                    </p>
                  </Link>
                  </motion.div>
                </MotionConfig>
              {/* </div> */}
            </AnimatePresence>
            <motion.button
              initial="hide"
              animate={mobileNav ? "show" : "hide"}
              onClick={toggleMobileNav}
              className="relative z-10 flex flex-col space-y-1"
            >
              <img
                src={toggle ? close : menu}
                alt="menu"
                className="w-[28px] h-[28px] object-contain cursor-pointer"
                onClick={() => setToggle(!toggle)}
              />
            </motion.button>
            <AnimatePresence>
              {mobileNav && (
                <MotionConfig
                  transition={{
                    type: "spring",
                    bounce: 0.1,
                  }}
                >
                  <motion.div
                    key="mobile-nav"
                    variants={{
                      hide: {
                        x: "-100%",
                        transition: {
                          type: "spring",
                          bounce: 0.1,
                          when: "afterChildren",
                          staggerChildren: 0.25,
                        },
                      },
                      show: {
                        x: "0%",
                        transition: {
                          type: "spring",
                          bounce: 0.1,
                          when: "beforeChildren",
                          staggerChildren: 0.25,
                        },
                      },
                    }}
                    initial="hide"
                    animate="show"
                    exit="hide"
                    className="fixed inset-0 flex flex-col justify-center p-6 space-y-10 bg-primary lg:hidden"
                  >
                    <motion.ul
                      variants={{
                        hide: {
                          y: "25%",
                          opacity: 0,
                        },
                        show: {
                          y: "0%",
                          opacity: 1,
                        },
                      }}
                      className="space-y-6 list-none"
                    >
                      {navLinks.map((link, idx) => {
                        return (
                          <li
                            key={idx}
                            className={`${
                              active == link.title
                                ? "text-white"
                                : "text-secondary"
                            } font-poppins font-medium cursor-pointer text-[16px]`}
                            onClick={() => {
                              setToggle(!toggle);
                              setActive(link.title);
                              toggleMobileNav();
                            }}
                          >
                            <a href={`#${link.id}`}>{link.title}</a>
                          </li>
                        );
                      })}
                    </motion.ul>
                    <motion.div
                      variants={{
                        hide: {
                          y: "25%",
                          opacity: 0,
                        },
                        show: {
                          y: "0%",
                          opacity: 1,
                        },
                      }}
                      className="w-full h-px bg-white/30"
                    ></motion.div>
                    <motion.ul
                      variants={{
                        hide: {
                          y: "25%",
                          opacity: 0,
                        },
                        show: {
                          y: "0%",
                          opacity: 1,
                        },
                      }}
                      className="flex justify-center list-none gap-x-4"
                    >
                      <li>
                        <div className="w-8 h-8 bg-white rounded-lg"></div>
                      </li>
                      <li>
                        <div className="w-8 h-8 bg-white rounded-lg"></div>
                      </li>
                      <li>
                        <div className="w-8 h-8 bg-white rounded-lg"></div>
                      </li>
                    </motion.ul>
                  </motion.div>
                </MotionConfig>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
