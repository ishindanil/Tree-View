import { memo } from 'react';
import { block } from 'bem-cn';

import { LabelComponentProps } from '../TreeView';

import './TreeLabel.css';

const b = block('TreeLabel');

export const TreeLabel = memo(({ focused, selected, expandable, icon, label }: LabelComponentProps) => {
    return (
        <div className={b({ focused, selected })}>
            <span className={b('IconContainer')}>{expandable && icon}</span>
            {label}
        </div>
    );
});
