// The module 'vscode' contains the VS Code extensibility API

const path = require('path');

// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

// https://github.com/yinyongxian/synergy-dbl-tools
// https://code.visualstudio.com/api
// https://marketplace.visualstudio.com/manage/publishers/synergy-dbl-tools

/**
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

	var copyBreakCommand= vscode.commands.registerCommand("copy-break", function(){
		const fileName = vscode.window.activeTextEditor.document.fileName;
		let subroutineName = "";
		const lineNumber = vscode.window.activeTextEditor.selection.start.line;
		const textLine = vscode.window.activeTextEditor.document.lineAt(lineNumber);
		const length = textLine.text.length;
		const startPosition = new vscode.Position(0, 0);
		const endPosition = new vscode.Position(lineNumber, length);
		const range = new vscode.Range(startPosition, endPosition);
		const text = vscode.window.activeTextEditor.document.getText(range);
		var functionLength = 0;
		var index = text.lastIndexOf(".subroutine");
		if (index == -1){
			index = text.lastIndexOf(".function");
			functionLength = 9
		}
		else {
			functionLength = 11
		}

		if (index !== -1) {
			const textSubstring= text.substring(index + functionLength);
			const textTrimStart = textSubstring.trimStart();
			const indexEmpty = textTrimStart.indexOf(" ");
			const indexComma = textTrimStart.indexOf(",");
			const indexEndOfLine = textTrimStart.indexOf("\r\n");
			const indexTab = textTrimStart.indexOf("\t");
			const minIndex = Math.min(indexEmpty, indexComma, indexEndOfLine, indexTab);
			if (minIndex > -1) {
				subroutineName = textTrimStart.substring(0, minIndex);
			}
		}

		const method = subroutineName.trim().length > 0 ? subroutineName + ":" : "";
		const lineNumbers = vscode.window.activeTextEditor.selections.map(ele => ele.start.line + 1).join(", ");
		const breakCommand = `b ${method}${lineNumbers}`
		vscode.env.clipboard.writeText(breakCommand)
	});
	context.subscriptions.push(copyBreakCommand);

	var copyExamineCommand = vscode.commands.registerCommand("copy-examine", function(){
		let selectionIsEmpty = vscode.window.activeTextEditor.selection.isEmpty;
		if (!selectionIsEmpty) {
			let doc = vscode.window.activeTextEditor.document;
			let selectedText = doc.getText(vscode.window.activeTextEditor.selection);
			let text =  `e ${selectedText}`;
			vscode.env.clipboard.writeText(text)
		}
	});
	context.subscriptions.push(copyExamineCommand);

	var copyWatchCommand = vscode.commands.registerCommand("copy-watch", function(){
		let selectionIsEmpty = vscode.window.activeTextEditor.selection.isEmpty;
		if (!selectionIsEmpty) {
			let doc = vscode.window.activeTextEditor.document;
			let selectedText = doc.getText(vscode.window.activeTextEditor.selection);
			let text =  `w ${selectedText}`;
			vscode.env.clipboard.writeText(text)
		}
	});
	context.subscriptions.push(copyWatchCommand);

	var copyExamineAndWatchCommand = vscode.commands.registerCommand("copy-examine-and-watch", function(){
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

	var copyDepositCommand = vscode.commands.registerCommand("copy-deposit", function(){
		let selectionIsEmpty = vscode.window.activeTextEditor.selection.isEmpty;
		if (!selectionIsEmpty) {
			let doc = vscode.window.activeTextEditor.document;
			let selectedText = doc.getText(vscode.window.activeTextEditor.selection);
			let text =  `deposit ${selectedText} = `;
			vscode.env.clipboard.writeText(text)
		}
	});
	context.subscriptions.push(copyDepositCommand);

	var copyStepInto = vscode.commands.registerCommand("copy-step-into", function(){
		vscode.env.clipboard.writeText("step into")
	});
	context.subscriptions.push(copyStepInto);

	var copyStepOver = vscode.commands.registerCommand("copy-step-over", function(){
		vscode.env.clipboard.writeText("step over")
	});
	context.subscriptions.push(copyStepOver);

	var copyLineNumber = vscode.commands.registerCommand("copy-line-number", function(){
		let line = vscode.window.activeTextEditor.selection.start.line + 1;
		vscode.env.clipboard.writeText(line.toString())
	});
	context.subscriptions.push(copyLineNumber);

	var copyGoLineNumber = vscode.commands.registerCommand("copy-go-line-number", function(){
		let line = vscode.window.activeTextEditor.selection.start.line + 1;
		const goLineNumber = `g ${line.toString()}`;
		vscode.env.clipboard.writeText(goLineNumber)
	});
	context.subscriptions.push(copyGoLineNumber);

	var copyGoReturn = vscode.commands.registerCommand("copy-go-return", function(){
		vscode.env.clipboard.writeText("g /return")
	});
	context.subscriptions.push(copyGoReturn);

	var copyGoExit = vscode.commands.registerCommand("copy-go-exit", function(){
		vscode.env.clipboard.writeText("g /exit")
	});
	context.subscriptions.push(copyGoExit);

	var copyCancelAll = vscode.commands.registerCommand("copy-cancel-all", function(){
		vscode.env.clipboard.writeText("ca/a")
	});
	context.subscriptions.push(copyCancelAll);

	var copyTrace = vscode.commands.registerCommand("copy-trace", function(){
		vscode.env.clipboard.writeText("trace")
	});
	context.subscriptions.push(copyTrace);

	var copyReturn_Exit_Cancel_Trace = vscode.commands.registerCommand("copy-return-exit-cancel-trace", function(){
		vscode.env.clipboard.writeText("g /return")

		setTimeout(function () {
			vscode.env.clipboard.writeText("g /exit")
		}, 1000)

		setTimeout(function () {
			vscode.env.clipboard.writeText("ca/a")
		}, 2000)

		setTimeout(function () {
			vscode.env.clipboard.writeText("trace")
		}, 3000)
	});
	context.subscriptions.push(copyReturn_Exit_Cancel_Trace);

	var copyBreakCommandInNonsubroutine= vscode.commands.registerCommand("copy-break-in-nonsubroutine", function(){
		const lineNumber = vscode.window.activeTextEditor.selection.start.line;
		const breakCommand = `b ${lineNumber + 1}`
		vscode.env.clipboard.writeText(breakCommand)
	});
	context.subscriptions.push(copyBreakCommandInNonsubroutine);

	var copyDebugCompilationCommand= vscode.commands.registerCommand("copy-debug-compilation", function(){
		let fileName = vscode.window.activeTextEditor.document.fileName;
		let parsedPath = path.parse(fileName);
		let directoryPath = path.parse(parsedPath.dir);
		let parentName = directoryPath.base;
		let text =  `cnllib -debug -sys:${parentName} ${parsedPath.base} -log:.\\${parentName}.log`;
		vscode.env.clipboard.writeText(text)
	});
	context.subscriptions.push(copyDebugCompilationCommand);

	var copyReleaseCompilationCommand= vscode.commands.registerCommand("copy-release-compilation", function(){
		let fileName = vscode.window.activeTextEditor.document.fileName;
		let parsedPath = path.parse(fileName);
		let directoryPath = path.parse(parsedPath.dir);
		let parentName = directoryPath.base;
		let text =  `cnllib -sys:${parentName} ${parsedPath.base} -log:.\\${parentName}.log`;
		vscode.env.clipboard.writeText(text)
	});
	context.subscriptions.push(copyReleaseCompilationCommand);

	var copyDebugCompilationCommandAndShowResult = vscode.commands.registerCommand("copy-debug-compilation-and-show-result", function(){
		let fileName = vscode.window.activeTextEditor.document.fileName;
		let parsedPath = path.parse(fileName);
		let directoryPath = path.parse(parsedPath.dir);
		let parentName = directoryPath.base;
		let text =  `cnllib -debug -sys:${parentName} ${parsedPath.base} -log:.\\${parentName}.log\r\n${parentName}.log\r\n`;
		vscode.env.clipboard.writeText(text)
	});
	context.subscriptions.push(copyDebugCompilationCommandAndShowResult);

	var copyReleaseCompilationCommandAndShowResult = vscode.commands.registerCommand("copy-release-compilation-and-show-result", function(){
		let fileName = vscode.window.activeTextEditor.document.fileName;
		let parsedPath = path.parse(fileName);
		let directoryPath = path.parse(parsedPath.dir);
		let parentName = directoryPath.base;
		let text =  `cnllib -sys:${parentName} ${parsedPath.base} -log:.\\${parentName}.log\r\n${parentName}.log\r\n`;
		vscode.env.clipboard.writeText(text)
	});
	context.subscriptions.push(copyReleaseCompilationCommandAndShowResult);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
