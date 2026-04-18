import { LuBell } from "react-icons/lu";
import profilee from "../../../src/assets/header/profileLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import { useRef, useState } from "react";
import { Drawer } from "antd";

import dashboard from "../../assets/routerImg/dashboard.png";
import categorie from "../../assets/routerImg/categorie.png";
import create from "../../assets/routerImg/create.png";
import settings from "../../assets/routerImg/settings.png";
import subscription from "../../assets/routerImg/subscription.png";
import user from "../../assets/routerImg/user.png";
import logo from "../../assets/header/logo.png";

import { FaChevronRight } from "react-icons/fa";

import DashboardIco from "../icon/DashboardIco";
import BarProfileIco from "../icon/BarProfileIco";
import SupportIco from "../icon/SupportIco";
import ShiftsIco from "../icon/ShiftsIco";
import ProfileIco from "../icon/ProfileIco";

const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardIco />,
    link: "/",
  },
  {
    key: "shifts",
    label: "My Shifts",
    icon: <ShiftsIco color={"white"} />,
    link: "/dashboard/shifts",
  },
  {
    key: "venueProfile",
    label: "Profile & Setting",
    icon: <ProfileIco color={"white"} />,
    link: "/dashboard/VenueProfile",
  },
  {
    key: "helpSupport",
    label: "Help & Support",
    icon: <SupportIco />,
    link: "/dashboard/HelpSupport",
  },
];

const Header = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const contentRef = useRef({});

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
  };

  return (
    <div className="bg-[#0F0B1A] border-b border-[#2A2448] text-white pt-3">
      <div className="flex justify-between pb-3 px-3">
        {/* Logo */}
        <div>
          <img src={logo} alt="Logo" className="w-[115px]" />
        </div>

        {/* Menu Icon */}
        <div>
          <div
            onClick={showDrawer}
            className="text-xl border border-[#2A2448] p-2 rounded-xl text-[#822CE7] cursor-pointer"
          >
            <FaBars />
          </div>

          {/* Drawer */}
          <Drawer
            placement="right"  
            closable={false}
            onClose={onClose}
            open={open}
            width={280}
          >
            <div className="bg-[#0F0B1A] h-screen  -m-6 pt-4 px-3">

              {/* Cross Button */}
              <div className="flex justify-start mb-4">
                <button
                  onClick={onClose}
                  className="text-[#822CE7] bg-[#822CE71A]  p-2 border border-[#2A2448] rounded-lg hover:bg-[#1D1733]"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Menu Items */}
              <div className="menu-items">
                {items.map((item) => (
                  <div key={item.key}>
                    <Link
                      to={item.link}
                      className={`my-4  py-[10px] px-4 flex items-center cursor-pointer ${
                        selectedKey === item.key
                          ? "bg-gradient-to-tr from-[#822CE7] to-[#BB82FF] hover:text-white text-white shadow-md mx-3 rounded-full"
                          : "hover:bg-gradient-to-tr hover:from-[#822CE7] mx-3 hover:text-white rounded-full text-white bg-[#822CE71A]"
                      }`}
                      onClick={(e) => {
                        if (item.children) {
                          e.preventDefault();
                          onParentClick(item.key);
                        } else {
                          setSelectedKey(item.key);
                          onClose(); 
                        }
                      }}
                    >
                      <span className="w-5 mr-2 text-lg">{item.icon}</span>
                      <span className="w-full">{item.label}</span>

                      {item.children && (
                        <FaChevronRight
                          className={`ml-auto text-[10px] transition-transform duration-300 ${
                            expandedKeys.includes(item.key)
                              ? "rotate-90"
                              : ""
                          }`}
                        />
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Header;