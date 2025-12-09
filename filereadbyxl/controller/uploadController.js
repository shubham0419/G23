const xlsx = require("xlsx");

const uploadStudents = async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (sheetData.length === 0) {
      throw new Error("Sheet is empty");
    }
    let userData;
    sheetData.map(async (row, batchIndex) => {
       userData = {
        name: row["name"] || "Unknown",
        phone: row["phone number"]?.toString() || "",
        oauth_id: `oauth_${email}`,
        roll_no: roll_no.toString(),
        branch: row["branch"] || "",
        section: row["section"]?.toString() || "",
        last_sync: new Date(),
        linkedin_username: row["linkedin profile"] || not_provided,
        github: row["github profile"] || not_provided,
        batch: batchName,
        year: parseInt(year),
      };
    });
    res.status(200).json({userData})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
};

module.exports = uploadStudents