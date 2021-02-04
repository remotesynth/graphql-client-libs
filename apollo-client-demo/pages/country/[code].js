import styles from '../../styles/Home.module.css';
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import Link from 'next/link';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache(),
});

export default function Home({ continent }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <>
          <Link href="/">
            <a>&lt; Back Home</a>
          </Link>
          <h1 className={styles.title}>{continent.name}</h1>
          {continent.countries.map((country, countryindex) => (
            <p key={countryindex}>{country.name}</p>
          ))}
        </>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const results = await client.query({
    query: gql`
      {
        continents {
          code
        }
      }
    `,
  });

  // create paths with `permalink` param
  const paths = results.data.continents.map(
    (continent) => `/country/${continent.code}`
  );
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ ...ctx }) {
  const { code } = ctx.params;
  const results = await client.query({
    query: gql`
      query getContinent($code: ID!) {
        continent(code: $code) {
          name
          countries {
            name
          }
        }
      }
    `,
    variables: {
      code: code,
    },
  });
  return {
    props: {
      continent: results.data.continent,
    },
  };
}
