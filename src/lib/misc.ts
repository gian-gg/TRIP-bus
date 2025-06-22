const PH_TZ = 'Asia/Manila';

function formatPassengerType(passengerType: string): string {
  if (passengerType.toLowerCase() === 'pwd') {
    return 'PWD';
  }
  return passengerType.charAt(0).toUpperCase() + passengerType.slice(1);
}

function getCurrentTimeDate(): string {
  return new Date().toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: PH_TZ,
  });
}

function formatTimeDate(dateTime: string): string {
  const [datePart, timePart] = dateTime.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute, second] = timePart.split(':').map(Number);

  const date = new Date(year, month - 1, day, hour, minute, second);

  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: PH_TZ,
  });
}

export { formatPassengerType, getCurrentTimeDate, formatTimeDate };
