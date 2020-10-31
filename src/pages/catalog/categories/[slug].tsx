import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Prismic from "prismic-javascript";
import { Document } from "prismic-javascript/types/documents";
import PrismicDOM from "prismic-dom";
import { client } from "@/lib/prismic";

import SEO from "@/pages/SEO";

import { Title } from "@/styles/pages/Home";

interface CategoryProps {
  products: Document[];
  category: Document;
}

export default function Category({ products, category }: CategoryProps) {
  const router = useRouter();

  if (router.isFallback) return <p>Loading...</p>;

  return (
    <>
      <div>
        <SEO title="Categories" />

        <Title>{PrismicDOM.RichText.asText(category.data.title)}</Title>
        <ul>
          {products.map(({ uid, id, data }) => (
            <li key={id}>
              <Link href={`/catalog/product/${uid}`}>
                <a>{PrismicDOM.RichText.asText(data.title)}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await client().query([
    Prismic.Predicates.at("document.type", "category"),
  ]);

  const paths = categories.results.map((category) => {
    return { params: { slug: category.uid } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async (
  context
) => {
  const { slug } = context.params;

  const category = await client().getByUID("category", String(slug), {});

  const products = await client().query([
    Prismic.Predicates.at("document.type", "product"),
    Prismic.Predicates.at("my.product.category", category.id),
  ]);

  const notFound = products?.total_results_size > 0 ? false : true;

  return {
    props: {
      category,
      products: products.results,
    },
    revalidate: 10,
    notFound,
  };
};
