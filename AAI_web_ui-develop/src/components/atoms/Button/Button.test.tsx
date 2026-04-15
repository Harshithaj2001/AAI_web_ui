import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies the correct variant class', () => {
    render(<Button variant="accent">Gold</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('btn-accent');
  });

  it('applies small size class', () => {
    render(<Button size="sm">Small</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('btn-sm');
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Press</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('is disabled when the disabled prop is set', () => {
    render(<Button disabled>No</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('merges custom className', () => {
    render(<Button className="extra">X</Button>);
    expect(screen.getByRole('button').className).toContain('extra');
  });
});
