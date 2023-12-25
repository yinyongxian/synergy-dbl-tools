// The module 'vscode' contains the VS Code extensibility API

const path = require('path');

// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

// https://marketplace.visualstudio.com/manage/publishers/synergy-dbl-tools

/**s
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "synergy-dbl-tools" is now active!');

	var copyBase= vscode.commands.registerCommand("copy-file-name", function(){
		let fileName = vscode.window.activeTextEditor.document.fileName;
		let basename = path.parse(fileName).base;
		vscode.env.clipboard.writeText(basename)
	});
	context.subscriptions.push(copyBase);

	var copyFileNameWithoutExtension= vscode.commands.registerCommand("copy-file-name-without-extension", function(){
		let fileName = vscode.window.activeTextEditor.document.fileName;
		let name = path.parse(fileName).name;
		vscode.env.clipboard.writeText(name)
	});
	context.subscriptions.push(copyFileNameWithoutExtension);

	var copyBreakCommand= vscode.commands.registerCommand("copy-break-command", function(){
		const fileName = vscode.window.activeTextEditor.document.fileName;
		let subroutineName = path.parse(fileName).name;
		const lineNumber = vscode.window.activeTextEditor.selection.start.line;
		const textLine = vscode.window.activeTextEditor.document.lineAt(lineNumber);
		const length = textLine.text.length;
		const startPosition = new vscode.Position(0, 0);
		const endPosition = new vscode.Position(lineNumber, length);
		const range = new vscode.Range(startPosition, endPosition);
		const text = vscode.window.activeTextEditor.document.getText(range);
		const index = text.lastIndexOf(".subroutine");
		if (index !== -1) {
			const textSubstring= text.substring(index + 11);
			const textTrimStart = textSubstring.trimStart();
			const indexEmpty = textTrimStart.indexOf(" ");
			const indexComma = textTrimStart.indexOf(",");
			const indexEndOfLine = textTrimStart.indexOf("\r\n");
			const minIndex = Math.min(indexEmpty, indexComma, indexEndOfLine);
			if (minIndex > -1) {
				subroutineName = textTrimStart.substring(0, minIndex);
			}
		}

		const breakCommand = `b ${subroutineName}:${lineNumber + 1}`
		vscode.env.clipboard.writeText(breakCommand)
	});
	context.subscriptions.push(copyBreakCommand);

	var copyDebugCompilationCommand= vscode.commands.registerCommand("copy-debug-compilation-command", function(){
		let fileName = vscode.window.activeTextEditor.document.fileName;
		let parsedPath = path.parse(fileName);
		let directoryPath = path.parse(parsedPath.dir);
		let parentName = directoryPath.base;
		let text =  `cnllib -debug -sys:${parentName} ${parsedPath.base} -log:.\\${parentName}.log`;
		vscode.env.clipboard.writeText(text)
	});
	context.subscriptions.push(copyDebugCompilationCommand);

	var copyReleaseCompilationCommand= vscode.commands.registerCommand("copy-release-compilation-command", function(){
		let fileName = vscode.window.activeTextEditor.document.fileName;
		let parsedPath = path.parse(fileName);
		let directoryPath = path.parse(parsedPath.dir);
		let parentName = directoryPath.base;
		let text =  `cnllib -sys:${parentName} ${parsedPath.base} -log:.\\${parentName}.log`;
		vscode.env.clipboard.writeText(text)
	});
	context.subscriptions.push(copyReleaseCompilationCommand);

	var copyDebugCompilationCommandAndShowResult = vscode.commands.registerCommand("copy-debug-compilation-command-and-show-result", function(){
		let fileName = vscode.window.activeTextEditor.document.fileName;
		let parsedPath = path.parse(fileName);
		let directoryPath = path.parse(parsedPath.dir);
		let parentName = directoryPath.base;
		let text =  `cnllib -debug -sys:${parentName} ${parsedPath.base} -log:.\\${parentName}.log\r\n${parentName}.log\r\n`;
		vscode.env.clipboard.writeText(text)
	});
	context.subscriptions.push(copyDebugCompilationCommandAndShowResult);

	var copyReleaseCompilationCommandAndShowResult = vscode.commands.registerCommand("copy-release-compilation-command-and-show-result", function(){
		let fileName = vscode.window.activeTextEditor.document.fileName;
		let parsedPath = path.parse(fileName);
		let directoryPath = path.parse(parsedPath.dir);
		let parentName = directoryPath.base;
		let text =  `cnllib -sys:${parentName} ${parsedPath.base} -log:.\\${parentName}.log\r\n${parentName}.log\r\n`;
		vscode.env.clipboard.writeText(text)
	});
	context.subscriptions.push(copyReleaseCompilationCommandAndShowResult);

	var copyExamineCommand = vscode.commands.registerCommand("copy-examine-command", function(){
		let selectionIsEmpty = vscode.window.activeTextEditor.selection.isEmpty;
		if (!selectionIsEmpty) {
			let doc = vscode.window.activeTextEditor.document;
			let selectedText = doc.getText(vscode.window.activeTextEditor.selection);
			let text =  `e ${selectedText}`;
			vscode.env.clipboard.writeText(text)
		}
	});
	context.subscriptions.push(copyExamineCommand);

	var copyWatchCommand = vscode.commands.registerCommand("copy-watch-command", function(){
		let selectionIsEmpty = vscode.window.activeTextEditor.selection.isEmpty;
		if (!selectionIsEmpty) {
			let doc = vscode.window.activeTextEditor.document;
			let selectedText = doc.getText(vscode.window.activeTextEditor.selection);
			let text =  `w ${selectedText}`;
			vscode.env.clipboard.writeText(text)
		}
	});
	context.subscriptions.push(copyWatchCommand);

	var copyExamineAndWatchCommand = vscode.commands.registerCommand("copy-examine-and-watch-command", function(){
		let selectionIsEmpty = vscode.window.activeTextEditor.selection.isEmpty;
		if (!selectionIsEmpty) {
			let doc = vscode.window.activeTextEditor.document;
			let selectedText = doc.getText(vscode.window.activeTextEditor.selection);
			let examineText =  `w ${selectedText}`;
			vscode.env.clipboard.writeText(examineText)

			setTimeout(function () {
				let watchText =  `e ${selectedText}`;
				vscode.env.clipboard.writeText(watchText)
			}, 1000)
		}
	});
	context.subscriptions.push(copyExamineAndWatchCommand);

	var copyDepositCommand = vscode.commands.registerCommand("copy-deposit-command", function(){
		let selectionIsEmpty = vscode.window.activeTextEditor.selection.isEmpty;
		if (!selectionIsEmpty) {
			let doc = vscode.window.activeTextEditor.document;
			let selectedText = doc.getText(vscode.window.activeTextEditor.selection);
			let text =  `deposit ${selectedText} = `;
			vscode.env.clipboard.writeText(text)
		}
	});
	context.subscriptions.push(copyDepositCommand);

	var copyLineNumber = vscode.commands.registerCommand("copy-line-number", function(){
		let line = vscode.window.activeTextEditor.selection.start.line + 1;
		vscode.env.clipboard.writeText(line.toString())
	});
	context.subscriptions.push(copyLineNumber);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
