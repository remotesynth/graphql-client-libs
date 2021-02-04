import styles from '../styles/Home.module.css';
import { GraphQLClient, gql } from 'graphql-request';
import Link from 'next/link';

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
  const graphQLClient = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      authorization: 'bearer ' + process.env.GITHUB_API_TOKEN,
    },
  });
  const query = gql`
    {
      viewer {
        name
        twitterUsername
        bio
      }
    }
  `;
  const results = await graphQLClient.request(query);
  return {
    props: {
      user: results.viewer,
    },
  };
}
