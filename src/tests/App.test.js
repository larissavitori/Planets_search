import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Table from '../components/table';

test('testa a quantidade de colunas', () => {
  render(<App />);
  const linkElement = getByRole('columnheader', { name: /name/i })
  expect(linkElement).toBeInTheDocument();
});
