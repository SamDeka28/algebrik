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
  
declare namespace JSX {
  interface IntrinsicElements {
    'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}
  