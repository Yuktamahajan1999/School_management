import { useState } from "react";
import ShowSchools from "./Pages/ShowSchool";
import AddSchool from "./Pages/AddSchool";
import { ToastContainer } from 'react-toastify';

function App() {
  const [activeTab, setActiveTab] = useState("view");

  return (
    <div className="App">
      <header className="app-header">
        <h1>School Management System</h1>
        <nav className="tabs">
          <button 
            className={activeTab === "view" ? "active" : ""} 
            onClick={() => setActiveTab("view")}
          >
            View Schools
          </button>
          <button 
            className={activeTab === "add" ? "active" : ""} 
            onClick={() => setActiveTab("add")}
          >
            Add School
          </button>
        </nav>
      </header>
      
      <main className="app-main">
        {activeTab === "view" ? <ShowSchools /> : <AddSchool />}
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;