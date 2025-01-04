import React from 'react';

const ArrowUpSvg = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => {
    return (
        <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            width="1em"
            height="1em"
            fill="currentColor"
            {...props}
            ref={ref}
        >
            <path d="M96.196 671.807l415.804-415.632 415.803 415.632-63.616 63.445-352.209-352.017-352.102 352.017z"></path>
        </svg>
    );
});

ArrowUpSvg.displayName = 'ArrowUpSvg';
export default ArrowUpSvg;
