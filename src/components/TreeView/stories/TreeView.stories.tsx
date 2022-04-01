import { useMemo, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';


import { TreeView } from '../.';
import { CollapseIcon, ExpandIcon } from '../../Icons';

import { NODES_MOCK, generateLargeDataset } from './TreeView.mock';

export default {
    title: 'TreeView',
    component: TreeView,
    parameters: {
        controls: { expanded: true },
    },
    argTypes: {
        nodes: {
            control: 'object',
        },
        multiSelect: {
            control: 'boolean',
        },
        expanded: {
            disable: true,
        }
    }
} as ComponentMeta<typeof TreeView>;

const Template: ComponentStory<typeof TreeView> = ({ multiSelect, nodes }) => {
    const [selected, setSelected] = useState<string[] | string>([]);
    const [expanded, setExpanded] = useState<string[]>([]);

    return (
        <TreeView
            collapseIcon={<CollapseIcon />}
            expandIcon={<ExpandIcon />}
            selected={selected}
            expanded={expanded}
            onSelect={setSelected}
            onToggle={setExpanded}
            nodes={nodes}
            multiSelect={multiSelect}
        />
    )
}

export const Playground = Template.bind({});
Playground.args = {
    multiSelect: false,
    nodes: NODES_MOCK,
}

export const LargeDataset = Template.bind({});
LargeDataset.args = {
    multiSelect: false,
    nodes: generateLargeDataset(),
}
LargeDataset.parameters = {
    controls: { disabled: true }
}
