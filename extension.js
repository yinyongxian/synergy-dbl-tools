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
		var index = text.toLowerCase().lastIndexOf(".subroutine");
		if (index == -1){
			index = text.toLowerCase().lastIndexOf(".function");
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
			const indexSemicolon = textTrimStart.indexOf(";");
			const indexEndOfLine = textTrimStart.indexOf("\r\n");
			const indexTab = textTrimStart.indexOf("\t");
			const minIndex = Math.min(indexEmpty, indexComma, indexSemicolon, indexEndOfLine, indexTab);
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

	// SET BREAK brkpt         - See HELP BREAK
	// SET DBGSRC pth          - Set the search logical for source files               
	// SET STEP OVER           - Set the default STEP mode to OVER                     
	// SET STEP INTO           - Set the default STEP mode to INTO                     
	// SET STOP ON             - Break whenever a program encounters a STOP            
	// SET STOP OFF            - Do not break when an STOP is encountered              
	// SET TRAP IGNORE nn      - When Set trap is on, ignore the errors                
	// SET TRAP ON             - Break whenever a program traps an error               
	// SET TRAP OFF            - Do not break when an error is trapped                 
	// SET TYPEAHEAD ON        - Turn typeahead on                                     
	// SET TYPEAHEAD OFF       - Turn typeahead off                                    
	// SET UNINITIALIZED ON    - Set watching for uninitialized memory access on       
	// SET UNINITIALIZED OFF   - Set watching for uninitialized memory access off      
	// SET UNINITIALIZED BREAK - Set break on uninitialized memory access              
	// SET VIEW count          - Set number of lines displayed for the VIEW command                                                                                    SET WATCH var           - See HELP WATCH	
	var copySetDebuggerParameters = vscode.commands.registerCommand("copy-set-debugger-parameters", function(){
		let delaySeconds = 0;
		vscode.env.clipboard.writeText("SET STEP OVER")
		setTimeout(function(){
			vscode.env.clipboard.writeText("SET STEP INTO")
		}, ++delaySeconds * 1000)
		setTimeout(function(){
			vscode.env.clipboard.writeText("SET TRAP ON")
		}, ++delaySeconds * 1000)
		setTimeout(function(){
			vscode.env.clipboard.writeText("SET TRAP OFF ")
		}, ++delaySeconds * 1000)
		setTimeout(function(){
			vscode.env.clipboard.writeText("SET STOP ON")
		}, ++delaySeconds * 1000)
		setTimeout(function(){
			vscode.env.clipboard.writeText("SET STOP OFF")
		}, ++delaySeconds * 1000)
	});
	context.subscriptions.push(copySetDebuggerParameters);

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
		let delaySeconds = 0;
		vscode.env.clipboard.writeText("g /return")
		setTimeout(function () {
			vscode.env.clipboard.writeText("g /exit")
		}, ++delaySeconds * 1000)

		setTimeout(function () {
			vscode.env.clipboard.writeText("ca/a")
		}, ++delaySeconds * 1000)

		setTimeout(function () {
			vscode.env.clipboard.writeText("trace")
		}, ++delaySeconds * 1000)
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

    let definitionProvider = vscode.languages.registerDefinitionProvider('synergy', new SynergyDefinitionProvider());
    context.subscriptions.push(definitionProvider);
}


// How to implement go to definition of subroutine in synergy/ex language in visual studio code extension? 
// incluede the detail Java Script code of Implement the logic to find the subroutine definition in current 
// workspace. Use Java Script language.
class SynergyDefinitionProvider {
    /**
     * @param {vscode.TextDocument} document
     * @param {vscode.Position} position
     * @param {vscode.CancellationToken} token
     * @returns {vscode.ProviderResult<vscode.Definition>}
     */
    provideDefinition(document, position, token) {
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return null;
        }

        const word = document.getText(wordRange);

        return findDefinitionInWorkspace(word).then(definition => {
            if (definition) {
                const uri = definition.uri;
                const range = new vscode.Range(
                    new vscode.Position(definition.line, definition.character),
                    new vscode.Position(definition.line, definition.character + word.length)
                );
                return new vscode.Location(uri, range);
            }
            return null;
        });
    }
}

/**
 * Finds the definition of a subroutine in the workspace.
 * @param {string} subroutineName
 * @returns {Promise<{ uri: vscode.Uri, line: number, character: number } | null>}
 */
function findDefinitionInWorkspace(subroutineName) {
    const searchPattern = '**/*.dbl';
    const regex = new RegExp(`^\\s*subroutine\\s+${subroutineName}\\b`, 'i');

    // @ts-ignore
    return vscode.workspace.findFiles(searchPattern).then(files => {
        const promises = files.map(file => {
            return vscode.workspace.openTextDocument(file).then(document => {
                const text = document.getText();
                const lines = text.split('\n');

                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    if (regex.test(line)) {
                        const character = line.indexOf(subroutineName);
                        return { uri: document.uri, line: i, character: character };
                    }
                }
                return null;
            });
        });

        return Promise.all(promises).then(results => {
            // Filter out null results and return the first valid result
            const definition = results.find(result => result !== null);
            return definition || null;
        });
    });
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
