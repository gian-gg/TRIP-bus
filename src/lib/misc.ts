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
  });
}

export { formatPassengerType, getCurrentTimeDate };
