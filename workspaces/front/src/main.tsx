import { lazy, StrictMode } from 'react'
import { createRoot, type Root } from 'react-dom/client'

let dashboard: Root | null = null;
let initialized = false;
document.addEventListener('livewire:navigating', () => {
    console.group('leaving page using dashboard component');
    console.log({ dashboard });
    console.log({ initialized });
    console.groupEnd();
    if (dashboard !== null) {
        initialized = false;
        dashboard.unmount();
    }
});
document.addEventListener('dashboard:init', () => {
    console.group('entering page using dashboard component');
    console.log({ dashboard });
    console.log({ initialized });
    console.groupEnd();
    initializeDashboard();
});
async function initializeDashboard() {
    const dashboardRoot = document.getElementById('dashboard');
    if(dashboardRoot !== null && !initialized) {
        initialized = true;
        const App = lazy(() => import('./App.tsx'));
        dashboard = createRoot(dashboardRoot);
        dashboard.render(
            <StrictMode>
                <App />
            </StrictMode>,
        );
    }
}
document.addEventListener('livewire:navigated', ()=> {
    console.group('navigated to a page using dashboard component');
    console.log({ dashboard });
    console.log({ initialized });
    console.groupEnd();
    initializeDashboard();
});
