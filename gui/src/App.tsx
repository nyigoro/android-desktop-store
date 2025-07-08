// gui/src/App.tsx
import { useEffect } from 'react';
import './index.css';

const sampleApps = [
  { name: "Fennec Browser", apk: "fennec.apk", id: "fennec" },
  { name: "K-9 Mail", apk: "k9mail.apk", id: "k9mail" },
];

export default function App() {
  useEffect(() => {
    // Receive result from Electron
    window.electronAPI.onInstallResult((result) => {
      alert(`Install Result: ${result}`);
    });
  }, []);

  const handleInstall = (apkId: string) => {
    window.electronAPI.sendInstallCommand(apkId);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📦 Android Desktop Store</h1>
      <ul>
        {sampleApps.map(app => (
          <li key={app.id} className="mb-2 border p-3 rounded">
            <div className="flex justify-between">
              <span>{app.name}</span>
              <button
                onClick={() => handleInstall(app.id)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Convert & Install
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
// This is a simple React component that lists sample Android apps