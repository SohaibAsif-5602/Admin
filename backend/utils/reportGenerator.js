const axios = require("axios");

const formatTimestamp = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const fetchDataFromThingSpeak = async (readAPIKey, channelID) => {
  try {
    const response = await axios.get(
      `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${readAPIKey}`
    );
    const feeds = response.data.feeds;

    // Transform ThingSpeak data into the required format
    const sampleData = feeds.flatMap((feed, index) => [
      {
        id: index + 1,
        parameter: "Temperature",
        value: feed.field1, // Replace with actual field for temperature
        timestamp: new Date(feed.created_at),
      },
      {
        id: index + 1,
        parameter: "pH",
        value: feed.field2, // Replace with actual field for pH
        timestamp: new Date(feed.created_at),
      },
      {
        id: index + 1,
        parameter: "Turbidity",
        value: feed.field3, // Replace with actual field for turbidity
        timestamp: new Date(feed.created_at),
      },
    ]);

    return sampleData;
  } catch (error) {
    console.error("Error fetching data from ThingSpeak:", error.message);
    return [];
  }
};

const generateCSV = async (readAPIKey, channelID) => {
  channelID = '2592426'
  readAPIKey = '45H5S1N645GKKUCB'
  const sampleData = await fetchDataFromThingSpeak(readAPIKey, channelID);

  if (sampleData.length === 0) {
    return "No data available to generate CSV.";
  }

  const csvHeader = "ID,Parameter,Value,Timestamp\n";
  const csvRows = sampleData
    .map(
      (item) =>
        `${item.id},${item.parameter},${item.value},${formatTimestamp(
          item.timestamp
        )}`
    )
    .join("\n");

  return csvHeader + csvRows;
};

// Exporting the function
module.exports = { generateCSV };

// Usage Example:
// const { generateCSV } = require('./path_to_this_file');
// generateCSV('YOUR_READ_API_KEY', 'YOUR_CHANNEL_ID').then(console.log);
