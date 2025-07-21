import { useState, useEffect, useCallback, useRef } from 'react';
import { useConversation } from '@elevenlabs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Loader2, Mic, MicOff, Send } from 'lucide-react';

const FAVICON_SRC = '/section_images/blog/favicon.svg';

const Conversation = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [open, setOpen] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [micMuted, setMicMuted] = useState(false);
  const [status, setStatus] = useState<'idle'|'connecting'|'connected'|'ended'|'agent_ended'>('idle');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([]);
  const conversation = useConversation({
    micMuted,
    onConnect: () => {
      setStatus('connected');
    },
    onDisconnect: () => {
      setStatus('ended');
    },
    onMessage: (message: any) => {
      if (message?.event === 'conversation_ended_by_agent') {
        setStatus('agent_ended');
      } else if (message?.message) {
        setMessages((prev) => [...prev, { role: 'ai', text: message.message }]);
      }
    },
    onError: (error) => console.error('Error:', error),
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, status]);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('convai-terms-accepted') === 'true') {
      setAccepted(true);
    }
  }, []);

  const handleLauncherClick = () => {
    if (!accepted) {
      setShowTerms(true);
    } else {
      setOpen(true);
    }
  };

  const acceptTerms = useCallback(() => {
    setShowTerms(false);
    setAccepted(true);
    localStorage.setItem('convai-terms-accepted', 'true');
    setOpen(true);
  }, []);

  const handleCallClick = useCallback(async () => {
    setStatus('connecting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
      setMicMuted(false);
      await conversation.startSession({
        agentId: 'agent_01jwdd48b1e17rkf0dngh470mv',
      });
      setConversationId((conversation as any)?.conversationId || null);
      setMessages([]);
    } catch (error) {
      setStatus('idle');
      console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    setStatus('ended');
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
      setMicMuted(false);
    }
    await conversation.endSession();
  }, [conversation, mediaStream]);

  const handleNewCall = () => {
    setStatus('connecting');
    setMessages([]);
    setConversationId(null);
    handleCallClick();
  };

  const toggleMic = useCallback(() => {
    if (mediaStream) {
      const audioTrack = mediaStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMicMuted(!audioTrack.enabled);
      }
    }
  }, [mediaStream]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (!input.trim() || status !== 'connected') return;
    setMessages((prev) => [...prev, { role: 'user', text: input }]);
    setInput('');
    try {
      await (conversation as any).sendMessage(input);
    } catch (e) {
      // Optionally show error
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const cardVariants = {
    closed: { width: '340px', height: '110px', borderRadius: '20px', transition: { type: 'spring' as const, duration: 0.4 } },
    open: { width: '400px', height: '520px', borderRadius: '24px', transition: { type: 'spring' as const, duration: 0.4 } },
  };

  return (
    <>
      {/* Terms and Conditions Modal (unchanged) */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/40 backdrop-blur-sm text-[#000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl absolute bottom-10 right-4 border border-gray-100"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <h2 className="text-lg font-bold mb-2">Terms and conditions</h2>
              <p className="text-sm mb-4">
                By clicking "Agree," and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with third-party service providers, and as described in the Privacy Policy. If you do not wish to have your conversations recorded, please refrain from using this service.
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-4 py-2 text-sm rounded-3xl bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                  onClick={() => setShowTerms(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm rounded-3xl bg-black text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition"
                  onClick={acceptTerms}
                >
                  Accept
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      {!open && (
        <motion.div
          className="fixed bottom-8 right-8 z-50 bg-white rounded-2xl shadow-xl flex flex-col items-center p-4"
          variants={cardVariants}
          initial="closed"
          animate="closed"
        >
          <div className="flex items-center w-full mb-2">
            <img src={FAVICON_SRC} alt="Algebrik" className="w-8 h-8 rounded-full mr-2" />
            <span className="font-medium text-black text-sm flex-1">Our Smartest AI Rep is here</span>
          </div>
          <button
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black text-white font-semibold shadow hover:scale-105 transition-transform mt-1"
            onClick={handleLauncherClick}
          >
            <Phone className="w-5 h-5" />
            Talk to Algo from Algebrik
          </button>
        </motion.div>
      )}

      {/* Chat Window */}
      {open && (
        <motion.div
          className="fixed bottom-8 right-8 z-50 bg-white rounded-2xl shadow-2xl flex flex-col items-stretch"
          variants={cardVariants}
          initial="closed"
          animate="open"
        >
          {/* Header */}
          <div className="flex items-center px-6 pt-6 pb-2">
            <img src={FAVICON_SRC} alt="Algebrik" className="w-8 h-8 rounded-full mr-2" />
            <span className="font-semibold text-lg text-black">Algebrik</span>
          </div>
          {/* Main content */}
          <div className="flex flex-col flex-1 px-6 pt-2 pb-4 relative overflow-y-auto">
            {/* Large logo and call button or state */}
            {(status === 'idle' || status === 'connecting' || status === 'connected') && (
              <div className="relative flex flex-col items-center mt-2 mb-4">
                <img src={FAVICON_SRC} alt="Algebrik" className="w-32 h-32 rounded-full" />
                {status === 'idle' && (
                  <button
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-black w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                    onClick={handleCallClick}
                  >
                    <Phone className="w-7 h-7 text-white" />
                  </button>
                )}
              </div>
            )}
            {/* State text below logo */}
            {status === 'connecting' && (
              <div className="text-black text-base font-medium mt-2"> <Loader2 className="inline-block animate-spin mr-2 w-5 h-5 text-black" />Connecting</div>
            )}
            {status === 'connected' && (
              <div className="text-black text-base font-medium mt-2">Talk to interrupt</div>
            )}
            {/* Chat messages */}
            {status === 'connected' && (
              <div className="flex flex-col gap-2 w-full mt-6 mb-2">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={
                      msg.role === 'user'
                        ? 'self-end bg-black text-white rounded-2xl px-4 py-2 max-w-[70%] text-right'
                        : 'self-start bg-gray-100 text-black rounded-2xl px-4 py-2 max-w-[70%] text-left'
                    }
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            )}
            {/* Ended state (centered message, button bottom right) */}
            {(status === 'ended' || status === 'agent_ended') && (
              <>
                <div className="flex flex-1 flex-col items-center justify-center w-full h-full text-gray-500 min-h-[300px]">
                  <span className="text-center text-base font-medium mb-2">
                    {status === 'ended' ? 'You ended the conversation' : 'The agent ended the conversation'}
                  </span>
                  {conversationId && <span className="text-xs mt-1">ID: {conversationId}</span>}
                </div>
                {/* New call button bottom right */}
                <button
                  className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-black text-white font-semibold shadow hover:scale-105 transition-transform"
                  onClick={handleNewCall}
                >
                  <Phone className="w-5 h-5 mr-1" /> New call
                </button>
              </>
            )}
          </div>
          {/* Message input and action buttons */}
          {(status !== 'ended' && status !== 'agent_ended') && (
            <div className="flex items-center px-6 pb-6 gap-2 relative">
              <input
                type="text"
                placeholder="Send a message"
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                disabled={status === 'connecting'}
              />
              {/* Send button */}
              <button
                className="ml-2 px-3 py-2 rounded-full bg-black text-white font-semibold shadow hover:scale-105 transition-transform"
                onClick={handleSend}
                disabled={status !== 'connected' || !input.trim()}
                title="Send"
              >
                <Send className="w-5 h-5" />
              </button>
              {/* Connected: mute/unmute and end call */}
              {status === 'connected' && (
                <>
                  <button
                    className="ml-2 px-3 py-2 rounded-full bg-gray-100 text-black font-semibold shadow hover:scale-105 transition-transform"
                    onClick={toggleMic}
                    title={micMuted ? 'Unmute' : 'Mute'}
                  >
                    {micMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <button
                    className="ml-2 px-3 py-2 rounded-full bg-red-600 text-white font-semibold shadow hover:scale-105 transition-transform"
                    onClick={stopConversation}
                    title="End call"
                  >
                    <PhoneOff className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default Conversation; 