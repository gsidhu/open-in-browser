# Open in Browser
A VSCode extension that opens the current Git repository's remote URL in a browser.

## Installation
1. Download the latest release from the [releases page](https://github.com/gsidhu/open-in-browser/releases/latest).
2. Open the **Extensions** sidebar in VS Code. `View → Extensions`.
3. Click on the **...** menu in the top-right corner of the **Extensions** sidebar and select **Install from VSIX...**.
4. Select the downloaded VSIX file. Done!

### Why is this extension not available on VS Code Marketplace?
Setting up an account is too much effort. This extension is mostly to scratch my own itch.

## Usage
### Quick Usage
> <kbd>Ctrl/Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> → `Quickly Open Remote URL in Browser`

Selecting this command will present a list of browser options to choose from.

Selecting a browser will open the **Fetch** URL of the **Origin** remote in the selected browser.

### General Usage
The extension adds two commands to the Command Palette –
1. `Open Remote Fetch URL in Browser`
2. `Open Remote Push URL in Browser`

Selecting either of these commands will present a list of remotes to choose from.

Selecting a remote will present a list of browser options to choose from.

Selecting a browser will open the remote URL in the selected browser.

## CHANGELOG
1. [1.0.0](https://github.com/gsidhu/open-in-browser/releases/tag/v1.0.0) - Initial release
2. [1.0.1](https://github.com/gsidhu/open-in-browser/releases/tag/v1.0.1) - Add graceful error handling

## ROADMAP & CONTRIBUTING
To me, this extension is already feature-complete. 

But GitHub Co-Pilot seems to think that I should add support for opening the current file, line, selection, branch, commit, tag, pull request, issue, milestone, project, wiki, repository, user, organization, team and gist in the browser.

I'm very likely not going to do any of this. But if you want to, feel free to make a pull request or open an issue.

## LICENSE
[GNU General Public License v3.0](./LICENSE)