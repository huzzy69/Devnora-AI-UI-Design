import React, { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff, Settings, Zap } from 'lucide-react';

export default function AIVoiceAgent() {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState([
    { speaker: 'AI', text: 'Hello! I\'m your AI voice assistant. Start speaking to interact with me.' }
  ]);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice interaction
      setTimeout(() => {
        setTranscript(prev => [...prev, { speaker: 'You', text: 'Create a new React component' }]);
        setTimeout(() => {
          setTranscript(prev => [...prev, { speaker: 'AI', text: 'I\'ll help you create a React component. What should it be called?' }]);
        }, 1000);
      }, 2000);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2 text-slate-900">AI Voice Agent</h1>
        <p className="text-slate-600">Interact with AI using your voice for hands-free coding</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Voice Visualizer */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 mb-6">
          <div className="flex flex-col items-center justify-center">
            <div className={`w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 ${isListening ? 'animate-pulse' : ''}`}>
              {isListening ? (
                <Mic className="w-16 h-16 text-purple-600" />
              ) : (
                <MicOff className="w-16 h-16 text-slate-400" />
              )}
            </div>
            <h2 className="text-2xl text-white mb-2">
              {isListening ? 'Listening...' : 'Click to start speaking'}
            </h2>
            <p className="text-purple-200 mb-6">
              {isListening ? 'I\'m listening to your commands' : 'Tap the microphone to begin'}
            </p>
            <div className="flex gap-4">
              <button
                onClick={toggleListening}
                className={`px-8 py-4 rounded-xl flex items-center gap-2 transition-all ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-white hover:bg-slate-100 text-slate-900'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                {isListening ? 'Stop Listening' : 'Start Listening'}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="px-4 py-4 bg-white/20 hover:bg-white/30 text-white rounded-xl"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Transcript */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl text-slate-900">Conversation Transcript</h3>
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg">
              Clear
            </button>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {transcript.map((item, i) => (
              <div key={i} className={`flex gap-3 ${item.speaker === 'You' ? 'justify-end' : ''}`}>
                <div className={`max-w-md px-4 py-3 rounded-2xl ${
                  item.speaker === 'You'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-900'
                }`}>
                  <div className="text-xs mb-1 opacity-75">{item.speaker}</div>
                  <div>{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <h4 className="text-slate-900">Voice Model</h4>
            </div>
            <p className="text-sm text-slate-600">GPT-4 Turbo Voice</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Volume2 className="w-5 h-5 text-purple-600" />
              <h4 className="text-slate-900">Voice Type</h4>
            </div>
            <p className="text-sm text-slate-600">Natural Female</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Settings className="w-5 h-5 text-green-600" />
              <h4 className="text-slate-900">Language</h4>
            </div>
            <p className="text-sm text-slate-600">English (US)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
