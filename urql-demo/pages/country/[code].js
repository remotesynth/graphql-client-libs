import styles from '../../styles/Home.module.css';
import { createClient } from 'urql';
import Link from 'next/link';

const client = createClient({
  url: 'https://countries.trevorblades.com/',
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
  const query = `
    {
      continents {
        code
      }
    }
  `;
  const results = await client.query(query).toPromise();

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
  const query = `
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
  const results = await client.query(query, variables).toPromise();
  return {
    props: {
      continent: results.data.continent,
    },
  };
}
