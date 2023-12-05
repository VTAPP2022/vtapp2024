import { findEventBySlug } from "@vtapp/lib/events";
import { getPosterUrl } from "@vtapp/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  const event = await findEventBySlug(slug);

  if (!event) {
    return {
      title: "VTAPP 2023 - Event Page",
      description: "There is no event with this slug.",
    };
  }

  return {
    title: `VTAPP 2023 - ${event.event_name}`,
    description: event.description,
    openGraph: {
      type: "website",
      title: `VTAPP 2023 - ${event.event_name}`,
      description: event.description,
      url: `https://vtapp.vitap.ac.in/events/${event.slug}`,
      siteName: "VTAPP 2023",
      images: [
        {
          url:
            event.poster_url && event.poster_url.length > 0
              ? event.poster_url[0].url
              : "https://i.imgur.com/2jzM0wr.jpg",
        },
      ],
    },
    twitter: {
      site: "https://vtapp.vitap.ac.in",
      title: `VTAPP 2023 - ${event.event_name}`,
      description: event.description,
      card: "summary_large_image",
      images:
        event.poster_url && event.poster_url.length > 0
          ? event.poster_url[0].url
          : "https://i.imgur.com/2jzM0wr.jpg",
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const event = await findEventBySlug(slug);

  return (
    <section className="bg-slate-900">
      <article className="max-w-4xl px-6 py-24 mx-auto space-y-12">
        <div className="w-full mx-auto space-y-4 text-center">
          <p className="text-lg font-semibold tracking-wider uppercase">
            {event.event_type}
          </p>
          <h1 className="font-bold leading-tight text-5xl md:text-7xl">
            {event.event_name}
          </h1>
          <p className="text-sm text-gray-400">
            Organised By:
            <br />
            <span className="text-lg text-gray-200"> {event.organiser} </span>
          </p>
        </div>

        <Image
          className="w-full aspect-[16/9] rounded-md"
          src={getPosterUrl(event)}
          alt={event.event_name}
          width={640}
          height={360}
        />

        <div className="dark:text-gray-100 prose lg:prose-xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {event.long_description}
          </ReactMarkdown>
        </div>
        <div className="pb-12 border-b dark:border-gray-700">
          <div className="flex justify-center pt-4 space-x-4 align-center">
            <Link
              className="rounded-md p-3 bg-blue-400 text-black text-xl relative z-10"
              href="https://vtop1.vitap.ac.in/VTAPP/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register now
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
