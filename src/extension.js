const vscode = require('vscode');
const path = require('path');
const fs = require('fs'); // Import the fs module to write files
const { generateDocumentation } = require('./api');

// Function to activate the extension
function activate(context) {
    let generateDoc = vscode.commands.registerCommand('codocs.generateDoc', async () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const codeContent = document.getText();

            try {
                // Generate the documentation
                const generatedDoc = await generateDocumentation(codeContent);

                // Get the active folder (workspace folder)
                const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
                const docsFolderPath = path.join(workspaceFolder, 'docs');

                // Ensure the 'docs' folder exists, create it if it doesn't
                if (!fs.existsSync(docsFolderPath)) {
                    fs.mkdirSync(docsFolderPath);
                }

                // Define the path for the generated documentation file
                const docFilePath = path.join(docsFolderPath, 'generated-doc.md');

                // Write the generated documentation to the file (ensure it's a string)
                fs.writeFileSync(docFilePath, generatedDoc);

                // Show information message about successful documentation generation
                vscode.window.showInformationMessage(`Documentation generated and saved to ${docFilePath}`);

                // Optionally, open the generated file in a new editor window
                const docUri = vscode.Uri.file(docFilePath);
                const doc = await vscode.workspace.openTextDocument(docUri);
                vscode.window.showTextDocument(doc);

            } catch (error) {
                vscode.window.showErrorMessage('Error generating documentation: ' + error.message);
            }
        } else {
            vscode.window.showErrorMessage('No active editor found.');
        }
    });

    context.subscriptions.push(generateDoc);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
};
