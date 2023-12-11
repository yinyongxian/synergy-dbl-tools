// The module 'vscode' contains the VS Code extensibility API

const path = require('path');

// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "synergy-dbl-tools" is now active!');

	var copyBase= vscode.commands.registerCommand("synergy-dbl-tools.copy-file-name", function(){
		let fileName = vscode.window.activeTextEditor.document.fileName;
		let basename = path.parse(fileName).base;
		vscode.env.clipboard.writeText(basename)
	});
	context.subscriptions.push(copyBase);

	var copyName= vscode.commands.registerCommand("synergy-dbl-tools.copy-file-name-without-extension", function(){
		let fileName = vscode.window.activeTextEditor.document.fileName;
		let name = path.parse(fileName).name;
		vscode.env.clipboard.writeText(name)
	});
	context.subscriptions.push(copyName);


}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
