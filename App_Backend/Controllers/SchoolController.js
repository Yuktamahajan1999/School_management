import db from "../Config/db.js";

const addSchool = (req, res) => {
  try {
    const { name, address, city, state, contact, email_id } = req.body;
    const image = req.file ? req.file.filename : null;

    console.log(" Received:", { name, address, city, state, contact, email_id, image });

    const sql = `
      INSERT INTO schools (name, address, city, state, contact, image, email_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, address, city, state, contact, image, email_id], (err, result) => {
      if (err) {
        console.error(" DB Insert Error:", err);
        return res.status(500).json({ error: err.message });
      }
      return res.json({ message: " School added successfully", id: result.insertId });
    });
  } catch (error) {
    console.error(" addSchool Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSchools = (req, res) => {
  const sql = "SELECT * FROM schools";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(" DB Fetch Error:", err);
      return res.status(500).json({ error: err.message });
    }
    
    const schoolsWithImages = results.map(school => ({
      ...school,
      image: school.image ? `http://localhost:8000/uploads/${school.image}` : null
    }));
    
    return res.json(schoolsWithImages);
  });
};

export { addSchool, getSchools };
