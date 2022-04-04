import { TreeNodeProps } from '../../TreeNode';

export const NODES_MOCK: TreeNodeProps[] = [
    {
        id: 'projects',
        label: 'Projects',
        children: [
            { id: 'project-1.docx', label: 'project-1.docx' },
            { id: 'project-2.docx', label: 'project-2.docx', disabled: true },
            {
                id: 'project-3',
                label: 'project-3',
                children: [
                    { id: 'project-3A.docx', label: 'project-3A.docx' },
                    { id: 'project-3B.docx', label: 'project-3B.docx' },
                    { id: 'project-3C.docx', label: 'project-3C.docx' },
                ],
            },
            { id: 'project-4.docx', label: 'project-4.docx' },
            {
                id: 'project-5',
                label: 'project-5',
                children: [
                    { id: 'project-5A.docx', label: 'project-5A.docx' },
                    { id: 'project-5B.docx', label: 'project-5B.docx' },
                    { id: 'project-5C.docx', label: 'project-5C.docx' },
                    { id: 'project-5D.docx', label: 'project-5D.docx' },
                    { id: 'project-5E.docx', label: 'project-5E.docx' },
                    { id: 'project-5F.docx', label: 'project-5F.docx' },
                ],
            },
        ],
    },
    {
        id: 'reports',
        label: 'Reports',
        children: [
            {
                id: 'report-1',
                label: 'report-1',
                children: [
                    { id: 'report-1A.docx', label: 'report-1A.docx' },
                    { id: 'report-1B.docx', label: 'report-1B.docx' },
                    { id: 'report-1C.docx', label: 'report-1C.docx' },
                ],
            },
            {
                id: 'report-2',
                label: 'report-2',
                disabled: true,
                children: [
                    { id: 'report-2A.docx', label: 'report-2A.docx' },
                    { id: 'report-2B.docx', label: 'report-2B.docx' },
                    { id: 'report-2C.docx', label: 'report-2C.docx' },
                    { id: 'report-2D.docx', label: 'report-2D.docx' },
                ],
            },
            {
                id: 'report-3',
                label: 'report-3',
                children: [
                    { id: 'report-3A.docx', label: 'report-3A.docx' },
                    { id: 'report-3B.docx', label: 'report-3B.docx' },
                    { id: 'report-3C.docx', label: 'report-3C.docx' },
                ],
            },
        ],
    },
    {
        id: 'letters',
        label: 'Letters',
        children: [
            {
                id: 'letter-1',
                label: 'letter-1',
                children: [
                    { id: 'letter-1A.docx', label: 'letter-1A.docx' },
                    { id: 'letter-1B.docx', label: 'letter-1B.docx' },
                    { id: 'letter-1C.docx', label: 'letter-1C.docx' },
                ],
            },
            {
                id: 'letter-2',
                label: 'letter-2',
                children: [
                    { id: 'letter-2A.docx', label: 'letter-2A.docx' },
                    { id: 'letter-2B.docx', label: 'letter-2B.docx' },
                    { id: 'letter-2C.docx', label: 'letter-2C.docx' },
                    { id: 'letter-2D.docx', label: 'letter-2D.docx' },
                ],
            },
            {
                id: 'letter-3',
                label: 'letter-3',
                children: [
                    { id: 'letter-3A.docx', label: 'letter-3A.docx' },
                    { id: 'letter-3B.docx', label: 'letter-3B.docx' },
                    { id: 'letter-3C.docx', label: 'letter-3C.docx' },
                    { id: 'letter-3D.docx', label: 'letter-3D.docx' },
                ],
            },
        ],
    },
];

export function generateLargeDataset(count = 1000) {
    const nodes = [];

    for (let i = 0; i < count; i++) {
        nodes.push({
            id: `Item ${i}`,
            label: `Item ${i}`,
            children: [
                { id: `Nested item ${i}1`, label: `Nested item ${i}1` },
                { id: `Nested item ${i}2`, label: `Nested item ${i}2` },
                { id: `Nested item ${i}3`, label: `Nested item ${i}3` },
            ],
        });
    }

    return nodes;
}
