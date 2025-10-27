// frontend/src/components/LostFoundPage.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle, FaSearch, FaPlusCircle, FaListUl } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Select from './Select'; // Ensure Select component exists at ./Select.js
import './LostFoundPage.css'; // Ensure CSS file exists at ./LostFoundPage.css

const LostFoundPage = () => {
  const [activeTab, setActiveTab] = useState('view');
  const [foundItems, setFoundItems] = useState([]);
  const [stations, setStations] = useState([]);
  const [loadingFound, setLoadingFound] = useState(false);
  const [errorFound, setErrorFound] = useState('');
  const { user, token } = useAuth(); // Get token as well

  const [category, setCategory] = useState('Other');
  const [description, setDescription] = useState('');
  const [station, setStation] = useState('');
  const [dateLostFound, setDateLostFound] = useState(new Date().toISOString().split('T')[0]);
  const [contactName, setContactName] = useState(user?.username || '');
  const [contactInfo, setContactInfo] = useState(user?.email || '');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Fetch Found Items
  useEffect(() => {
    const fetchFound = async () => {
      setLoadingFound(true); setErrorFound('');
      try {
        // --- ENSURE THIS URL IS CORRECT ---
        const res = await fetch('http://localhost:5001/api/lostfound/found');
        console.log(`Frontend: Fetching /api/lostfound/found, Status: ${res.status}`);
        const data = await res.json();
        if (!res.ok) { console.error('Fetch failed:', data); throw new Error(data.message || `Status: ${res.status}`); }
        setFoundItems(data);
      } catch (err) { console.error('Fetch error:', err); setErrorFound(err.message); }
      finally { setLoadingFound(false); }
    };
    if (activeTab === 'view') { fetchFound(); }
  }, [activeTab]); // Rerun when tab changes

  // Fetch Stations
  useEffect(() => {
    const fetchStations = async () => {
       try {
         const res = await fetch('http://localhost:5001/api/stations');
         const data = await res.json();
         if (res.ok) {
           const stationNames = data.map(s => s.name).sort((a, b) => a.localeCompare(b));
           setStations(stationNames);
           if (stationNames.length > 0 && !station) { setStation(stationNames[0]); }
         }
       } catch (err) { console.error("Failed to fetch stations", err); }
    };
    fetchStations();
  }, [station]); // Dependency ensures default is set if stations load after initial render

   // Form Submission
   const handleSubmitReport = async (e, status) => {
     e.preventDefault();
     setFormLoading(true); setFormError(''); setFormSuccess('');
     if (!description || !station || !dateLostFound) { setFormError('Desc, Station, Date required.'); setFormLoading(false); return; }
     const reportData = { status, category, description, station, dateLostFound, contactName, contactInfo };
     try {
       // --- ENSURE THIS URL IS CORRECT ---
       const res = await fetch('http://localhost:5001/api/lostfound', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           // Send token if available (protect middleware handles it)
           ...(token && { 'Authorization': `Bearer ${token}` }),
         },
         body: JSON.stringify(reportData),
       });
       console.log(`Frontend: Submitting POST /api/lostfound, Status: ${res.status}`);
       const data = await res.json();
       if (!res.ok) { console.error('Submit failed:', data); throw new Error(data.message || `Status: ${res.status}`); }
       setFormSuccess(`Successfully reported ${status} item!`);
       setDescription(''); // Reset description
       setActiveTab('view'); // Switch to view tab
       setTimeout(() => setFormSuccess(''), 5000);
     } catch (err) { console.error('Submit error:', err); setFormError(err.message); }
     finally { setFormLoading(false); }
   };

   // Render Forms
   const renderReportForm = (status) => ( /* ... JSX remains the same as previous correct version ... */
      <motion.form key={status} className="report-form" onSubmit={(e) => handleSubmitReport(e, status)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
        <h3>Report {status === 'lost' ? 'Lost' : 'Found'} Item</h3>
        {formError && <p className="form-error">{formError}</p>}
        {formSuccess && <p className="form-success">{formSuccess}</p>}
        <Select id="category" label="Category:" value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option>Electronics</option><option>Bags/Luggage</option><option>Clothing/Accessories</option><option>ID/Cards/Wallets</option><option>Keys</option><option>Other</option>
        </Select>
        <div className="form-group">
           <label htmlFor="description">Description:</label>
           <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={`Details about the ${status} item...`} maxLength="500" required />
        </div>
         <Select id="station" label={status === 'lost' ? "Last Seen At:" : "Found At:"} value={station} onChange={(e) => setStation(e.target.value)} required>
           {stations.length === 0 && <option disabled value="">Loading stations...</option>}
           {stations.map(sName => <option key={sName} value={sName}>{sName}</option>)}
         </Select>
         <div className="form-group">
            <label htmlFor="dateLostFound">Date {status === 'lost' ? 'Lost' : 'Found'}:</label>
            <input type="date" id="dateLostFound" value={dateLostFound} onChange={(e) => setDateLostFound(e.target.value)} max={new Date().toISOString().split('T')[0]} required />
         </div>
         <fieldset className='contact-info-optional'>
             <legend>Contact Info (Optional)</legend>
             <p>Provide details if you wish to be contacted. This info is NOT displayed publicly.</p>
             <div className="form-group"><label htmlFor="contactName">Your Name:</label><input type="text" id="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)} maxLength="100"/></div>
              <div className="form-group"><label htmlFor="contactInfo">Email or Phone:</label><input type="text" id="contactInfo" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} maxLength="100"/></div>
         </fieldset>
        <button type="submit" className="form-btn submit-report-btn" disabled={formLoading}>{formLoading ? 'Submitting...' : `Submit Report`}</button>
      </motion.form>
    );

  // Main Render
  return (
    <motion.div className="lost-found-page interactive" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h2><FaInfoCircle /> Lost & Found</h2>
      <div className="lf-tabs">
        <button className={`tab-btn ${activeTab === 'view' ? 'active' : ''}`} onClick={() => setActiveTab('view')}><FaListUl /> View Found Items</button>
        <button className={`tab-btn ${activeTab === 'reportLost' ? 'active' : ''}`} onClick={() => setActiveTab('reportLost')}><FaSearch /> Report Lost Item</button>
        <button className={`tab-btn ${activeTab === 'reportFound' ? 'active' : ''}`} onClick={() => setActiveTab('reportFound')}><FaPlusCircle /> Report Found Item</button>
      </div>
      <AnimatePresence mode="wait">
        {activeTab === 'view' && (
          <motion.div key="view" className="tab-content view-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3>Recently Found Items</h3>
            {loadingFound && <p className="loading-message">Loading...</p>}
            {errorFound && <p className="page-error">{errorFound}</p>}
            {!loadingFound && !errorFound && foundItems.length === 0 && <p>No recently found items reported.</p>}
            {!loadingFound && !errorFound && foundItems.length > 0 && (
              <div className="found-items-list">
                {foundItems.map(item => (
                  <motion.div key={item._id} className="found-item-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: foundItems.indexOf(item) * 0.05 }}>
                    <h4>{item.category}</h4>
                    <p className="item-desc">{item.description}</p>
                    <div className="item-details">
                       <span><strong>Found At:</strong> {item.station}</span>
                       <span><strong>Date Found:</strong> {new Date(item.dateLostFound).toLocaleDateString()}</span>
                    </div>
                     <p className='claim-info'>To claim, contact Namma Metro staff.</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
        {activeTab === 'reportLost' && renderReportForm('lost')}
        {activeTab === 'reportFound' && renderReportForm('found')}
      </AnimatePresence>
    </motion.div>
  );
};

export default LostFoundPage;