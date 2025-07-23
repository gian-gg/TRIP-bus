import Button from '@/components/Button';
import clsx from 'clsx';

import { SeatInfo } from '@/data';
import type { TicketType } from '@/type';
import { legendConfig, type AisleModalType } from '../type';

const SeatButton = (props: {
  label: string;
  ticket: TicketType | null;
  handleClick: (ticket: TicketType) => void;
}) => {
  return (
    <div className="relative translate-x-0">
      {props.ticket?.payment.payment_status ? (
        <Button
          variant="outline"
          onClick={() => props.handleClick(props.ticket as TicketType)}
          style={{
            borderColor:
              legendConfig[props.ticket.payment.payment_status].borderColor,
            backgroundColor:
              legendConfig[props.ticket.payment.payment_status].bgColor,
          }}
          className={clsx(
            'h-16 w-16 !border-2 font-extrabold md:h-18 md:w-18 lg:h-20 lg:w-20'
          )}
        >
          {props.label}
        </Button>
      ) : (
        <Button
          variant="outline"
          className={clsx(
            '!border-outline h-16 w-16 !border-2 font-extrabold md:h-18 md:w-18 lg:h-20 lg:w-20'
          )}
        >
          {props.label}
        </Button>
      )}
      {props.ticket?.passenger_category && (
        <div
          style={{
            backgroundColor:
              legendConfig[props.ticket.passenger_category].borderColor,
            borderColor: '#fff',
          }}
          className="absolute -top-1 -left-1 h-4 w-4 rounded-full border-2"
        />
      )}
    </div>
  );
};

const SeatingGrid = (props: {
  passengerData: TicketType[];
  handleClick: (arg: TicketType) => void;
  handleAisleClick: (arg: AisleModalType) => void;
}) => {
  return (
    <div className="grid w-full grid-cols-5 items-start justify-items-center gap-2">
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
                  <SeatButton
                    key={cellId}
                    label={cellId}
                    ticket={
                      props.passengerData
                        ? (props.passengerData.find(
                            (p) => p.seat_number === cellId
                          ) as TicketType)
                        : null
                    }
                    handleClick={props.handleClick}
                  />
                );
              }
              // Render one big button for the rest of the aisle
              if (rowNumber === 10) {
                const aisleTickets = props.passengerData
                  ? props.passengerData.filter((p) => p.seat_number === 'Aisle')
                  : undefined;
                return (
                  <Button
                    onClick={() =>
                      props.handleAisleClick({
                        open: true,
                        tickets: aisleTickets,
                      })
                    }
                    key="aisle"
                    variant="outline"
                    className="!border-outline flex h-[calc(4rem*11)] w-16 flex-col items-center justify-center !border-2 font-extrabold md:h-[calc(4.5rem*10)] md:w-18 lg:h-[calc(5rem*10)] lg:w-20"
                  >
                    <span className="flex rotate-270 gap-2 text-lg font-semibold">
                      Aisle{' '}
                      <span>({aisleTickets ? aisleTickets.length : '0'})</span>
                    </span>
                  </Button>
                );
              }
              return null;
            }

            return (
              <SeatButton
                key={cellId}
                label={cellId}
                ticket={
                  props.passengerData
                    ? (props.passengerData.find(
                        (p) => p.seat_number === cellId
                      ) as TicketType)
                    : null
                }
                handleClick={props.handleClick}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SeatingGrid;
