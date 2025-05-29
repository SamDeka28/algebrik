declare global {
    interface Window {
      hbspt?: {
        forms: {
          create: (config: { portalId: string; formId: string; target: string }) => void;
        };
      };
    }
  }
  
  export {};
  