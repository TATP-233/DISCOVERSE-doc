const sidebars = {
    tutorialSidebar: [
        {
            type: 'category',
            label: '快速开始',
            items: ['get-started/installation', 'get-started/quick-start', 'get-started/basic-concepts'],
        },
        {
            type: 'category',
            label: '教程',
            items: [
                {
                    type: 'category',
                    label: '基础仿真',
                    items: ['tutorials/basic-simulation/overview', 'tutorials/basic-simulation/environment-setup', 'tutorials/basic-simulation/robot-control'],
                },
                {
                    type: 'category',
                    label: '传感器',
                    items: ['tutorials/sensors/overview', 'tutorials/sensors/stereo-camera'],
                },
                {
                    type: 'category',
                    label: '模仿学习',
                    items: [
                        'tutorials/imitation-learning/overview',
                        'tutorials/imitation-learning/data-generation',
                        'tutorials/imitation-learning/act',
                        'tutorials/imitation-learning/dp',
                        'tutorials/imitation-learning/rdt',
                        'tutorials/imitation-learning/openpi',
                    ],
                },
                {
                    type: 'category',
                    label: '数据生成',
                    items: ['tutorials/data-generation/overview', 'tutorials/data-generation/domain-randomization'],
                },
            ],
        },
    ],
};

export default sidebars; 