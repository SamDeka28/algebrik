import React, { useState, useEffect, useCallback } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Mic, MicOff, Phone, PhoneOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/LendingHealthCheck/ui/button';
import { useToast } from '@/hooks/use-toast';
import SiriLogo from '@/components/AnimatedAI';
import "./index.css";

export const VLO = ({open,onClose}:{open:Boolean;onClose:()=>void}) => {
  const [agentId, setAgentId] = useState('agent_0201k0va7e2bev9tzn9d66ajgbqt');
  const [isConnecting, setIsConnecting] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [micMuted, setMicMuted] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const { toast } = useToast();

  const conversation = useConversation({
    micMuted,
    onConnect: () => {
      setIsConnecting(false);
      toast({
        title: "Connected",
        description: "Successfully connected to AI Assistant",
      });
    },
    onDisconnect: () => {
      setConversationId(null);
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

    try {
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
      setMediaStream(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to end conversation",
        variant: "destructive",
      });
    }
  };

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

  const isConnected = conversation.status === 'connected';
  return open ?
    <div className='fixed top-0 z-50 left-0 flex justify-center items-center backdrop-blur-md h-screen w-screen p-6'>
      <div className="bg-gradient-to-br w-full lg:w-[40%] bg-black backdrop-blur-sm flex items-center justify-center p-4 lg:p-20 h-[80vh] rounded-2xl shadow-2xl relative">
      <svg onClick={()=>{
        handleEndConversation();
        onClose();
        setMicMuted(false);
      }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="cursor-pointer lucide lucide-circle-x-icon lucide-circle-x absolute z-50 top-4 right-4"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative flex items-center justify-center mb-8">
            <SiriLogo 
              isAnimating={isConnected}
              isConversationActive={isConnected}
            />
          </div>
          {!isConnected && (
            <div className="space-y-3">
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
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#2661d8] to-[#5198e0] rounded-full flex items-center justify-center animate-pulse-soft">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <p className="text-muted-foreground font-dm-sans">Connecting...</p>
              </div>
            )}

            {isConnected && (
              <div className="space-y-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-[#2661d8] to-[#5198e0] rounded-full flex items-center justify-center shadow-lg">
                  {conversation.isSpeaking ? (
                    <Volume2 className="w-8 h-8 text-primary-foreground animate-pulse" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
                  )}
                </div>
                
                {/* Wave Animation */}
                <div className="h-8 flex items-center justify-center">
                  <WaveAnimation isActive={conversation.isSpeaking} />
                </div>

                <div className="space-y-1">
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
              <div className="space-y-4">
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
          <div className="space-y-4">
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
                <div className="w-12 h-12 bg-gradient-to-r from-[#2661d8] to-[#5198e0] rounded-xl flex items-center justify-center shadow-md cursor-pointer" onClick={()=>toggleMic()}>
                  {!micMuted ? <Mic className="w-5 h-5 text-primary-foreground" />:<MicOff className="w-5 h-5 text-primary-foreground" />}
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
      </div>
    </div>
  : null;
};