import { memo } from 'react';
import { block } from 'bem-cn';

import { LabelComponentProps } from '../TreeView';

import './TreeLabel.css';

const b = block('TreeLabel');

export const TreeLabel = memo(({ disabled, focused, selected, expandable, icon, label }: LabelComponentProps) => {
    return (
        <div className={b({ disabled, focused, selected })}>
            <span className={b('IconContainer')}>{expandable && icon}</span>
            <span className={b('Text')}>{label}</span>
        </div>
    );
});
