import * as React from "react";
import { Button } from "../button";
import { Variants } from "../../interfaces";

interface IContactProps {
  title: string;
  description: string;
}

export const Contact: React.SFC<IContactProps> = ({ title, description }) => {
  return (
    <div id="contact" className="container py-16 text-center">
      <h2 className="text-2xl">{title}</h2>
      <div>{description}</div>
      <form
        className="w-full max-w-lg mx-auto mt-8"
        name="contact"
        method="post"
        // action="/thanks?no-cache=1"
        data-netlify="true"
        data-netlify-honeypot="title-catch"
      >
        {/* This is for netlify */}
        <input type="hidden" name="form-name" value="contact" />
        {/* This is a honeypot field */}
        <input className="hidden" type="text" name="title-catch" />
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-neutral-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-neutral-200 text-neutral-700 border border-neutral-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-neutral-500"
              id="grid-first-name"
              name="first-name"
              type="text"
              placeholder="Jane"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-neutral-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-neutral-200 text-neutral-700 border border-neutral-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-neutral-500"
              id="grid-last-name"
              type="text"
              name="last-name"
              placeholder="Doe"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-neutral-700 text-xs font-bold mb-2"
              htmlFor="grid-message"
            >
              Message
            </label>
            <textarea
              className="appearance-none block w-full bg-neutral-200 text-neutral-700 border border-neutral-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-neutral-500"
              id="grid-message"
              name="message"
              placeholder="Tell us about your next great idea"
              rows={3}
              required
            ></textarea>
          </div>
        </div>
        <Button variant={Variants.primary} type="submit">
          Send Message
        </Button>
      </form>
    </div>
  );
};
