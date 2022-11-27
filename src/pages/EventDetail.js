import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const EventDetail = () => {
  const params = useParams();

  const [markdown, setDescription] = useState("");
  const [isLoading, setLoading] = useState(true);

  const loadMarkdown = () => {
    fetch(
      // TODO:  `${process.env.PUBLIC_URL}/data/descriptions/event_${params.id}.md`
      `${process.env.PUBLIC_URL}/data/descriptions/event_1.md`
    ).then((resp) =>
      resp.text().then((data) => {
        setDescription(data);
        setLoading(false);
      })
    );
  };

  useEffect(() => {
    if (isLoading) {
      loadMarkdown();
    }
  });

  return (
    <section className="bg-slate-900">
      <article className="max-w-4xl px-6 py-24 mx-auto space-y-12">
        <div className="w-full mx-auto space-y-4 text-center">
          <p className="text-lg font-semibold tracking-wider uppercase">
            Codeathon
          </p>
          <h1 className="font-bold leading-tight text-5xl md:text-7xl">
            TechEden 2.0
          </h1>
          <p className="text-sm dark:text-gray-400">
            <span className="text-md"> OpenSource Community </span>
          </p>
        </div>
        <div
          className="relative w-full h-full overflow-hidden rounded-lg"
          style={{ minHeight: "19rem" }}
        >
          <img
            className="absolute inset-0 w-full h-full object-cover object-center"
            src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="TechEden 2.0"
          />
        </div>

        <div className="dark:text-gray-100 prose lg:prose-xl">
          <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
        </div>
        <div className="pb-12 border-b dark:border-gray-700">
          <div className="flex justify-center pt-4 space-x-4 align-center">
            <button className="rounded-md p-3 bg-green-400 text-black text-xl">
              Register now
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};
