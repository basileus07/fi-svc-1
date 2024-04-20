import './App.css';
import Header from './components/Header';
import { Routes, Route } from "react-router-dom";
import TransactionInputScreen from './components/TransactionInputScreen';
import InsightsScreen from './components/InsightsScreen';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<TransactionInputScreen />} />
        <Route path="/insights" element={<InsightsScreen />} />
      </Routes>
    </div>
  );
}

export default App;
