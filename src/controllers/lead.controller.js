import csv from "csvtojson"; // as the name signifies, a module for csv to json parsing
import storage from "../storage.js";

const leadController = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Csv file is required!" });
  }

  console.log(
    `File Received successfully: ${req.file.originalname} (${req.file.size}) bytes`
  );
  // first to buffer (binary essence not any txt), then will convert to string (readable text), then to struct-json
  try {
    const leads = await csv().fromString(req.file.buffer.toString());
    storage.leads = leads;
    res.status(200).json({
      message: "File uploaded successfully",
      total_leads: storage.leads.length,
      leads: storage.leads,
    });
  } catch (error) {
    res.status(400).json({
      message: "Encountered an error while parsing the csv to Json",
      error: error,
    });
  }
};

export default leadController;
