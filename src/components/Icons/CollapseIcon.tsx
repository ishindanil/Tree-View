export type CollapseIconProps = {
    className?: string;
};

export const CollapseIcon = ({ className }: CollapseIconProps) => (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24">
        <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
);
