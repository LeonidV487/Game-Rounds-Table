import React, { useState, useEffect } from 'react';
import { getDate } from './helpers';
import { AccordionContent } from './AccordionContent';
import { IRound, IRoundDetails } from './types';

const App: React.FC = () => {
  const [rounds, setRounds] = useState<IRound[]>([]);
  const [roundDetails, setRoundDetails] = useState<IRoundDetails | null>(null);
  const [activeRoundId, setActiveRoundId] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const fetchRounds = async () => {
    try {
      const response = await fetch('https://60f7b35b9cdca00017454f5e.mockapi.io/api/v1/rounds');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: IRound[] = await response.json();
      setRounds(data);
    } catch (error) {
      console.error('Failed to fetch rounds:', error);
    }
  };

  const fetchRoundDetails = async (roundId: string) => {
    setLoading(roundId);
    try {
      const response = await fetch(`https://60f7b35b9cdca00017454f5e.mockapi.io/api/v1/round/${roundId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: IRoundDetails = await response.json();
      setRoundDetails(data);
    } catch (error) {
      console.error('Failed to fetch round details:', error);
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    fetchRounds();
  }, []);

  const refreshRounds = (e: React.MouseEvent, roundId: string) => {
    e.stopPropagation();
    fetchRoundDetails(roundId);
  };

  const handleRoundClick = (roundId: string) => {
    fetchRoundDetails(roundId);
    if (activeRoundId === roundId) {
      setActiveRoundId(null);
    } else {
      setActiveRoundId(roundId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex mb-4 text-lg font-semibold">
        <div className="flex-1 text-center">Rounds</div>
        <div className="flex-1 text-center">Date</div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {rounds.map(round => (
          <div key={round.roundId}>
            <div 
              className="p-4 border rounded shadow-md flex items-center justify-between cursor-pointer"
              onClick={() => handleRoundClick(round.roundId)}
            >
              <div className="flex-1 text-center">
                {round.roundId}
              </div>
              <div className="flex-1 text-center">
                {getDate(round.dateTime)}
              </div>
              <div>
                <button
                  onClick={(e) => refreshRounds(e, round.roundId)}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Refresh
                </button>
              </div>
            </div>
            {activeRoundId === round.roundId && (
              <div>
                {loading === round.roundId ? (
                  <div className="p-4 text-center">Loading...</div>
                ) : (
                  <AccordionContent roundDetails={roundDetails} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;