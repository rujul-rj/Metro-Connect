// frontend/src/components/MetroMoneyPage.js

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, animate } from 'framer-motion';
import './MetroMoneyPage.css'; // Ensure this CSS file exists and is correct
import { FaDonate, FaPercent, FaSquareRootAlt, FaChartLine, FaInfinity, FaQuestion, FaGift } from 'react-icons/fa'; // Ensure react-icons is installed

// Custom hook for the counter animation
function useCounterAnimation(targetValue) {
  const ref = useRef();
  const initialValue = useRef(0);
  useEffect(() => {
      const node = ref.current;
      if (!node) return;
      const previousValue = initialValue.current;
      initialValue.current = targetValue ?? 0;
      const controls = animate(previousValue, targetValue ?? 0, { duration: 0.8, ease: "easeOut", onUpdate(value) { node.textContent = `₹${Math.round(value)}`; } });
      return () => controls.stop();
   }, [targetValue]);
  return <h1 ref={ref}>₹{initialValue.current ?? '...'}</h1>;
}


const MetroMoneyPage = () => {
  const { user, token, refreshUser } = useAuth();
  // Add/Withdraw state
  const [addAmount, setAddAmount] = useState(50);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState(10);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [withdrawError, setWithdrawError] = useState('');
  const [withdrawSuccess, setWithdrawSuccess] = useState('');
  // Funny action state
  const [funnyLoading, setFunnyLoading] = useState(false);
  const [funnyError, setFunnyError] = useState('');
  const [funnySuccess, setFunnySuccess] = useState('');
  // --- ADD EXPLOSION STATE ---
  const [showExplosion, setShowExplosion] = useState(false);
  const [loadingAction, setLoadingAction] = useState(null); // Keep track of specific loading action


  const balanceDisplay = useCounterAnimation(user?.metroMoneyBalance);

  // Add Money Handler (unchanged)
  const handleAddMoney = async (e) => {
    e.preventDefault();
    setAddLoading(true); setAddError(''); setAddSuccess(''); setWithdrawError(''); setWithdrawSuccess(''); setFunnyError(''); setFunnySuccess('');
    if (!user) { setAddError('User not found.'); setAddLoading(false); return; }
    try {
      const res = await fetch('http://localhost:5001/api/users/addmoney', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ amount: Number(addAmount) }), });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `Status: ${res.status}`);
      refreshUser({ metroMoneyBalance: data.metroMoneyBalance });
      setAddSuccess(`₹${addAmount} added!`);
      setTimeout(() => setAddSuccess(''), 4000);
    } catch (err) { setAddError(err.message); }
    finally { setAddLoading(false); }
  };

  // Withdraw Money Handler (unchanged)
  const handleWithdrawMoney = async (e) => {
    e.preventDefault();
    setWithdrawLoading(true); setWithdrawError(''); setWithdrawSuccess(''); setAddError(''); setAddSuccess(''); setFunnyError(''); setFunnySuccess('');
    if (!user) { setWithdrawError('User not found.'); setWithdrawLoading(false); return; }
    try {
      const res = await fetch('http://localhost:5001/api/users/withdrawmoney', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ amount: Number(withdrawAmount) }), });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `Status: ${res.status}`);
      refreshUser({ metroMoneyBalance: data.metroMoneyBalance });
      setWithdrawSuccess(`₹${withdrawAmount} withdrawn!`);
      setTimeout(() => setWithdrawSuccess(''), 4000);
    } catch (err) { setWithdrawError(err.message); }
    finally { setWithdrawLoading(false); }
  };

  // Funny Action Handler (Updated for explosion)
  const handleFunnyAction = async (actionType, endpoint) => {
    const purelyFunnyActions = {
        'Entangle Funds': "Quantum Entanglement successful... maybe? Balance remains suspiciously the same.",
        'Convert to Dogecoin': "Converting to Dogecoin... Error: Much network, very congestion. Wow.",
        'Gift Wrap Balance': "Balance successfully gift-wrapped. Recipient: Schrödinger's Cat.",
        'Ask Balance Nicely': "Asking balance nicely... Balance responded: 'I'm feeling about ₹" + (user?.metroMoneyBalance ?? 0) + ", thanks for asking!'",
        'Time Travel Funds': "Temporal flux capacitor offline. Unable to send funds through time."
    };
    if (purelyFunnyActions[actionType]) { setFunnyError(''); setFunnySuccess(''); alert(purelyFunnyActions[actionType]); return; }

    setLoadingAction(actionType); // Track which button is loading
    setFunnyLoading(true); setFunnyError(''); setFunnySuccess('');
    setAddError(''); setAddSuccess(''); setWithdrawError(''); setWithdrawSuccess('');

    if (!user || !token) { setFunnyError('Login required!'); setFunnyLoading(false); setLoadingAction(null); return; }

    try {
      const res = await fetch(`http://localhost:5001/api/users/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `Action failed (Status: ${res.status})`);

      refreshUser({ metroMoneyBalance: data.metroMoneyBalance });
      setFunnySuccess(`${actionType} applied!`);
      setTimeout(() => setFunnySuccess(''), 4000);

      // --- TRIGGER EXPLOSION ---
      if (actionType === 'Donate to Charity') {
          setShowExplosion(true);
          // Hide explosion after animation duration (match CSS)
          setTimeout(() => setShowExplosion(false), 2500);
      }
      // --- END TRIGGER ---

    } catch (err) { setFunnyError(err.message); }
    finally {
        setFunnyLoading(false);
        setLoadingAction(null); // Clear loading tracker
    }
  };

  return (
    <motion.div className="money-page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* Balance Card */}
      <div className="balance-card">
        <h3>Your Metro Money Balance</h3>
        {balanceDisplay}
      </div>

      {/* Add Money Form */}
      <motion.form className="money-form add-form" onSubmit={handleAddMoney} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2>Add Money</h2><p>Select an amount to top up your wallet.</p><div className="amount-options">{[50, 100, 200, 500].map((val) => ( <button type="button" key={`add-${val}`} className={`amount-btn ${addAmount === val ? 'active' : ''}`} onClick={() => { setAddAmount(val); setAddSuccess(''); setAddError(''); }}>₹{val}</button> ))}</div><button type="submit" className="form-btn add-money-btn" disabled={addLoading}>{addLoading ? 'Processing...' : `Add ₹${addAmount}`}</button>{addError && <p className="form-error">{addError}</p>}{addSuccess && <p className="form-success">{addSuccess}</p>}
      </motion.form>

      {/* Withdraw Money Form */}
      <motion.form className="money-form withdraw-form" onSubmit={handleWithdrawMoney} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
           <h2>Withdraw Money</h2><p>Select an amount to withdraw.</p><div className="amount-options">{[10, 20, 50, 100].map((val) => ( <button type="button" key={`withdraw-${val}`} className={`amount-btn withdraw ${withdrawAmount === val ? 'active' : ''}`} onClick={() => { setWithdrawAmount(val); setWithdrawSuccess(''); setWithdrawError(''); }}>₹{val}</button>))}</div><button type="submit" className="form-btn withdraw-money-btn" disabled={withdrawLoading || (user?.metroMoneyBalance ?? 0) < withdrawAmount}>{withdrawLoading ? 'Processing...' : `Withdraw ₹${withdrawAmount}`}</button>{(user?.metroMoneyBalance ?? 0) < withdrawAmount && !withdrawLoading && <p className="form-error no-margin">Insufficient balance</p>}{withdrawError && <p className="form-error">{withdrawError}</p>}{withdrawSuccess && <p className="form-success">{withdrawSuccess}</p>}
      </motion.form>

      {/* Funny Actions Section */}
      <motion.div className="money-form funny-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <h2>Advanced Metronomics™️</h2>
        <p>Warning: Experimental features. Use with caution (or amusement).</p>
        {funnyError && <p className="form-error">{funnyError}</p>}
        {funnySuccess && <p className="form-success">{funnySuccess}</p>}
        <div className="funny-buttons-grid">
          <button className="form-btn funny-btn" onClick={() => handleFunnyAction('Multiply Money (x2)', 'multiplymoney')} disabled={funnyLoading}>Multiply (x2)</button>
          <button className="form-btn funny-btn" onClick={() => handleFunnyAction('Divide Money (/π)', 'dividemoney')} disabled={funnyLoading}>Divide (/π)</button>
          <button className="form-btn funny-btn" onClick={() => handleFunnyAction('Square Money (x²)', 'squaremoney')} disabled={funnyLoading}>Square (x²)</button>
          <button className="form-btn funny-btn" onClick={() => handleFunnyAction('Square Root Money (√x)', 'sqrtmoney')} disabled={funnyLoading}><FaSquareRootAlt/> Sqrt (√x)</button>
          <button className="form-btn funny-btn" onClick={() => handleFunnyAction('Logarithmic Money (ln x)', 'logmoney')} disabled={funnyLoading}><FaChartLine/> Log (ln x)</button>
          <button className="form-btn funny-btn" onClick={() => handleFunnyAction('Exponential Money (e^x)', 'expmoney')} disabled={funnyLoading}>Exp (e^x)</button>
          <button className="form-btn funny-btn donate" onClick={() => handleFunnyAction('Donate to Charity', 'donatemoney')} disabled={funnyLoading || (user?.metroMoneyBalance ?? 0) <= 0}><FaDonate /> Donate ALL {funnyLoading && loadingAction === 'Donate to Charity' ? '...' : ''}</button>
          <button className="form-btn funny-btn" onClick={() => handleFunnyAction('Entangle Funds')} disabled={funnyLoading}><FaInfinity /> Entangle</button>
          <button className="form-btn funny-btn" onClick={() => handleFunnyAction('Convert to Dogecoin')} disabled={funnyLoading}><FaPercent/> To Crypto</button>
          <button className="form-btn funny-btn" onClick={() => handleFunnyAction('Gift Wrap Balance')} disabled={funnyLoading}><FaGift /> Gift Wrap</button>
          <button className="form-btn funny-btn" onClick={() => handleFunnyAction('Ask Balance Nicely')} disabled={funnyLoading}><FaQuestion/> Ask Nicely</button>
          <button className="form-btn funny-btn" onClick={() => handleFunnyAction('Time Travel Funds')} disabled={funnyLoading}>To Past Self</button>
        </div>
        {funnyLoading && <p className="loading-message small">Calculating quantum finances...</p>}
      </motion.div>

      {/* --- ADD EXPLOSION OVERLAY JSX --- */}
      {showExplosion && (
        <div className="explosion-overlay">
          {[...Array(150)].map((_, i) => ( // More particles
            <div
              key={i}
              className="explosion-particle"
              style={{
                // Bigger spread
                '--x': `${Math.random() * 800 - 400}px`, // +/- 400px
                '--y': `${Math.random() * 800 - 400}px`, // +/- 400px
                '--angle': `${Math.random() * 360}deg`, // For rotation
                '--delay': `${Math.random() * 0.5}s`,
                // Bigger size range
                '--size': `${Math.random() * 10 + 5}px`, // 5px to 15px
                // Full color spectrum
                '--color': `hsl(${Math.random() * 360}, 100%, 65%)` // Brighter colors
              }}
            ></div>
          ))}
        </div>
      )}
      {/* --- END EXPLOSION OVERLAY --- */}

    </motion.div>
  );
};

export default MetroMoneyPage;