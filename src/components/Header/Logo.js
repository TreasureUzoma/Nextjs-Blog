import Link from "next/link";
import { Separator } from "../ui/seperator";
import siteMetadata from "@/src/utils/siteMetaData";

const Logo = () => {
  return (
    <div className="flex items-center text-dark dark:text-light font-semibold text-lg tracking-tight">
      <a href={siteMetadata.rootUrl} className="hover:underline">
        idolodev
      </a>
      <Separator orientation="vertical" className="rotate-[19deg]" />
      <Link className="hover:underline" href="/">
        blog
      </Link>
    </div>
  );
};

export default Logo;
