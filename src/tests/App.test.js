import React from 'react';
import Myprovider from '../context/myProvider';
import { findByText, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import response from '../../cypress/mocks/fetch';
import userEvent from '@testing-library/user-event';

const waitingTimer = (milissegundos) => {
 return new Promise(tempo  => { 
  setTimeout(tempo, milissegundos);
 });
}

describe('test', () => {
  beforeEach(() => {
    global.fetch = jest.fn(response)
  });

  afterEach(() => {
    jest.clearAllMocks()
  }); 

  test('Testando os inputs',  () => {
    render(<Myprovider><App /></Myprovider>);
    const nameInput =  screen.getByTestId("name-filter");
    const input = screen.getByRole('textbox')
    const colun = screen.getByRole('columnheader', {  name: /name/i})

    userEvent.type(nameInput, 'o');

    expect(colun).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(input).toBeVisible();
 });
 test('preencher tabela com dados retornados ', async () => {
   render(<Myprovider><App /></Myprovider>)
   await waitingTimer(4000)
   const compare = screen.getByTestId("comparison-filter");
   const value = screen.getByTestId("value-filter");
   const inputColuna = await screen.findByTestId("column-filter");
  // const testAPIRender = await screen.findAllByText(23)
  
   userEvent.selectOptions(inputColuna, screen.getByRole('option', { name: 'surface_water'}))
   userEvent.selectOptions(compare, screen.getByRole('option', { name: 'menor que'}))
   userEvent.type(value, '7');
   const row = screen.queryAllByRole('row')
   expect(row).toHaveLength(11);
   userEvent.click(screen.getByTestId('button-filter'));
   expect(row).toHaveLength(11);

    
  
   /* expect(value).toBeInTheDocument();
   expect(inputColuna[0].innerHTML).toContain('orbital_period')
   expect(compare).toBeInTheDocument();
   expect(inputColuna).toBeInTheDocument();
   expect(testAPIRender[0].innerHTML).toContain('23'); */

   userEvent.click(screen.getByTestId('button-remove-filters'));
  
   // userEvent.click(screen.getByTestId('data-testid="filter'));
});
test('click do botão deletar', async () => {
  render(<Myprovider><App /></Myprovider>)
  const compare = screen.getByTestId("comparison-filter");
  const value = screen.getByTestId("value-filter");
  const inputColuna = await screen.findByTestId("column-filter");
  
  userEvent.selectOptions(inputColuna, screen.getByRole('option', { name: 'surface_water'}))
  userEvent.selectOptions(compare, screen.getByRole('option', { name: 'maior que'}))
  userEvent.type(value, '10');
  const row = screen.queryAllByRole('row')
  expect(row).toHaveLength(11);
  userEvent.click(screen.getByTestId('button-filter'));
  expect(row).toHaveLength(11);
})
test('click do botão deletar', async () => {
  render(<Myprovider><App /></Myprovider>)
  const compare = screen.getByTestId("comparison-filter");
  const value = screen.getByTestId("value-filter");
  const inputColuna = await screen.findByTestId("column-filter");
  
  userEvent.selectOptions(inputColuna, screen.getByRole('option', { name: 'surface_water'}))
  userEvent.selectOptions(compare, screen.getByRole('option', { name: 'igual a'}))
  userEvent.type(value, '10');
  const row = screen.queryAllByRole('row')
  expect(row).toHaveLength(11);
  userEvent.click(screen.getByTestId('button-filter'));
  expect(row).toHaveLength(11);
})
})