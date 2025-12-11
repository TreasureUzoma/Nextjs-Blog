// this page should be unreachable
// in a case where user come from multizone root its completly unreachable
// comming from original url it will redirect to homepage which is a safe route

import { redirect } from "next/navigation";

const Page = () => {
  redirect("/");
};

export default Page;
