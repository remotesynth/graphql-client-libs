import styles from '../styles/Home.module.css';
import { request, gql } from 'graphql-request';
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
  const query = gql`
    {
      continents {
        name
        code
      }
    }
  `;
  const results = await request('https://countries.trevorblades.com/', query);
  return {
    props: {
      continents: results.continents,
    },
  };
}
