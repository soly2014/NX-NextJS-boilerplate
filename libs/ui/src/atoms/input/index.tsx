/* eslint-disable @typescript-eslint/no-empty-interface */
import * as React from 'react';

import { cn } from '@utils';
import { useFormField } from '../form';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { error } = useFormField();

    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            'placeholder:text-input-placeholder bg-input-background file:bg-input-background flex h-12 w-full rounded-[8px] border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:text-sm file:font-medium placeholder:text-[14px] placeholder:font-normal focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-destructive focus-visible:ring-destructive'
              : 'border-input focus-visible:ring-ring',
            className,
          )}
          ref={ref}
          {...props}
        />
        {props.value && (
          <button
            type="button"
            onClick={() => {
              if (ref && typeof ref === 'function') ref(null);
              else if (ref && ref.current) ref.current.value = '';
            }}
            className="text-input-placeholder absolute end-3 top-1/2 hidden -translate-y-1/2 transform hover:text-gray-600"
          >
            &#x2715; {/* X icon */}
          </button>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
