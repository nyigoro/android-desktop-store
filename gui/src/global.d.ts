export {};
// This file is used to declare global types for the Electron API in the renderer process.
// It allows TypeScript to recognize the `electronAPI` object on the `window` object.
// This is necessary for type safety and to avoid TypeScript errors when accessing the API in the React components.
// It should be included in the TypeScript compilation context, typically by being referenced in tsconfig.json or imported in the main entry file.
// This file is used to declare global types for the Electron API in the renderer process.
// It allows TypeScript to recognize the `electronAPI` object on the `window` object.
// This is necessary for type safety and to avoid TypeScript errors when accessing the API in the React components.
declare global {
  interface Window {
    electronAPI: {
      sendInstallCommand: (apkId: string) => void;
      onInstallResult: (callback: (result: string) => void) => void;
    };
  }
}
