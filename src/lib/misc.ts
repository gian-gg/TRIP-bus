function formatPassengerType(passengerType: string): string {
  if (passengerType.toLowerCase() === 'pwd') {
    return 'PWD';
  }
  return passengerType.charAt(0).toUpperCase() + passengerType.slice(1);
}

export { formatPassengerType };
