import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EpgViewer from './epgViewer';
import * as fetchData from '../../services/fetchData';
import { describe, test, expect, jest } from "@jest/globals";

jest.mock('../../services/fetchData');

describe('EpgViewer Component', () => {
  const mockOnClose = jest.fn();


  const mockData = [
    {
      id: '1',
      name: 'Channel 1',
      image: 'https://via.placeholder.com/150',
      number: '101',
      events: [
        { id: 'e1', duration: '01:00:00', date_begin: '2021/08/12 20:02:56', date_end: '2021/08/12 21:02:56', name: 'Test', description: 'Prueba de programa'},
      ],
    },
  ];



  test('renders data after loading', async () => {

    await fetchData.getEpgData.mockResolvedValueOnce(mockData);

    await act(async () => {
        render(<EpgViewer onClose={mockOnClose} />);
      });


    await waitFor(() => {
      expect(screen.getByText('101')).toBeInTheDocument();
    });
  });

  test('handles program hover correctly', async () => {

    await fetchData.getEpgData.mockResolvedValueOnce(mockData);

    await act(async () => {
        render(<EpgViewer onClose={mockOnClose} />);
      });


    // Simula un hover sobre un evento
    const eventElement = await screen.findByText('Test');
    userEvent.hover(eventElement);

    // Verifica que la información del programa aparezca
    expect(await screen.findByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Prueba de programa')).toBeInTheDocument();
  });


  test('handles API errors gracefully', async () => {
    await fetchData.getEpgData.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<EpgViewer onClose={mockOnClose} />);
    
    // Verifica que no haya datos renderizados
    expect(screen.queryByText('Channel 1')).not.toBeInTheDocument();
  });
});
