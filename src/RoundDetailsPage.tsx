import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface RoundDetails {
  id: string;
  height: string;
  items: string;
}

const RoundDetailsPage: React.FC = () => {
  const { roundId } = useParams<{ roundId: string }>();
  const [roundDetails, setRoundDetails] = useState<RoundDetails | null>(null);

  useEffect(() => {
    const fetchRoundDetails = async () => {
      const response = await fetch(`https://60f7b35b9cdca00017454f5e.mockapi.io/api/v1/round/${roundId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: RoundDetails = await response.json();
      setRoundDetails(data);
    };

    if (roundId) {
      fetchRoundDetails();
    }
  }, [roundId]);

  const renderTable = () => {
    if (!roundDetails) return null;

    const itemsArray = roundDetails.items.split(',');
    const rows: any[] = [];

    for (let i = 0; i < itemsArray.length; i += 5) {
      const rowItems = itemsArray.slice(i, i + 5);
      rows.push(rowItems);
    }

    return (
      <div className="grid grid-cols-5 bg-gray-200" style={{ gridAutoRows: roundDetails.height }}>
        {rows.flat().map((item, index) => (
          <div
            key={index}
            className={`flex justify-center border-2 border-black p-2 ${
              (index + 1) % 5 !== 0 ? 'border-r-0' : ''} ${
              index < 15 ? 'border-b-0' : ''}`}
          >
            <img src={`/images/${item}.png`} className="w-14 h-14" />
          </div>
        ))}
        {rows.flat().length < 20 &&
          Array.from({ length: 20 - rows.flat().length }).map((_, emptyIndex) => (
            <div
              key={`empty-${emptyIndex}`}
              className={`border-2 border-gray-300 p-2 text-center ${
                (rows.flat().length + emptyIndex + 1) % 5 !== 0 ? 'border-r-0' : ''} ${
                rows.flat().length + emptyIndex < 15 ? 'border-b-0' : ''}`}
            />
          ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {roundDetails ? (
        <div className="p-4 border rounded shadow-md">
          <h2 className="text-lg font-semibold">Round Details</h2>
          <p>ID: {roundDetails.id}</p>
          {renderTable()}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RoundDetailsPage;