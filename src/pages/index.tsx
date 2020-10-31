import { GetServerSideProps } from "next";
import Link from "next/link";
import { Container, Section, Title } from "@/styles/pages/Home";
import { client } from "@/lib/prismic";
import Prismic from "prismic-javascript";
import PrismicDOM from 'prismic-dom';
import { Document } from "prismic-javascript/types/documents";

interface HomeProps {
  recommendedProd: Document[];
}

export default function Home({ recommendedProd }: HomeProps) {
  return (
    <Container>
      <Section>
        <Title>Products</Title>
        <ul>
          {recommendedProd.map(({ id, uid, data }) => (
            <li key={id}>
              <Link href={`/catalog/product/${uid}`}>
                <a>{PrismicDOM.RichText.asText(data.title)}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProd = await client().query([
    Prismic.Predicates.at("document.type", "product"),
  ]);

  return {
    props: {
      recommendedProd: recommendedProd.results,
    },
  };
};
