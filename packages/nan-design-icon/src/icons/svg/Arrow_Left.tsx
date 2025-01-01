import React from 'react';

const ArrowLeftSvg = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
    (props, ref) => {
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
                <path d="M532.526499 904.817574L139.506311 511.797385 532.526499 118.777197c12.258185-12.258185 12.432147-32.892131-0.187265-45.51052-12.707416-12.707416-32.995485-12.703323-45.511543-0.187265L75.166957 484.739123c-7.120165 7.120165-10.163477 17.065677-8.990768 26.624381-1.500167 9.755178 1.5104 20.010753 8.990768 27.491121l411.660734 411.660734c12.258185 12.258185 32.892131 12.432147 45.511543-0.187265 12.707416-12.707416 12.7023-32.995485 0.187265-45.51052z"></path>
            </svg>
        );
    }
);

ArrowLeftSvg.displayName = 'ArrowLeftSvg';
export default ArrowLeftSvg;
