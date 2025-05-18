import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './routes/Home'
import Gallery from './components/Gallery'
import NatureZine from './components/Gallery/genres/NatureZine'
import CosmosZine from './components/Gallery/genres/CosmosZine'
import OceanZine from './components/Gallery/genres/OceanZine'
import FantasyZine from './components/Gallery/genres/FantasyZine'
import HorrorZine from './components/Gallery/genres/HorrorZine'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/genre/nature" element={<NatureZine onBack={() => navigate('/gallery')} />} />
        <Route path="/genre/cosmos" element={<CosmosZine onBack={() => navigate('/gallery')} />} />
        <Route path="/genre/ocean" element={<OceanZine onNavigate={(path) => navigate(path)} />} />
        <Route path="/genre/fantasy" element={<FantasyZine onNavigate={(path) => navigate(path)} />} />
        <Route path="/genre/horror" element={<HorrorZine onNavigate={(path) => navigate(path)} />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App