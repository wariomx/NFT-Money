import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import MainLayout from './layouts/MainLayout';
import Landing from './pages/Landing';
import AppPage from './pages/App';

function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<AppPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;
