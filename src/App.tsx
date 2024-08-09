import React, { useState, useEffect } from 'react';

interface Round {
  roundId: string;
  dateTime: string;
}

const App: React.FC = () => {
  const [rounds, setRounds] = useState<Round[]>([]);

  useEffect(() => {
    const fetchRounds = async () => {
      const response = await fetch('https://60f7b35b9cdca00017454f5e.mockapi.io/api/v1/rounds');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Round[] = await response.json();
      setRounds(data);
    };

    fetchRounds();
  }, []);

  console.log(rounds);

  const getDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
       <div className="flex mb-4 text-lg font-semibold">
        <div className="flex-1 text-center">Rounds</div>
        <div className="flex-1 text-center">Date</div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {rounds.map(round => (
          <div key={round.roundId} className="p-4 border rounded shadow-md flex items-center justify-between">
            <div className="flex-1 text-center">
              {round.roundId}
            </div>
            <div className="flex-1 text-center">
              {getDate(round.dateTime)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
