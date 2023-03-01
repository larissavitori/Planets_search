import React from 'react';
import Myprovider from '../context/myProvider';
import { findByText, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import response from '../../cypress/mocks/fetch';
import userEvent from '@testing-library/user-event';
 
describe('test', () => {
  beforeEach(() => {
    global.fetch = jest.fn(response)
  });

  afterEach(() => {
    jest.clearAllMocks()
  }); 

  test('Testando os inputs', async () => {
    render(<Myprovider><App /></Myprovider>);
    const nameInput = await screen.findByTestId("name-filter");
    const colun = screen.getByRole('columnheader', {  name: /name/i})
    const input = screen.getByRole('textbox')

    expect(colun).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(input).toBeVisible();
 });
 test('Testando os inputs', async () => {
   const firstEndpoint = 'https://swapi.dev/api/planets/';
   
   render(<Myprovider><App /></Myprovider>);

  const buttun  = screen.getByRole('button', {
    name: 'filtrar',
   })
   userEvent.click(buttun); 
   expect(buttun).toBeDefined();
   expect(global.fetch).toHaveBeenCalledWith(firstEndpoint);
});
 })
 
