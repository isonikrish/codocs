import React, { useState, useEffect } from 'react';

function DocumentationPreview() {
    const [docContent, setDocContent] = useState('Loading documentation...');

    useEffect(() => {
        // Listen for messages sent from VS Code extension to WebView
        window.addEventListener('message', (event) => {
            setDocContent(event.data.docContent);
        });
    }, []);

    return (
        <div>
            <h1>Documentation Preview</h1>
            <textarea
                value={docContent}
                onChange={(e) => setDocContent(e.target.value)}
                rows="20"
                cols="80"
            />
        </div>
    );
}

export default DocumentationPreview;
