import { FormEvent, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import PrismicDOM from "prismic-dom";
import Prismic from "prismic-javascript";
import { Document } from "prismic-javascript/types/documents";
import { client } from "@/lib/prismic";

import { Title } from "@/styles/pages/Home";

interface SearchProps {
  searchResults: Document[];
}

export default function Search({ searchResults }: SearchProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  function handleSearch(event: FormEvent) {
    event.preventDefault();

    router.push(`/search?q=${encodeURIComponent(search)}`);

    setSearch("");
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map(({ uid, id, data }) => (
          <li key={id}>
            <Link href={`/catalog/product/${uid}`}>
              <a>{PrismicDOM.RichText.asText(data.title)}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  context
) => {
  const { q } = context.query;

  if (!q) {
    return { props: { searchResults: [] } };
  }

  const searchResults = await client().query([
    Prismic.Predicates.at("document.type", "product"),
    Prismic.Predicates.fulltext("my.product.title", String(q)),
  ]);

  return {
    props: {
      searchResults: searchResults.results,
    },
  };
};
