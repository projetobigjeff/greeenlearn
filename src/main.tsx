
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Prevent zoom on double tap for mobile
document.addEventListener('touchstart', function(event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, { passive: false });

// Prevent pinch zoom
document.addEventListener('gesturestart', function(event) {
  event.preventDefault();
});

createRoot(document.getElementById("root")!).render(<App />);
