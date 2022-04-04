import { fireEvent, render, screen } from '@testing-library/react';

import { CollapseIcon, ExpandIcon } from '../../Icons';

import { TreeView, TreeViewProps } from '../TreeView';

describe('TreeView component tests', () => {
    const nodesMock = [
        {
            id: 'projects',
            label: 'Projects',
            children: [
                { id: 'project-1.docx', label: 'project-1.docx' },
                {
                    id: 'project-2',
                    label: 'project-2',
                    children: [
                        { id: 'project-2A.docx', label: 'project-2A.docx' },
                        { id: 'project-2B.docx', label: 'project-2B.docx' },
                    ],
                },
                { id: 'project-3.docx', label: 'project-3.docx' },
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
                    ],
                },
                {
                    id: 'report-2',
                    label: 'report-2',
                    children: [
                        { id: 'report-2A.docx', label: 'report-2A.docx' },
                        { id: 'report-2B.docx', label: 'report-2B.docx' },
                    ],
                },
            ],
        },
        {
            id: 'letters',
            label: 'Letters',
            disabled: true,
            children: [
                {
                    id: 'letter-1',
                    label: 'letter-1',
                    children: [
                        { id: 'letter-1A.docx', label: 'letter-1A.docx' },
                        { id: 'letter-1B.docx', label: 'letter-1B.docx' },
                    ],
                },
                {
                    id: 'letter-2',
                    label: 'letter-2',
                    children: [
                        { id: 'letter-2A.docx', label: 'letter-2A.docx' },
                        { id: 'letter-2B.docx', label: 'letter-2B.docx' },
                    ],
                },
                {
                    id: 'letter-3',
                    label: 'letter-3',
                    children: [
                        { id: 'letter-3A.docx', label: 'letter-3A.docx' },
                        { id: 'letter-3B.docx', label: 'letter-3B.docx' },
                    ],
                },
            ],
        },
    ];

    const makeTree = (props?: Partial<TreeViewProps>) => {
        render(
            <TreeView
                nodes={nodesMock}
                selected={[]}
                expanded={[]}
                expandIcon={<ExpandIcon />}
                collapseIcon={<CollapseIcon />}
                {...props}
            />,
        );

        return screen.getByRole('tree');
    };

    it('should have aria-multiselectable set to false', () => {
        const tree = makeTree();

        expect(tree).toHaveAttribute('aria-multiselectable', 'false');
    });

    it('should not have aria-activedescendant attribute', () => {
        const tree = makeTree();

        expect(tree.getAttribute('aria-activedescendant')).toBeNull();
    });

    it('should have tabIndex set to 0', () => {
        const tree = makeTree();

        expect(tree).toHaveAttribute('tabIndex', '0');
        expect(tree).toHaveClass('TreeView');
    });

    it('should have aria-multiselectable set to true', () => {
        const tree = makeTree({ multiSelect: true });

        expect(tree).toHaveAttribute('aria-multiselectable', 'true');
    });

    it('should focus first element', () => {
        const tree = makeTree();

        fireEvent.focus(tree);

        expect(tree).toHaveAttribute('aria-activedescendant', 'projects');
    });

    it('should focus last selected element', () => {
        const tree = makeTree({ selected: ['projects', 'reports'] });

        fireEvent.focus(tree);

        expect(tree).toHaveAttribute('aria-activedescendant', 'reports');
    });

    it('should have aria-selected attribute on selected node', () => {
        makeTree({ selected: ['reports'] });

        const selectedNode = screen.getByTestId('reports');

        expect(selectedNode).toHaveAttribute('aria-selected', 'true');
    });

    it('should not have aria-selected attribute on not selected nodes', () => {
        makeTree();

        const notSelectedNode = screen.getByTestId('reports');

        expect(notSelectedNode.getAttribute('aria-selected')).toBeNull();
    });

    it('should have aria-selected attribute set to false on not selected nodes when multiselectable', () => {
        makeTree({ multiSelect: true });

        const notSelectedNode = screen.getByTestId('reports');

        expect(notSelectedNode).toHaveAttribute('aria-selected', 'false');
    });

    it('should have aria-expanded attribute set to false on collapsed parent nodes', () => {
        makeTree();

        const collapsedNode = screen.getByTestId('reports');

        expect(collapsedNode).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have aria-expanded attribute set to true on expanded parent nodes', () => {
        makeTree({ expanded: ['reports'] });

        const reportsNode = screen.getByTestId('reports');
        expect(reportsNode).toHaveAttribute('aria-expanded', 'true');
    });

    it('should not have aria-expanded attribute on end nodes', () => {
        makeTree({ expanded: ['projects'] });

        const endNode = screen.getByTestId('project-1.docx');

        expect(endNode.getAttribute('aria-expanded')).toBeNull();
    });

    it('should have aria-disabled attribute set to false on active nodes', () => {
        makeTree();

        const activeNode = screen.getByTestId('projects');

        expect(activeNode).toHaveAttribute('aria-disabled', 'false');
    });

    it('should have aria-disabled attribute set to true on disabled nodes', () => {
        makeTree();

        const disabledNode = screen.getByTestId('letters');

        expect(disabledNode).toHaveAttribute('aria-disabled', 'true');
        expect(disabledNode.getAttribute('aria-selected')).toBeNull();
    });

    it('should not have aria-selected attribute on disabled nodes', () => {
        makeTree({ multiSelect: true });

        const disabledNode = screen.getByTestId('letters');

        expect(disabledNode.getAttribute('aria-selected')).toBeNull();
    });
});
