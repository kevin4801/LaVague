import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { AgentServerState, RunningAgentState } from '../../connector';
import { IconButton, Textarea } from '@chakra-ui/react';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';

export default function Prompt({ requestConnection }: { requestConnection: () => void }) {
    const { connector, serverState, runningAgentState } = useContext(AppContext);
    const [prompt, setPrompt] = useState('');

    const handleStart = () => {
        if (!prompt) {
            return false;
        }
        if (serverState === AgentServerState.CONNECTED) {
            connector.sendPrompt('run', prompt);
            setPrompt('');
        } else {
            requestConnection();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleStart();
        }
    };

    return (
        <div className="prompt">
            <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Can I do something for you?"
                resize={'none'}
                required
            ></Textarea>
            <IconButton
                className="button"
                aria-label="Submit"
                icon={runningAgentState == RunningAgentState.IDLE ? <ChatIcon /> : <CloseIcon/>}
                onClick={handleStart}
                zIndex={10}
                isActive={!!prompt && serverState !== AgentServerState.CONNECTED}
            ></IconButton>
        </div>
    );
}
