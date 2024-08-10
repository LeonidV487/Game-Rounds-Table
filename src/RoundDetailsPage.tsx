import React from 'react';
import { IRoundDetailsPage } from './types';

const RoundDetailsPage: React.FC<IRoundDetailsPage> = ({roundDetails}) => {
 
  const renderTable = () => {
    if (!roundDetails) return null;

    const itemsArray = roundDetails.items.split(',');
    const rows: string[][] = [];

    for (let i = 0; i < itemsArray.length; i += 5) {
      rows.push(itemsArray.slice(i, i + 5));
    }

    const getMergedRowSpans = (rowIndex: number, itemIndex: number): number => {
      let span = 1;
      while (rowIndex + span < rows.length && rows[rowIndex + span][itemIndex] === '4') {
        span++;
      }
      return span;
    };

    const renderedRowSpans: { [key: string]: boolean } = {};

    return (
      <table className="table-fixed w-full border-collapse border-2 border-black">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-gray-200">
              {row.map((item, itemIndex) => {
                const key = `${rowIndex}-${itemIndex}`;
                if (item === '4' && !renderedRowSpans[key]) {
                  const rowSpan = getMergedRowSpans(rowIndex, itemIndex);
                  renderedRowSpans[key] = true;

                  for (let i = 1; i < rowSpan; i++) {
                    renderedRowSpans[`${rowIndex + i}-${itemIndex}`] = true;
                  }

                  return (
                    <td
                      key={itemIndex}
                      rowSpan={rowSpan}
                      className={`p-2 ${rowSpan > 1 ? 'bg-gray-400' : 'bg-gray-200' } border-2 border-black text-center ${
                        itemIndex < 4 ? 'border-r-0' : ''
                      } ${rowIndex + rowSpan - 1 < rows.length - 1 ? 'border-b-0' : ''}`}
                      style={{ height: roundDetails.height }}
                    >
                      <img src={`/images/${item}.png`} className="w-14 h-14 mx-auto" />
                    </td>
                  );
                } else if (!renderedRowSpans[key]) {
                  return (
                    <td
                      key={itemIndex}
                      className={`p-2 border-2 border-black text-center ${
                        itemIndex < 4 ? 'border-r-0' : ''
                      } ${rowIndex < rows.length - 1 ? 'border-b-0' : ''}`}
                      style={{ height: roundDetails.height }}
                    >
                      <img src={`/images/${item}.png`} className="w-14 h-14 mx-auto" />
                    </td>
                  );
                }
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="p-4 border rounded shadow-md">
            {renderTable()}
        </div>
    </div>
  );
};

export default RoundDetailsPage;