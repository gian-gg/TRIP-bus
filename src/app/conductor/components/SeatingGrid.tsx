import Button from '@/components/Button';

import { SeatInfo } from '@/data';

const SeatingGrid = (props: { handleClick: (arg: string) => void }) => {
  return (
    <div className="grid w-full grid-cols-5 gap-2">
      {SeatInfo.cols.map((col) => (
        <div key={col} className="flex flex-col gap-2">
          {[...Array(SeatInfo.row)].map((_, i) => {
            const rowNumber = SeatInfo.row - i; // To display back row (11) at top
            const cellId = `${col}${rowNumber}`;

            // Special handling for aisle column (C)
            if (col === 'C') {
              // Render C11 as a normal seat
              if (rowNumber === 11) {
                return (
                  <Button
                    key={cellId}
                    variant="outline"
                    onClick={() => props.handleClick(cellId)}
                    className="!border-outline h-16 w-16 !border-2 md:h-18 md:w-18 lg:h-20 lg:w-20"
                  >
                    {cellId}
                  </Button>
                );
              }
              // Render one big button for the rest of the aisle
              if (rowNumber === 10) {
                return (
                  <Button
                    key="aisle"
                    variant="outline"
                    className="!border-outline flex h-[calc(4rem*11)] w-16 flex-col items-center justify-center !border-2 md:h-[calc(4.5rem*10)] md:w-18 lg:h-[calc(5rem*10)] lg:w-20"
                  >
                    <span className="rotate-270 text-lg font-semibold">
                      Aisle
                    </span>
                  </Button>
                );
              }
              return null;
            }

            return (
              <Button
                key={cellId}
                variant="outline"
                onClick={() => props.handleClick(cellId)}
                className="!border-outline h-16 w-16 !border-2 md:h-18 md:w-18 lg:h-20 lg:w-20"
              >
                {cellId}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SeatingGrid;
