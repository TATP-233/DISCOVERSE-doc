import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/zh-Hans/blog',
    component: ComponentCreator('/zh-Hans/blog', '575'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/archive',
    component: ComponentCreator('/zh-Hans/blog/archive', 'c6a'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/authors',
    component: ComponentCreator('/zh-Hans/blog/authors', 'eed'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/zh-Hans/blog/authors/all-sebastien-lorber-articles', '3cd'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/authors/yangshun',
    component: ComponentCreator('/zh-Hans/blog/authors/yangshun', 'b1b'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/first-blog-post',
    component: ComponentCreator('/zh-Hans/blog/first-blog-post', '9f9'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/long-blog-post',
    component: ComponentCreator('/zh-Hans/blog/long-blog-post', 'd61'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/mdx-blog-post',
    component: ComponentCreator('/zh-Hans/blog/mdx-blog-post', 'd1e'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/tags',
    component: ComponentCreator('/zh-Hans/blog/tags', 'c60'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/tags/docusaurus',
    component: ComponentCreator('/zh-Hans/blog/tags/docusaurus', '874'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/tags/facebook',
    component: ComponentCreator('/zh-Hans/blog/tags/facebook', '205'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/tags/hello',
    component: ComponentCreator('/zh-Hans/blog/tags/hello', '0ab'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/tags/hola',
    component: ComponentCreator('/zh-Hans/blog/tags/hola', 'c43'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/welcome',
    component: ComponentCreator('/zh-Hans/blog/welcome', 'abc'),
    exact: true
  },
  {
    path: '/zh-Hans/markdown-page',
    component: ComponentCreator('/zh-Hans/markdown-page', '1d3'),
    exact: true
  },
  {
    path: '/zh-Hans/docs',
    component: ComponentCreator('/zh-Hans/docs', '9d2'),
    routes: [
      {
        path: '/zh-Hans/docs',
        component: ComponentCreator('/zh-Hans/docs', 'b60'),
        routes: [
          {
            path: '/zh-Hans/docs',
            component: ComponentCreator('/zh-Hans/docs', '5db'),
            routes: [
              {
                path: '/zh-Hans/docs/get-started/basic-concepts',
                component: ComponentCreator('/zh-Hans/docs/get-started/basic-concepts', 'd43'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/get-started/installation',
                component: ComponentCreator('/zh-Hans/docs/get-started/installation', '542'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/get-started/quick-start',
                component: ComponentCreator('/zh-Hans/docs/get-started/quick-start', '0b3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/get-started/real2sim',
                component: ComponentCreator('/zh-Hans/docs/get-started/real2sim', 'ab8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/tutorials/basic-simulation/environment-setup',
                component: ComponentCreator('/zh-Hans/docs/tutorials/basic-simulation/environment-setup', '650'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/tutorials/basic-simulation/overview',
                component: ComponentCreator('/zh-Hans/docs/tutorials/basic-simulation/overview', '11f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/tutorials/basic-simulation/robot-control',
                component: ComponentCreator('/zh-Hans/docs/tutorials/basic-simulation/robot-control', 'b43'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/tutorials/data-generation/domain-randomization',
                component: ComponentCreator('/zh-Hans/docs/tutorials/data-generation/domain-randomization', '7cb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/tutorials/data-generation/overview',
                component: ComponentCreator('/zh-Hans/docs/tutorials/data-generation/overview', '031'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/tutorials/imitation-learning/act',
                component: ComponentCreator('/zh-Hans/docs/tutorials/imitation-learning/act', '36a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/tutorials/imitation-learning/data-generation',
                component: ComponentCreator('/zh-Hans/docs/tutorials/imitation-learning/data-generation', '6c5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/tutorials/imitation-learning/dp',
                component: ComponentCreator('/zh-Hans/docs/tutorials/imitation-learning/dp', 'c99'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/tutorials/imitation-learning/openpi',
                component: ComponentCreator('/zh-Hans/docs/tutorials/imitation-learning/openpi', '184'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/tutorials/imitation-learning/overview',
                component: ComponentCreator('/zh-Hans/docs/tutorials/imitation-learning/overview', 'd57'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/tutorials/imitation-learning/rdt',
                component: ComponentCreator('/zh-Hans/docs/tutorials/imitation-learning/rdt', '5df'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/tutorials/modeling/gaussian-splatting',
                component: ComponentCreator('/zh-Hans/docs/tutorials/modeling/gaussian-splatting', '2f0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/tutorials/modeling/mesh2mjcf',
                component: ComponentCreator('/zh-Hans/docs/tutorials/modeling/mesh2mjcf', '52d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/tutorials/modeling/overview',
                component: ComponentCreator('/zh-Hans/docs/tutorials/modeling/overview', '906'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/tutorials/modeling/xml-editor',
                component: ComponentCreator('/zh-Hans/docs/tutorials/modeling/xml-editor', '3a8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/tutorials/sensors/overview',
                component: ComponentCreator('/zh-Hans/docs/tutorials/sensors/overview', '0b6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/zh-Hans/docs/tutorials/sensors/stereo-camera',
                component: ComponentCreator('/zh-Hans/docs/tutorials/sensors/stereo-camera', 'cfb'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/zh-Hans/',
    component: ComponentCreator('/zh-Hans/', '85c'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
