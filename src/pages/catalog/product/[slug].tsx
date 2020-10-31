import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Document } from "prismic-javascript/types/documents";
import PrismicDOM from "prismic-dom";
import { client } from "@/lib/prismic";

import SEO from "@/pages/SEO";

import { Title, ImageContainer } from "@/styles/pages/Home";

interface ProductProps {
  product: Document;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();

  if (router.isFallback) return <p>Loading...</p>;

  const { title, description, price, thumbnail } = product.data;

  return (
    <>
      <div>
        <SEO title="Products" />

        <Title>{PrismicDOM.RichText.asText(title)}</Title>
        <ImageContainer>
          <Image src={thumbnail.url} width={300} height={300} />
        </ImageContainer>
        <div
          dangerouslySetInnerHTML={{
            __html: PrismicDOM.RichText.asHtml(description),
          }}
        ></div>
        <p>Price: ${price}</p>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID("product", String(slug), {});

  return {
    props: {
      product,
    },
    revalidate: 5,
  };
};
