import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("All Cities");

  useEffect(() => {
    axios.get(`${API_URL}/schools/getSchools`)
      .then((res) => {
        setSchools(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load schools");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading schools...</div>;

  const cities = [...new Set(schools.map((school) => school.city))];
  const schoolsInSelectedCity =
    selectedCity !== "All Cities"
      ? schools.filter((school) => school.city === selectedCity)
      : [];

  return (
    <div className="container">
      <h2 className="school">Schools by City</h2>

      <div className="city-buttons">
        <button
          onClick={() => setSelectedCity("All Cities")}
          className={selectedCity === "All Cities" ? "active" : ""}
        >
          All Cities
        </button>
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={selectedCity === city ? "active" : ""}
          >
            {city}
          </button>
        ))}
      </div>

      {selectedCity === "All Cities" ? (
        <div className="cities-list">
          <div className="city-grid">
            {cities.map((city) => (
              <div
                key={city}
                className="city-card"
                onClick={() => setSelectedCity(city)}
              >
                <div className="city-icon">🏫</div>
                <div className="city-name">{city}</div>
                <div className="schools-count">
                  {schools.filter((school) => school.city === city).length} schools
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : schoolsInSelectedCity.length > 0 ? (
        <div className="schools-section">
          <div className="section-header">
            <h3>Schools in {selectedCity}</h3>
            <button
              className="back-button"
              onClick={() => setSelectedCity("All Cities")}
            >
              ← Back to all cities
            </button>
          </div>
          <div className="schools-grid">
            {schoolsInSelectedCity.map((school) => (
              <div key={school.id || school._id} className="school-card">
                <div className="school-image">
                  <img
                    src={school.image || "/placeholder-school.jpg"}
                    alt={school.name}
                    onError={(e) => {
                      e.target.src = "/placeholder-school.jpg";
                    }}
                  />
                </div>
                <div className="school-info">
                  <h3>{school.name}</h3>
                  <p className="school-address">
                    {school.address && <span>{school.address}, </span>}
                    {school.city && <span>{school.city}</span>}
                    {school.state && <span>, {school.state}</span>}
                  </p>
                  {school.contact && <p className="school-contact">{school.contact}</p>}
                  {school.email_id && <p className="school-email">{school.email_id}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-schools">
          <p>No schools found in {selectedCity}.</p>
          <button
            className="back-button"
            onClick={() => setSelectedCity("All Cities")}
          >
            ← Back to all cities
          </button>
        </div>
      )}
    </div>
  );
}

export default ShowSchools;