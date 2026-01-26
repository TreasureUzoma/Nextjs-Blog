import Link from "next/link";
import { Separator } from "../ui/seperator";
import siteMetadata from "@/src/utils/siteMetaData";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center text-dark dark:text-light">
      <span className="font-semibold text-lg tracking-tight flex items-center">
        <a href={siteMetadata.rootUrl} className="hover:underline">
          idolodev
        </a>
        <Separator orientation="vertical" className="rotate-[19deg]" />
        <Link className="hover:underline" href="/blog">
          blog
        </Link>
      </span>
    </Link>
  );
};

export default Logo;
