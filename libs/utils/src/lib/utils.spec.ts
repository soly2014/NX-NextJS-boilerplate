import { cn } from './utils';

describe('cn function', () => {
  test('should merge multiple class names into a single string', () => {
    const result = cn('btn', 'btn-primary', 'active');
    expect(result).toBe('btn btn-primary active');
  });

  test('should ignore falsy values', () => {
    const result = cn('btn', null, undefined, false, 'active');
    expect(result).toBe('btn active');
  });

  test('should handle conditional classes correctly', () => {
    const isActive = true;
    const isDisabled = false;
    const result = cn('btn', isActive && 'active', isDisabled && 'disabled');
    expect(result).toBe('btn active');
  });

  test('should correctly merge classes with different priorities', () => {
    // Tailwind utility classes might have different merging behaviors
    const result = cn('text-red-500', 'text-blue-500');
    expect(result).toBe('text-blue-500'); // Assuming text-blue-500 has higher specificity
  });
});
