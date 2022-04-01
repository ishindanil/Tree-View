export type ExpandIconProps = {
    className?: string;
};

export const ExpandIcon = ({ className }: ExpandIconProps) => (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24">
        <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
);
