import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';

import { CardContainer, CardHeader, CardBody } from '@/components/Card';
import Container from '@/components/Container';
import Dialog from '@/components/Dialog';
import Button from '@/components/Button';

import APICall from '@/lib/api';
import { type TripSummaryType } from '../type';

const TripSummaryModal = (props: {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}) => {
  const [tripSummary, setTripSummary] = useState<
    TripSummaryType['data'] | null
  >(null);

  const fetchData = useCallback(async () => {
    const tripID = localStorage.getItem('conductor_trip_id');
    if (!tripID) {
      throw new Error('Trip ID not found in local storage');
    }

    await APICall<TripSummaryType['data']>({
      type: 'GET',
      url: '/trip/index.php?trip_id=' + tripID,
      success: (data) => {
        setTripSummary(data);
        // Clear trip info after fetching summary
        localStorage.removeItem('conductor_trip_id');
        localStorage.removeItem('conductor_route_id');
      },
      error: (error) => {
        throw new Error(
          error instanceof Error ? error.message : 'Unknown error'
        );
      },
    });
  }, []);

  const handleDownloadTrip = useCallback(() => {
    if (tripSummary) {
      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(tripSummary, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute('href', dataStr);

      const now = new Date();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const yyyy = now.getFullYear();

      downloadAnchorNode.setAttribute(
        'download',
        `trip-${mm}${dd}${yyyy}.json`
      );
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
    toast.success('Trip summary downloaded successfully!');
  }, [tripSummary]);

  useEffect(() => {
    if (props.isOpen) {
      fetchData();
    }
  }, [fetchData, props.isOpen]);

  return (
    <Dialog
      open={props.isOpen}
      as="div"
      onClose={() => null}
      className="w-full lg:w-2/5"
    >
      <CardContainer className="h-full w-full">
        <CardHeader className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-white">Trip Summary</h1>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 !p-6 !text-sm">
          <Container className="mt-4">
            {tripSummary ? (
              <pre>{JSON.stringify(tripSummary, null, 2)}</pre>
            ) : (
              <p>No trip summary available</p>
            )}
          </Container>
          <Button
            variant="solid"
            className="w-full"
            onClick={handleDownloadTrip}
          >
            Download Trip
          </Button>
          <p className="text-muted text-center text-xs">
            ⚠️ Refreshing Closes the Modal. ⚠️
          </p>
        </CardBody>
      </CardContainer>
    </Dialog>
  );
};

export default React.memo(TripSummaryModal);
