import styles from '../styles/Home.module.css';
import { createClient } from 'urql';
import Link from 'next/link';

const client = createClient({
  url: 'https://api.github.com/graphql',
  fetchOptions: {
    headers: { authorization: 'bearer ' + process.env.GITHUB_API_TOKEN },
  },
});

export default function About({ user }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Link href="/">
          <a>&lt; Back Home</a>
        </Link>
        <h1 className={styles.title}>{user.name}</h1>
        <h3>
          Twitter:{' '}
          <a href={'https://twitter.com/' + user.twitterUsername}>
            @{user.twitterUsername}
          </a>
        </h3>
        <p>{user.bio}</p>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const query = `
    {
      viewer {
        name
        twitterUsername
        bio
      }
    }
  `;
  const results = await client.query(query).toPromise();
  return {
    props: {
      user: results.data.viewer,
    },
  };
}
