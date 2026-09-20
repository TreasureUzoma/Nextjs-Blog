"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { GithubIcon, LinkedinIcon, TwitterIcon } from "../Icons";
import siteMetadata from "@/src/utils/siteMetaData";
import { joinNewsletter } from "@/src/actions/join-newsletter";

const socialLinks = [
  {
    href: siteMetadata.linkedin,
    label: "Reach out to me via LinkedIn",
    icon: LinkedinIcon,
  },
  {
    href: siteMetadata.twitter,
    label: "Reach out to me via Twitter",
    icon: TwitterIcon,
  },
  {
    href: siteMetadata.github,
    label: "Check my GitHub profile",
    icon: GithubIcon,
  },
];

const Footer = () => {
  const [response, setResponse] = useState < ResponseState > null;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ email }) => {
    setResponse(null);

    const result = await joinNewsletter(email);

    if (!result.success) {
      setError("email", {
        type: "server",
        message: result.message || "Unable to subscribe to the newsletter.",
      });

      return;
    }

    setResponse({
      success: true,
      message: result.message,
    });
  };

  const errorMessage = errors.email?.message;

  return (
    <footer className="m-2 mt-16 flex flex-col items-center rounded-2xl bg-dark text-light sm:m-10 dark:bg-white dark:text-dark">
      <h2 className="mt-16 px-4 text-center text-2xl font-medium capitalize sm:text-3xl lg:text-4xl dark:font-bold">
        Interesting Stories | Updates | Guides
      </h2>

      <p className="mt-5 w-full px-4 text-center text-sm font-light sm:w-3/5 sm:text-base dark:font-medium">
        Subscribe to learn about new technology, updates, and guides. Stay up to
        date with the latest news.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 w-[calc(100%-2rem)] max-w-md sm:w-auto"
      >
        {response?.success ? (
          <p className="text-center text-sm text-green-500">
            {response.message}
          </p>
        ) : (
          <>
            <div className="flex items-stretch rounded bg-light p-1 dark:bg-dark sm:p-2">
              <input
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                aria-invalid={!!errorMessage}
                aria-describedby={errorMessage ? "newsletter-error" : undefined}
                disabled={isSubmitting}
                {...register("email", {
                  required: "Email is required",
                  maxLength: {
                    value: 80,
                    message: "Email must be less than 80 characters",
                  },
                })}
                className="min-w-0 flex-1 border-0 border-b bg-transparent px-2 pb-1 text-dark outline-none focus:border-dark focus:ring-0 disabled:opacity-50 dark:text-light dark:focus:border-light"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer rounded bg-dark px-3 py-1 font-medium text-light disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 dark:bg-light dark:text-dark"
              >
                {isSubmitting ? "..." : "Subscribe"}
              </button>
            </div>

            {errorMessage && (
              <p
                id="newsletter-error"
                role="alert"
                className="mt-2 text-sm text-red-500"
              >
                {errorMessage}
              </p>
            )}
          </>
        )}
      </form>

      <div className="mt-8 flex items-center">
        {socialLinks.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4 inline-block h-6 w-6 last:mr-0"
          >
            <Icon className="transition-all duration-200 ease-in-out hover:scale-125" />
          </a>
        ))}
      </div>

      <div className="mt-16 flex w-full flex-col items-center justify-between border-t border-light px-8 py-6 font-medium md:mt-24 md:flex-row">
        <span className="text-center">
          ©{new Date().getFullYear()} Treasure Uzoma. All rights reserved.
        </span>

        <span className="mt-2 text-center md:mt-0">
          Made with ❤️ by{" "}
          <a
            href="https://idolo.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Treasure Uzoma
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
