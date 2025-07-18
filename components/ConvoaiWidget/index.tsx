// app/components/ConvaiWidget.tsx
'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function ConvaiWidget() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = () => {
      if (customElements.get('elevenlabs-convai')) {
        setReady(true);
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  }, []);

  return (
    <>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
        async
        type="text/javascript"
        onLoad={() => console.log('ElevenLabs Convai script loaded')}
      />

      {ready && (
        <>
          {/* @ts-ignore */}
          <elevenlabs-convai
            agent-id="agent_01jwdd48b1e17rkf0dngh470mv"
            style={{ display: 'block' }}
          />
        </>
      )}
    </>
  );
}
