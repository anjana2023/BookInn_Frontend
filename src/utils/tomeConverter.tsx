export const convertTimeFormat = (timeString: string | undefined): string => {
    if (!timeString) return "";
    let [hour, min] = timeString.split(":").map((str) => parseInt(str, 10));
    const paddedHour = hour.toString().padStart(2, "0");
    const paddedMin = min.toString().padStart(2, "0");
  
    if (hour < 12) return `${paddedHour}:${paddedMin} AM`;
    return `${hour % 12 || 12}:${paddedMin} PM`;
  };
  
  export const convert24HourTime = (timeString: string | undefined): string => {
    if (!timeString) return "";
    return new Date("1970-01-01T" + timeString + "Z").toLocaleTimeString(
      "en-US",
      { timeZone: "UTC", hour12: true, hour: "numeric", minute: "numeric" }
    );
  };
  