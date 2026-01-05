import { lazy, StrictMode } from 'react'
import { createRoot, type Root } from 'react-dom/client'

let dashboard: Root | null = null;
document.addEventListener('livewire:navigating', () => {
    if (dashboard !== null) {
        console.log('leaving page using dashboard component');
        dashboard.unmount();
    }
});

document.addEventListener('livewire:navigated', async () => {
    const dashboardRoot = document.getElementById('dashboard');
    if(dashboardRoot !== null) {
        const App = lazy(() => import('./App.tsx'));
        dashboard = createRoot(dashboardRoot);
        dashboard.render(
            <StrictMode>
                <App />
            </StrictMode>,
        );
    }
})
