import { signIn, useSession } from 'next-auth/react';
import styles from '../index.module.css';
import { type NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

const Login: NextPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void signIn('credentials', {
                redirect: false,
                username,
                password,
              });
            }}
          >
            <input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={username}
              type='text'
            />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type='password'
            />
            <button type='submit'>Gönder</button>
          </form>

          {session && (
            <div
              style={{ color: 'white', fontWeight: 'bold', fontSize: '25px' }}
            >
              {JSON.stringify(session.user)}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Login;
