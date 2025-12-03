import { ClockIcon } from "@phosphor-icons/react";
import { GoLink } from "react-icons/go";

import { FaLinkedinIn, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { PiXLogoBold } from "react-icons/pi";
import Link from "next/link";

const HeaderContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[4.5fr_2fr] gap-4 p-6 w-full max-w-7xl">
      <div className="">
        <div className="flex justify-start items-center gap-2">
          <h3 className="text-3xl font-bold text-primary-1">
            Senior Backend Developer
          </h3>
          <div className="flex justify-start items-center gap-2 mt-1">
            <p className="text-sm font-normal text-[#5F5F5C] pt-1 flex justify-start items-center gap-1">
              <ClockIcon size={18} /> 2 days ago
            </p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-2 mt-2">
          <p className="text-primary-1 text-[12px] font-medium bg-[#BAA981]/30 rounded-xl px-1 py-1">
            #25002B
          </p>
        </div>
        <div className="flex justify-start items-center gap-2 mt-4">
          <p className="text-base font-medium text-primary-900 flex justify-start items-center gap-1">
            Location :
          </p>
          <p className="text-base font-normal text-primary-1 flex justify-start items-center gap-1">
            Damascus, Syria
          </p>
        </div>
        <div className="flex justify-start items-center gap-2 mt-1">
          <p className="text-base font-medium text-primary-900 flex justify-start items-center gap-1">
            Categories :
          </p>
          <p className="text-base font-normal text-primary-1 flex justify-start items-center gap-1">
            Digital & Technology
          </p>
        </div>
        <div className="flex justify-start items-center gap-2 mt-1">
          <p className="text-base font-medium text-primary-900 flex justify-start items-center gap-1">
            Job Type :
          </p>
          <p className="text-base font-normal text-primary-1 flex justify-start items-center gap-1">
            Full time
          </p>
        </div>
        <div className="flex justify-start items-center gap-2 mt-1">
          <p className="text-base font-medium text-primary-900 flex justify-start items-center gap-1">
            Experience :
          </p>
          <p className="text-base font-normal text-primary-1 flex justify-start items-center gap-1">
            +4 years
          </p>
        </div>
        <div className="flex justify-start items-center gap-2 mt-1">
          <p className="text-base font-medium text-primary-900 flex justify-start items-center gap-1">
            Closing date :
          </p>
          <p className="text-base font-normal text-primary-1 flex justify-start items-center gap-1">
            05-12-2025
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 justify-end items-end">
        <div>
          <Link href="/job-application">
            <button className="m-1 text-sm font-semibold w-2/3 bg-primary-1 border border-[#054E72] text-white py-3 px-4 rounded-lg p-1 hover:opacity-95">
              Apply Now
            </button>
          </Link>

          <button className="m-1 text-sm font-semibold w-2/3 border border-[#00253C] text-primary-900 py-3 px-4 rounded-lg p-1 hover:bg-white">
            Save
          </button>
        </div>

        {/* <button className="text-sm font-semibold w-2/3 border border-[#00253C] text-primary-900 py-3 px-4 rounded-lg p-1 hover:bg-white">
          Refer a friend
        </button> */}

        <p className=" text-base font-normal text-primary-1 flex justify-start items-center gap-1">
          share this role:
        </p>

        <div className="flex flex-row justify-start gap-2 p-1">
          <button className="text-sm font-semibold bg-[#1877F2] rounded-sm px-1.5 py-1.5 hover:-translate-y-1 transition">
            <BsFacebook size={16} className="text-white" />
          </button>
          <button className="text-sm font-semibold bg-[#2867B2] rounded-sm px-1.5 py-1.5 hover:-translate-y-1 transition">
            <FaLinkedinIn size={16} className="text-white" />
          </button>
          <button className="text-sm font-semibold bg-[#0088CC] rounded-sm px-1.5 py-1.5 hover:-translate-y-1 transition">
            <FaTelegramPlane size={16} className="text-white" />
          </button>

          <button className="text-sm font-semibold bg-[#25D366] rounded-sm px-1.5 py-1.5 hover:-translate-y-1 transition">
            <FaWhatsapp size={16} className="text-white" />
          </button>

          <button className="text-sm font-semibold bg-black rounded-sm px-1.5 py-1.5 hover:-translate-y-1 transition">
            <PiXLogoBold size={16} className="text-white" />
          </button>

          <button className="text-sm font-semibold rounded-sm px-1.5 py-1.5 hover:-translate-y-1 transition">
            <GoLink size={16} className="text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
