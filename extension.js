// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { exec } = require('child_process');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "open-in-browser" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('open-in-browser.openRemoteURLInBrowser', function () {
		// The code you place here will be executed every time your command is executed
		const fetchCommand = "git remote -v | grep fetch | awk '{print $2}'";
		const pushCommand = "git remote -v | grep push | awk '{print $2}'";
		let fetchURL = '';
		let pushURL = '';
		exec(fetchCommand, (err, stdout, stderr) => {
			if (err) {
				// node couldn't execute the command
				// Display a message box to the user
				vscode.window.showInformationMessage("Oops. Something went wrong. Please try again later.");
				return;
			}
			fetchURL = stdout;
		});
		exec(pushCommand, (err, stdout, stderr) => {
			if (err) {
				// node couldn't execute the command
				// Display a message box to the user
				vscode.window.showInformationMessage("Oops. Something went wrong. Please try again later.");
				return;
			}
			pushURL = stdout;
		});

		// show options to user
		vscode.window.showQuickPick([fetchURL, pushURL], { placeHolder: "Select a URL to open in browser" }).then((url) => {
			if (url) {
				vscode.env.openExternal(vscode.Uri.parse(url));
			}
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
