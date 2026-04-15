import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children text', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    render(<Badge variant="success">Healthy</Badge>);
    const el = screen.getByText('Healthy');
    expect(el.className).toContain('badge-success');
  });

  it('renders as an inline element (span)', () => {
    render(<Badge>Test</Badge>);
    expect(screen.getByText('Test').tagName).toBe('SPAN');
  });
});
