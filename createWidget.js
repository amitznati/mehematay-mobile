/* eslint-disable */
const path = require('path');
const [widgetName] = process.argv.slice(2);
const fs = require('fs');
const widgetNameSmall = `${widgetName[0].toLowerCase()}${widgetName.substr(1)}`;
function renameInFile(filePath) {

	fs.readFile(filePath, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		const result1 = data.replace(/WidgetTemplate/g, widgetName);
		const result = result1.replace(/widgetTemplate/g, widgetNameSmall);
		fs.writeFile(filePath, result, 'utf8', function (err) {
			if (err) return console.log(err);
		});
	});
}

function renameFilesRecursive(dir, from, to) {

	fs.readdirSync(dir).forEach(it => {
		const itsPath = path.resolve(dir, it);

		const itsStat = fs.statSync(itsPath);

		if (itsPath.search(from) > -1) {
			fs.renameSync(itsPath, itsPath.replace(from, to))
		}

		if (itsStat.isDirectory()) {
			renameFilesRecursive(itsPath.replace(from, to), from, to)
		} else {
			renameInFile(itsPath.replace('WidgetTemplate', widgetName));
		}
	});
}

function createFolder(from, to) {
	const copydir = require('copy-dir');

	copydir.sync(from, to, {
		utimes: true,  // keep add time and modify time
		mode: true,    // keep file mode
		cover: true    // cover file when exists, default is true
	});
}

function createWidget(name) {
	const srcFolder = path.join(__dirname, 'WidgetTemplate');
	const targetFolder = path.join(__dirname, 'app/screens', name);
	createFolder(srcFolder, targetFolder);
	renameFilesRecursive(targetFolder, 'WidgetTemplate', name);
}

createWidget(widgetName);
