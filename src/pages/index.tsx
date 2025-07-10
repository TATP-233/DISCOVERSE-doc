import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title" style={{ color: 'white' }}>
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{siteConfig.tagline}</p>
        <p className="hero__description" style={{
          fontSize: '1.1rem',
          marginTop: '1rem',
          marginBottom: '2rem',
          opacity: 0.9,
          maxWidth: '600px',
          margin: '1rem auto 2rem auto',
          color: 'rgba(255, 255, 255, 0.8)'
        }}>
          A unified, modular, open-source 3DGS-based simulation framework for Real2Sim2Real robot learning
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            style={{
              marginRight: '1rem',
              background: 'rgba(255, 255, 255, 0.15)',
              borderColor: 'rgba(255, 255, 255, 0.6)',
              color: 'white',
              fontWeight: '600'
            }}
            to="/docs/get-started/installation">
            Get Started 🚀
          </Link>
          <Link
            className="button button--secondary button--lg"
            style={{
              marginRight: '1rem',
              background: 'rgba(255, 255, 255, 0.15)',
              borderColor: 'rgba(255, 255, 255, 0.6)',
              color: 'white',
              fontWeight: '600'
            }}
            to="/docs/tutorials/basic-simulation/overview">
            View Examples 🤖
          </Link>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <Link
            className="button button--secondary button--lg"
            href="https://github.com/TATP-233/DISCOVERSE"
            style={{
              marginRight: '1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              color: 'white',
              fontWeight: '600'
            }}>
            ⭐ Star on GitHub
          </Link>
          <Link
            className="button button--secondary button--lg"
            href="https://air-discoverse.github.io/"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              color: 'white',
              fontWeight: '600'
            }}>
            📄 Read Paper
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Robot Simulation Framework`}
      description="DISCOVERSE: Efficient Robot Simulation in Complex High-Fidelity Environments. A unified 3DGS-based framework for Real2Sim2Real robot learning.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
