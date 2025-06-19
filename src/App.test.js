import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders newsapp text', () => {
  render(<App />);
  const textElement = screen.getByText(/this is a news/i);
  expect(textElement).toBeInTheDocument();
});
