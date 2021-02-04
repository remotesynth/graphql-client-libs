import styles from '../../styles/Home.module.css';
import { request, gql } from 'graphql-request';
import Link from 'next/link';

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
  const query = gql`
    {
      continents {
        code
      }
    }
  `;
  const results = await request('https://countries.trevorblades.com/', query);

  // create paths with `permalink` param
  const paths = results.continents.map(
    (continent) => `/country/${continent.code}`
  );
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ ...ctx }) {
  const { code } = ctx.params;
  const query = gql`
    query getContinent($code: ID!) {
      continent(code: $code) {
        name
        countries {
          name
        }
      }
    }
  `;
  const variables = {
    code: code,
  };
  const results = await request(
    'https://countries.trevorblades.com/',
    query,
    variables
  );
  return {
    props: {
      continent: results.continent,
    },
  };
}
