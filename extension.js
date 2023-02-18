// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

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
		// get fetch URL from git remote -v
		let fetchURL, pushURL = '';
		getFetchURL().then((url) => {
			fetchURL = url;
		});
		// getPushURL().then((url) => {
		// 	pushURL = url;
		// });

		// // show options to user
		vscode.window.showQuickPick(['(Default Browser)', 'Arc', 'Firefox', 'Google Chrome', 'Safari']).then((option) => {
			if (option === 'Default') {
				// open fetch URL in default browser
				vscode.env.openExternal(vscode.Uri.parse(fetchURL));
			} else {
				// open fetch URL in the chosen browser
				exec("open -a '" + option + "' " + fetchURL);
			}
		});
	});

	context.subscriptions.push(disposable);
}

async function getFetchURL() {
	const currentPath = vscode.workspace.workspaceFolders[0].uri.path;
	const { stdout, stderr } = await exec("cd " + currentPath + " && git remote -v | grep fetch | awk '{print $2}'");
  if (stderr) {
		vscode.window.showInformationMessage(stderr.toString());
		return stderr;
	}
	return stdout.trim();
}

async function getPushURL() {
	const currentPath = vscode.workspace.workspaceFolders[0].uri.path;
	const { stdout, stderr } = await exec("cd " + currentPath + " && git remote -v | grep push | awk '{print $2}'");
  if (stderr) {
		vscode.window.showInformationMessage(stderr.toString());
		return stderr;
	}
	return stdout.trim();
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
