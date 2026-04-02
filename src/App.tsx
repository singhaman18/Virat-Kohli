import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import MainPage from './components/MainPage';

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <BrowserRouter>
            <AnimatePresence mode="wait">
                {loading ? (
                    <LoadingScreen
                        key="loading"
                        onComplete={() => setLoading(false)}
                    />
                ) : (
                    <motion.div
                        key="main"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="min-h-screen bg-bg text-text-primary font-body"
                    >
                        <MainPage />
                    </motion.div>
                )}
            </AnimatePresence>
        </BrowserRouter>
    );
}

export default App;
