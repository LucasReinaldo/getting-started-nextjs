import { GetStaticProps } from "next";

import { Container, Section, Title } from "../styles/pages/Home";

interface IProduct {
  id: number;
  title: string;
}

interface TopTenProducts {
  products: IProduct[];
}

export default function TopTenProducts({products}: TopTenProducts) {
  return (
    <Container>
      <Section>
        <Title>Top 10 Products</Title>
        <ul>
          {products.map((prod) => (
            <li key={prod.id}>{prod.title}</li>
          ))}
        </ul>
      </Section>
    </Container>
  );
}

export const getStaticProps: GetStaticProps<TopTenProducts> = async (context) => {
  const response = await fetch("http://localhost:3333/products");
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 10,
  };
};
