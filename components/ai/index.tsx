import React, { useState, useEffect, useCallback } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Mic, MicOff, Phone, PhoneOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/LendingHealthCheck/ui/button';
import { useToast } from '@/hooks/use-toast';
import SiriLogo from '@/components/AnimatedAI';
import "./index.css";
import { ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import ReactDOM from "react-dom";

const Contact = dynamic(() => import("../contacts"), { ssr: false });

function ContactModalPortal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (typeof window === "undefined") return null;
  return ReactDOM.createPortal(
    <Contact open={open} onClose={onClose} />,
    document.body
  );
}

export const VLO = ({ open, onClose }: { open: Boolean; onClose: () => void }) => {
  const [agentId, setAgentId] = useState('agent_0201k0va7e2bev9tzn9d66ajgbqt');
  const [isConnecting, setIsConnecting] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationEnded, setConversationEnded] = useState<boolean | null>(null);
  const [micMuted, setMicMuted] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [analysis, setAnalysis] = useState(null);
  const { toast } = useToast();
  const [openModal, setOpen] = useState(false);

  const conversation = useConversation({
    micMuted,
    onConnect: (meta) => {
      setIsConnecting(false);
      setConversationId(meta.conversationId)
      toast({
        title: "Connected",
        description: "Successfully connected to AI Assistant",
      });
    },
    onDisconnect: async (meta) => {
      setConversationEnded(true);
      setIsConnecting(false);
      toast({
        title: "Disconnected",
        description: "Conversation ended",
      });
    },
    onError: (error) => {
      setIsConnecting(false);
      toast({
        title: "Connection Error",
        description: typeof error === 'string' ? error : "Failed to connect to AI agent",
        variant: "destructive",
      });
    },
  });

  const toggleMic = useCallback(() => {
    if (mediaStream) {
      const audioTrack = mediaStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMicMuted(!audioTrack.enabled);
      }
    }
  }, [mediaStream]);


  const handleStartConversation = async () => {
    if (!agentId) {
      toast({
        title: "Agent ID Required",
        description: "Please enter your AI Agent ID",
        variant: "destructive",
      });
      return;
    }
    console.log("Hello")
    try {
      setConversationEnded(null);
      setAnalysis(null);
      setIsConnecting(true);

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);

      const id = await conversation.startSession({ agentId });
      setConversationId(id);
    } catch (error) {
      setIsConnecting(false);
      toast({
        title: "Error",
        description: "Failed to start conversation. Please check your microphone permissions.",
        variant: "destructive",
      });
    }
  };

  const handleEndConversation = async () => {
    try {
      await conversation.endSession();
      // setConversationId(null);
      setConversationEnded(true)
      setMediaStream(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to end conversation",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (conversationId && conversationEnded) {
      let isCancelled = false;

      const fetchAnalysis = async (attempt = 0) => {
        console.log(`Fetching analysis... attempt ${attempt + 1}`);

        let response = await fetch(
          `https://api.elevenlabs.io/v1/convai/conversations/${conversationId}?agent_id=agent_0201k0va7e2bev9tzn9d66ajgbqt`,
          {
            method: "GET",
            headers: {
              "xi-api-key": "sk_da3d6723746d45ebc2f5745ad796f2050332021dfacf4896" // Keep it secure
            }
          }
        );

        let data: any = await response.json();

        if (data?.analysis) {
          console.log("Analysis ready:", data.analysis.data_collection_results);
          if (!isCancelled) {
            setAnalysis(data.analysis.data_collection_results);
          }
        } else {
          console.log("Analysis not ready yet, retrying...");
          if (attempt < 10 && !isCancelled) { // limit retries to avoid infinite loop
            setTimeout(() => fetchAnalysis(attempt + 1), 3000); // retry after 3s
          }
        }
      };

      // Initial fetch
      setTimeout(() => fetchAnalysis(), 1500);

      return () => {
        isCancelled = true; // cleanup to prevent updates after unmount
      };
    }
  }, [conversationId, conversationEnded]);


  // Visual wave animation for when speaking
  const WaveAnimation = ({ isActive }: { isActive: boolean }) => (
    <div className="flex items-center justify-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-1 bg-primary rounded-full transition-all duration-300 ${isActive
            ? 'h-8 animate-wave'
            : 'h-2'
            }`}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1.5s',
          }}
        />
      ))}
    </div>
  );

  const handleClose = () => {
    handleEndConversation();
    onClose();
    setAnalysis(null);
    setMicMuted(false);
    setConversationId(null);
  }

  console.log({ analysis })
  const isConnected = conversation.status === 'connected';
  return open ?
    <div className='fixed top-0 z-50 left-0 flex justify-center items-center backdrop-blur-md h-screen w-screen p-6 '>
      <div className={`bg-gradient-to-br w-full ${analysis ? "lg:w-[40%] w-full" : "lg:w-[40%]"} gap-10 py-20 mt-10 px-6 bg-black backdrop-blur-sm w-full max-h-[90%] overflow-y-auto items-center rounded-xl`}>
        {/* <div className="w-full flex-1"> */}
          <svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="cursor-pointer lucide lucide-circle-x-icon lucide-circle-x absolute z-50 top-4 right-4"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
          <div className="w-full flex-1 min-h-max">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="relative flex items-center justify-center mb-8">
                <SiriLogo
                  isAnimating={isConnected}
                  isConversationActive={isConnected}
                />
              </div>
              {!isConnected && (
                <div className="">
                  <h1 className="text-3xl font-bold text-foreground font-poppins text-white">
                    AI Loan Officer
                  </h1>
                </div>
              )}
            </div>

            {/* Main Interface */}
            <div className="bg-black backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl border-[#27272a]">
              {/* Status Display */}
              <div className="text-center mb-8">
                {isConnecting && (
                  <div className="">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#2661d8] to-[#5198e0] rounded-full flex items-center justify-center animate-pulse-soft">
                      <Phone className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground font-dm-sans">Connecting...</p>
                  </div>
                )}

                {isConnected && (
                  <div className="">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-r from-[#2661d8] to-[#5198e0] rounded-full flex items-center justify-center shadow-lg">
                      {conversation.isSpeaking ? (
                        <Volume2 className="w-8 h-8 text-primary-foreground animate-pulse" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
                      )}
                    </div>

                    {/* Wave Animation */}
                    <div className="h-8 flex items-center justify-center mt-5">
                      <WaveAnimation isActive={conversation.isSpeaking} />
                    </div>

                    <div className="">
                      <p className="text-lg font-medium text-white font-plus-jakarta">
                        {conversation.isSpeaking ? 'AI is speaking' : 'Listening'}
                      </p>
                      <p className="text-xs text-muted-foreground font-inter">
                        {conversationId?.slice(-8)}
                      </p>
                    </div>
                  </div>
                )}

                {!isConnected && !isConnecting && (
                  <div className="">
                    <div className="w-16 h-16 mx-auto bg-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center">
                      <MicOff className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-dm-sans">
                      Ready to start
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="">
                {!isConnected && !isConnecting && (
                  <Button
                    onClick={handleStartConversation}
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#2661d8] to-[#5198e0] hover:[2661d8]/90 hover:to-[#5198e0]/90 text-primary-foreground font-medium py-6 text-base rounded-2xl transition-all duration-300 hover:shadow-lg font-poppins"
                    disabled={!agentId}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Start Conversation
                  </Button>
                )}

                {isConnecting && (
                  <Button
                    disabled
                    size="lg"
                    className="w-full bg-muted text-muted-foreground font-medium py-6 text-base rounded-2xl font-poppins"
                  >
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Connecting...
                  </Button>
                )}

                {isConnected && (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#2661d8] to-[#5198e0] rounded-xl flex items-center justify-center shadow-md cursor-pointer" onClick={() => toggleMic()}>
                      {!micMuted ? <Mic className="w-5 h-5 text-primary-foreground" /> : <MicOff className="w-5 h-5 text-primary-foreground" />}
                    </div>
                    <Button
                      onClick={handleEndConversation}
                      size="lg"
                      variant="destructive"
                      className="flex-1 font-medium py-3 text-base rounded-xl transition-all duration-300 hover:shadow-md font-poppins"
                    >
                      <PhoneOff className="mr-2 h-4 w-4" />
                      End Call
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">

              <p className="text-xs text-white font-inter">
                <span className='text-white/50'>Powered by Algebrik’s Advanced AI Technology | </span>  Status: <span className="text-[#2661d8] font-bold capitalize">{conversation.status}</span>
              </p>
            </div>
          </div>

          {analysis ? <div className="lg:flex-1 flex gap-4 flex-col relative overflow-x-auto w-full h-full  lg:overflow-y-scroll min-h-max">
            <h1 className="text-3xl font-bold text-foreground font-poppins text-white pt-6 flex items-center gap-4">
             Analysis
            </h1>
            <table className="flex-1 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                {Object.keys(analysis)?.map(item => {
                  const heading = item.replaceAll("_", " ");
                  const value = (analysis[item] as any)?.value ? (analysis[item] as any)?.value : "N/A"
                  return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                      {heading}
                    </th>
                    <td className="px-6 py-4 w-[200px] min-w-[100px]">
                      {value}
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
            <Button
              onClick={() => {
                // onClose();
                setOpen(true);
              }}
              size="lg"
              className="min-h-min w-full bg-gradient-to-r from-[#2661d8] to-[#5198e0] hover:[2661d8]/90 hover:to-[#5198e0]/90 text-primary-foreground font-medium py-6 text-base rounded-2xl transition-all duration-300 hover:shadow-lg font-poppins"
              disabled={!agentId}
            >
              Export to Algebrik LOS
            </Button>
          </div>
          : !analysis && conversationEnded ? 
          <div className='pt-20 flex items-center flex-col gap-5 justify-center text-muted'><DotsLoader/>Loading Analytics</div>
          :null
          }
        </div>
        <ContactModalPortal open={openModal} onClose={() => {
          setOpen(false);
          handleClose()
        }} />
      </div>
      : null;
};


import { motion } from "framer-motion";

type DotsLoaderProps = {
  size?: number;         // diameter of each dot in px
  color?: string;        // dot color (any valid CSS color)
  count?: number;        // number of dots
  speed?: number;        // time (s) for one dot pulse cycle
  gap?: number;          // gap between dots in px
  className?: string;
  "aria-label"?: string;
};

export default function DotsLoader({
  size = 10,
  color = "#2563eb",
  count = 3,
  speed = 0.9,
  gap = 8,
  className,
  "aria-label": ariaLabel = "Loading",
}: DotsLoaderProps) {
  const container = {
    animate: {
      transition: {
        staggerChildren: speed / (count * 0.8), // distribute timings nicely
      },
    },
  };

  const dot = {
    initial: { scale: 0.6, opacity: 0.3 },
    animate: {
      scale: [0.6, 1.15, 0.85, 0.6],
      opacity: [0.3, 1, 0.6, 0.3],
      transition: {
        duration: speed,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const dots = Array.from({ length: count });

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      variants={container}
      initial="initial"
      animate="animate"
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: gap,
      }}
    >
      {dots.map((_, i) => (
        <motion.span
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: color,
            display: "inline-block",
            // to preserve pixel-crisp on transforms
            transformOrigin: "center",
          }}
        />
      ))}
      {/* Visually hidden text for screen-readers (redundant with aria-label but extra-safe) */}
      <span style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
        {ariaLabel}…
      </span>
    </motion.div>
  );
}