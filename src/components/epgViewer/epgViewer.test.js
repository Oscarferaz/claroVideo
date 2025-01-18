import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EpgViewer from './epgViewer';
import * as fetchData from '../../services/fetchData';
import { describe, test, expect, jest, beforeEach } from "@jest/globals";

jest.mock('../../services/fetchData'); // Mock del servicio

describe('EpgViewer Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockData = [
    {
      id: '1',
      name: 'Channel 1',
      image: 'https://via.placeholder.com/150',
      number: '101',
      events: [
        { id: 'e1', duration: '01:00:00', date_begin: '2021/08/12 20:02:56', date_end: '2021/08/12 21:02:56' },
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

    fetchData.getEpgData.mockResolvedValueOnce(mockData);

    await act(async () => {
        render(<EpgViewer onClose={mockOnClose} />);
      });

    // Verifica el estado inicial
    expect(screen.getByText('No hay informacion')).toBeInTheDocument();

    // Simula un hover sobre un evento
    const eventElement = await screen.findByText('20:02:56 - 21:02:56');
    userEvent.hover(eventElement);

    // Verifica que la información del programa aparezca
    expect(await screen.findByText('Duracion: 01:00:00')).toBeInTheDocument();
    expect(screen.getByText('Comienza: 2021/08/12 20:02:56')).toBeInTheDocument();
  });


  test('handles API errors gracefully', async () => {
    fetchData.getEpgData.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<EpgViewer onClose={mockOnClose} />);
    
    // Verifica que no haya datos renderizados
    expect(screen.queryByText('Channel 1')).not.toBeInTheDocument();
  });
});
