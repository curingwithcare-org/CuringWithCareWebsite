import Head from 'next/head';
import styles from '../styles/Layout.module.css';

export function Layout({ children }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
