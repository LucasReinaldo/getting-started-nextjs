import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from "next";
import { useRouter } from "next/router";
import Custom404 from "../../404";

interface IProduct {
  id: number;
  title: string;
}

interface CategoryProps {
  products: IProduct[];
}

export default function Category({ products }: CategoryProps) {
  const router = useRouter();

  if (router.isFallback) return <p>Loading...</p>;

  return (
    <>
      <div>
        <h1>{router.query.slug}</h1>
        <ul>
          {products.map((prod) => (
            <li key={prod.id}>{prod.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`http://localhost:3333/categories`);
  const categories = await response.json();

  const paths = categories.map((category) => {
    return { params: { slug: category.id } };
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

  const response = await fetch(
    `http://localhost:3333/products?category_id=${slug}`
  );
  const products = await response.json();

  const notFound = !products?.length;

  return {
    props: {
      products,
    },
    revalidate: 10,
    notFound,
  };
};