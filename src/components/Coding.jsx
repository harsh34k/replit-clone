import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const useSocket = () => {
    const socket = io('http://localhost:8000');
    useEffect(() => {
        socket.on("connect", () => { console.log("connected", socket.id); })

        socket.on("welcome", (s) => console.log(` ${s}`));

        // Event listeners and cleanup logic
        return () => {
            socket.disconnect();
        };
    }, []);
};

function Coding() {
    useSocket(); // Invoke the useSocket hook
    return <div>Coding</div>;
}

export default Coding;
