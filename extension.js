const vscode = require('vscode');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Remote Fetch URL
	let disposableFetch = vscode.commands.registerCommand('open-in-browser.openRemoteFetchURLInBrowser', function () {
		// get all remotes for the current repository
		getAllRemotes().then((result) => {
			let remoteNames = result.trim().split('\n');
			vscode.window.showQuickPick(remoteNames).then((remote) => {
				// get fetch URL for the chosen remote
				getFetchURL(remote).then((url) => {
					showBrowserOptions(url);
				});
			});
		});
	});
	
	// Remote Push URL
	let disposablePush = vscode.commands.registerCommand('open-in-browser.openRemotePushURLInBrowser', function () {
		// get all remotes for the current repository
		getAllRemotes().then((result) => {
			let remoteNames = result.trim().split('\n');
			vscode.window.showQuickPick(remoteNames).then((remote) => {
				// get fetch URL for the chosen remote
				getPushURL(remote).then((url) => {
					showBrowserOptions(url);
				});
			});
		});
	});

	context.subscriptions.push(disposableFetch);
	context.subscriptions.push(disposablePush);
}

function showBrowserOptions(url) {
	// show browser options to user
	vscode.window.showQuickPick(['(Default Browser)', 'Arc', 'Firefox', 'Google Chrome', 'Safari']).then((option) => {
		if (option === '(Default Browser)') {
			// open fetch URL in default browser
			vscode.env.openExternal(vscode.Uri.parse(url));
		} else {
			// open fetch URL in the chosen browser
			exec("open -a '" + option + "' " + url);
		}
	});
}

async function getAllRemotes() {
	const currentPath = vscode.workspace.workspaceFolders[0].uri.path;
	const {stdout, stderr} = await exec("cd " + currentPath + " && git remote")
	return stdout;
}

async function getFetchURL(remote) {
	const currentPath = vscode.workspace.workspaceFolders[0].uri.path;
	const { stdout, stderr } = await exec("cd " + currentPath + " && git config --get remote." + remote + ".url");
  if (stderr) {
		vscode.window.showInformationMessage(stderr.toString());
		return stderr;
	}
	return stdout.trim();
}

async function getPushURL(remote) {
	const currentPath = vscode.workspace.workspaceFolders[0].uri.path;
	const { stdout, stderr } = await exec("cd " + currentPath + " && git remote get-url --push " + remote);
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
