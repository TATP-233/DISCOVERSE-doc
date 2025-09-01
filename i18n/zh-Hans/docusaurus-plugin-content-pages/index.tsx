import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
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
        <p className="hero__subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)', textAlign: 'center' }}>复杂高保真环境中的高效机器人仿真</p>
        <p className="hero__description" style={{
          fontSize: '1.1rem',
          opacity: 0.9,
          maxWidth: 'min(600px, 90vw)',
          width: '100%',
          margin: '1rem auto 2rem auto',
          color: 'rgba(255, 255, 255, 0.8)',
          textAlign: 'center',
          padding: '0 1rem'
        }}>
          基于 3DGS 的统一、模块化、开源仿真框架，<br />支持 Real2Sim2Real 机器人学习工作流
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
            快速开始 🚀
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
            查看示例 🤖
          </Link>
        </div>
        <div className={styles.buttons} style={{ marginTop: '2rem' }}>
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
            ⭐ GitHub 点赞
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
            📄 阅读论文
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
      title={`${siteConfig.title} - 机器人仿真框架`}
      description="DISCOVERSE：复杂高保真环境中的高效机器人仿真。基于 3DGS 的统一 Real2Sim2Real 机器人学习框架。">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
