// "use client";

// import logo from "../public/icons/logo.webp";
// import Image from "next/image";
// import { socialMediaInfo } from "@/shared";
// import back from "../public/images/ground.png";
// import Link from "next/link";

// const FooterWrapper = () => {
//   return (
//     <div
//       className={`relative text-sm text-[#D2D1D3] w-full z-99`}
//       style={{
//         backgroundImage: `url(${back.src})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="mx-auto max-w-7xl">
//         <div className="flex h-20 items-center justify-between">
//           <div className=" md:flex md:items-center md:gap-12">
//             <Link className="" href="/">
//               <div className="cursor-pointer">
//                 <Image src={logo} alt="Fly Cham" width={130} height={20} />
//               </div>
//             </Link>
//           </div>

//           <p className="text-center md:text-left">
//             © All Rights Reserved. Fly Cham 2025
//           </p>
//           <div className="flex justify-center items-center gap-2">
//             <Link href="/cookies-policy" className="hover:text-[#C2B48B]">
//               Cookies policy
//             </Link>
//             <Link href="/privacy-policy" className="hover:text-[#C2B48B]">
//               Privacy Policy
//             </Link>
//             <Link href="/terms" className="hover:text-[#C2B48B]">
//               Terms and Conditions
//             </Link>
//           </div>

//           <div className="md:flex md:items-center">
//             <div className="flex justify-center gap-2 mt-6 md:mt-0 text-xl">
//               {socialMediaInfo.map((Icon, index) => (
//                 <div
//                   key={index}
//                   className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border border-[#D6B680] text-[#D6B680] hover:-translate-y-1 hover:opacity-80 transition"
//                 >
//                   {Icon}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FooterWrapper;

"use client";

import logo from "../public/icons/logo.webp";
import Image from "next/image";
import { socialMediaInfo } from "@/shared";
import back from "../public/images/ground.png";
import Link from "next/link";

const FooterWrapper = () => {
  return (
    <div
      className="relative text-sm text-[#D2D1D3] w-full z-99"
      style={{
        backgroundImage: `url(${back.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-6">
          {/* Logo Section */}
          <div className="flex items-center justify-center md:justify-start md:w-1/3">
            <Link href="/">
              <Image src={logo} alt="Fly Cham" width={130} height={20} />
            </Link>
          </div>

          {/* Footer Text */}
          <p className="text-center mt-4 md:mt-0 md:text-left md:w-1/3">
            © All Rights Reserved. Fly Cham 2025
          </p>

          {/* Links Section */}
          <div className="flex justify-center gap-4 md:gap-2 mt-4 md:mt-0 md:w-1/2">
            <Link href="/cookies-policy" className="hover:text-[#C2B48B]">
              Cookies policy
            </Link>
            <Link href="/privacy-policy" className="hover:text-[#C2B48B]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#C2B48B]">
              Terms and Conditions
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-1 mt-4 md:mt-0 md:w-1/3">
            {socialMediaInfo.map((Icon, index) => (
              <div
                key={index}
                className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border border-[#D6B680] text-[#D6B680] hover:-translate-y-1 hover:opacity-80 transition"
              >
                {Icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterWrapper;
