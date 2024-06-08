function convertDateToISO(dateString: string): string{
    // Create a Date object from the input date string
    const date = new Date(dateString);

    // Get the current time to extract the time part
    const now = new Date();

    // Set the time part to the current time
    date.setHours(now.getUTCHours());
    date.setMinutes(now.getUTCMinutes());
    date.setSeconds(now.getUTCSeconds());
    date.setMilliseconds(now.getUTCMilliseconds());

    // Return the date in ISO 8601 format
    return date.toISOString();
}

export default convertDateToISO;