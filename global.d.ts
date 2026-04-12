import type * as React from 'react';

declare global {
    interface Window {
      hbspt?: {
        forms: {
          create: (config: { portalId: string; formId: string; target: string }) => void;
        };
      };
      /** @deprecated Prefer MeetingsEmbedCode.init() for meetings iframe embeds */
      HubSpotMeetings?: {
        loadMeetings: () => void;
      };
      MeetingsEmbedCode?: {
        init: () => void;
      };
    }
  }
  
  declare namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
  
  export {};
  