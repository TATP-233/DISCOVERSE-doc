import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'High-Fidelity Real2Sim Generation',
    icon: '🌐',
    description: (
      <>
        Advanced 3D Gaussian Splatting rendering with hierarchical scene reconstruction,
        LiDAR integration, and AI-powered 3D generation for photorealistic simulation environments.
      </>
    ),
  },
  {
    title: 'Universal Compatibility & Flexibility',
    icon: '🔧',
    description: (
      <>
        Multi-format asset support (3DGS, Mesh, MJCF), diverse robot platforms
        (arms, mobile manipulators, humanoids), and seamless ROS2 integration for real-world deployment.
      </>
    ),
  },
  {
    title: 'End-to-End Learning Pipeline',
    icon: '🎓',
    description: (
      <>
        Automated data collection with 100× efficiency improvement, multiple learning algorithms
        (ACT, Diffusion Policy, RDT), and state-of-the-art zero-shot Sim2Real transfer.
      </>
    ),
  },
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIcon}>
          <span style={{ fontSize: '4rem' }}>{icon}</span>
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>

        {/* Performance Benchmarks Section */}
        <div className="row" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
          <div className="col col--12">
            <div className="text--center">
              <Heading as="h2" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏆 Performance Benchmarks</Heading>
              <p style={{
                fontSize: '1.1rem',
                margin: '1rem auto 3rem auto',
                maxWidth: '800px',
                lineHeight: '1.6'
              }}>
                DISCOVERSE demonstrates superior Sim2Real transfer performance with state-of-the-art results
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col col--12">
            <div style={{
              background: 'var(--ifm-card-background-color)',
              borderRadius: 'var(--ifm-global-radius)',
              border: '1px solid var(--ifm-color-emphasis-200)',
              padding: '2rem',
              margin: '0 auto',
              maxWidth: '900px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{ width: '100%', textAlign: 'center' }}>
                <table style={{
                  width: '100%',
                  maxWidth: '800px',
                  borderCollapse: 'collapse',
                  margin: '0 auto',
                  fontSize: '1rem'
                }}>
                  <thead>
                    <tr>
                      <th style={{
                        padding: '1rem',
                        borderBottom: '2px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center',
                        fontWeight: 'bold'
                      }}>Method</th>
                      <th style={{
                        padding: '1rem',
                        borderBottom: '2px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center',
                        fontWeight: 'bold'
                      }}>Close Laptop</th>
                      <th style={{
                        padding: '1rem',
                        borderBottom: '2px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center',
                        fontWeight: 'bold'
                      }}>Push Mouse</th>
                      <th style={{
                        padding: '1rem',
                        borderBottom: '2px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center',
                        fontWeight: 'bold'
                      }}>Pick Kiwi</th>
                      <th style={{
                        padding: '1rem',
                        borderBottom: '2px solid var(--ifm-color-emphasis-200)',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}>Average</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center'
                      }}>MuJoCo</td>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center'
                      }}>2%</td>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center'
                      }}>48%</td>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center'
                      }}>8%</td>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center'
                      }}>19.3%</td>
                    </tr>
                    <tr>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center'
                      }}>SAPIEN</td>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center'
                      }}>0%</td>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center'
                      }}>24%</td>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center'
                      }}>0%</td>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center'
                      }}>8.0%</td>
                    </tr>
                    <tr>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center'
                      }}>SplatSim</td>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center'
                      }}>56%</td>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center'
                      }}>68%</td>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center'
                      }}>26%</td>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        textAlign: 'center'
                      }}>50.0%</td>
                    </tr>
                    <tr style={{ background: 'rgba(96, 165, 250, 0.1)' }}>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}>DISCOVERSE</td>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}>66%</td>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}>74%</td>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}>48%</td>
                      <td style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}>62.7%</td>
                    </tr>
                    <tr style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                      <td style={{
                        padding: '0.75rem',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}>DISCOVERSE + Aug</td>
                      <td style={{
                        padding: '0.75rem',
                        fontWeight: 'bold',
                        color: 'var(--ifm-color-secondary)',
                        textAlign: 'center'
                      }}>86%</td>
                      <td style={{
                        padding: '0.75rem',
                        fontWeight: 'bold',
                        color: 'var(--ifm-color-secondary)',
                        textAlign: 'center'
                      }}>90%</td>
                      <td style={{
                        padding: '0.75rem',
                        fontWeight: 'bold',
                        color: 'var(--ifm-color-secondary)',
                        textAlign: 'center'
                      }}>76%</td>
                      <td style={{
                        padding: '0.75rem',
                        fontWeight: 'bold',
                        color: 'var(--ifm-color-secondary)',
                        textAlign: 'center'
                      }}>84.0%</td>
                    </tr>
                  </tbody>
                </table>
                <p style={{
                  fontSize: '0.9rem',
                  fontStyle: 'italic',
                  marginTop: '1.5rem',
                  opacity: 0.8,
                  textAlign: 'center'
                }}>
                  Zero-shot Sim2Real success rates using ACT policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
