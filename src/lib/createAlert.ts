import APICall from '@/lib/api';

const ALERT_COOLDOWN_SECONDS = 30;

async function createAlert(message: string, tripID: number) {
  const lastAlert = localStorage.getItem('last_alert');
  const now = new Date();
  if (lastAlert) {
    const lastAlertTime = new Date(lastAlert);

    const timeDifference = now.getTime() - lastAlertTime.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);

    if (secondsDifference < ALERT_COOLDOWN_SECONDS) {
      throw new Error(
        `You can only send an alert every ${ALERT_COOLDOWN_SECONDS} seconds.`
      );
    }
  }

  await APICall({
    type: 'POST',
    url: `/alert/index.php?&trip_id=${tripID}`,
    body: {
      message: message,
    },
    success: () => localStorage.setItem('last_alert', now.toISOString()),
    error: (error) => {
      throw new Error(error instanceof Error ? error.message : 'Unknown error');
    },
  });
}

export default createAlert;
