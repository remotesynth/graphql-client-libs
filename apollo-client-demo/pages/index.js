import styles from '../styles/Home.module.css';
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import Link from 'next/link';

export default function Home({ continents }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Link href="/about">
          <a>About Me &gt;</a>
        </Link>
        <h1 className={styles.title}>Continents and Countries</h1>
        {continents.map((continent, index) => (
          <Link href={'/country/' + continent.code}>
            <a>
              <h2 key={index}>{continent.name}</h2>
            </a>
          </Link>
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://countries.trevorblades.com/',
    cache: new InMemoryCache(),
  });
  const results = await client.query({
    query: gql`
      {
        continents {
          name
          code
        }
      }
    `,
  });
  return {
    props: {
      continents: results.data.continents,
    },
  };
}
