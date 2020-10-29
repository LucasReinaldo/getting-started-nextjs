import { GetServerSideProps } from "next";

import { Container, Section, Title } from "../styles/pages/Home";

interface IProduct {
  id: number;
  title: string;
}

interface HomeProps {
  recommendedProd: IProduct[];
}

export default function Home({ recommendedProd }: HomeProps) {
  return (
    <Container>
      <Section>
        <Title>Products</Title>
        <ul>
          {recommendedProd.map((prod) => (
            <li key={prod.id}>{prod.title}</li>
          ))}
        </ul>
      </Section>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch("http://localhost:3333/recommended");
  const recommendedProd = await response.json();

  return {
    props: {
      recommendedProd,
    },
  };
};
