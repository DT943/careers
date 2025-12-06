import Link from "next/link";
import {
  FaInstagram,
  FaTiktok,
  FaFacebookF,
  FaLinkedinIn,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PiThreadsLogo } from "react-icons/pi";

export const socialMediaInfo = [
  <Link href={"https://www.threads.com/@fly.cham"} target="_blank">
    <PiThreadsLogo className="h-5 w-5" />
  </Link>,
  <Link href={"https://www.tiktok.com/@flycham"} target="_blank">
    <FaTiktok className="h-4 w-4" />
  </Link>,
  <Link href={"https://www.instagram.com/fly.cham/"} target="_blank">
    <FaInstagram className="h-4 w-4" />
  </Link>,
  <Link
    href={
      "https://www.facebook.com/people/%D9%81%D9%84%D8%A7%D9%8A-%D8%B4%D8%A7%D9%85-Fly-Cham/61575817032233/"
    }
    target="_blank"
  >
    <FaFacebookF className="h-4 w-4" />
  </Link>,
  <Link
    href={"https://www.whatsapp.com/channel/0029Vb61PQ2HQbS4UsXPC83a"}
    target="_blank"
  >
    <FaWhatsapp className="h-5 w-5" />
  </Link>,
  <Link href={"https://www.linkedin.com/company/fly-cham/"} target="_blank">
    <FaLinkedinIn className="h-4 w-4" />
  </Link>,
  <Link href={"https://x.com/fly_cham"} target="_blank">
    <FaXTwitter className="h-4 w-4" />
  </Link>,
  <Link href={"https://t.me/flychamchannel"} target="_blank">
    <FaTelegramPlane className="h-4 w-4" />
  </Link>,
];
