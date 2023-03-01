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
    const inputColuna = screen.getByTestId("column-filter");
    const inputNumber = screen.getByTestId("value-filter");

     userEvent.selectOptions(inputColuna, screen.getByRole('option', { name: 'population'}))
     userEvent.selectOptions(inputColuna, screen.getByRole('option', { name: 'population'}))
     
    expect(inputNumber).toBeInTheDocument();
    expect(inputColuna).toBeInTheDocument();
    expect(colun).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(input).toBeVisible();
 });
 test('Testando a chamada da api ', async () => {
   render(<Myprovider><App /></Myprovider>)

});

 })
 
