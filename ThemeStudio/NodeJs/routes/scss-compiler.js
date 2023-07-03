"use strict";
let sass = require('sass');
let fs = require('fs');
let shelljs = require('shelljs');
let archiver = require('zip-a-folder');
let glob = require('glob');

const ROOT_PATH = process.cwd() + "/../wwwroot";
const TEMPLATE_PATH = process.cwd() + "/../wwwroot/template";
const RESOURCE_PATH = process.cwd() + "/../wwwroot/ej2-resource/styles";
const OUTPUT_DIRECTORY = process.cwd() + "/../wwwroot/resource/styles/";
const INDIVIDUAL_STYLES = "individual-scss";

const SourcePath = [
    "base",
    "navigations/accordion",
    "dropdowns/drop-down-list",
    "inputs/input",
    "popups/popup",
    "popups/spinner",
    "dropdowns/drop-down-base",
    "dropdowns/auto-complete",
    "layouts/avatar",
    "notifications/badge",
    "notifications/message",
    "notifications/skeleton",
    "barcode-generator/barcode",
    "buttons/button",
    "calendars/calendar",
    "layouts/card",
    "buttons/check-box",
    "buttons/chips",
    "splitbuttons/drop-down-button",
    "splitbuttons/split-button",
    "inputs/numerictextbox",
    "popups/tooltip",
    "inputs/slider",
    "inputs/color-picker",
    "inputs/rating",
    "dropdowns/combo-box",
    "navigations/context-menu",
    "layouts/dashboard-layout",
    "calendars/datepicker",
    "buttons/radio-button",
    "buttons/switch",
    "buttons/floating-action-button",
    "buttons/speed-dial",
    "lists/list-view",
    "lists/sortable",
    "calendars/daterangepicker",
    "calendars/datetimepicker",
    "inputs/maskedtextbox",
    "inputs/textbox",
    "inputs/uploader",
    "popups/dialog",
    "navigations/h-scroll",
    "navigations/v-scroll",
    "navigations/toolbar",
    "navigations/tab",
    "navigations/treeview",
    "navigations/sidebar",
    "navigations/menu",
    "navigations/pager",
    "navigations/breadcrumb",
    "navigations/carousel",
    "navigations/appbar",
    "diagrams/diagram",
    "dropdowns/drop-down-tree",
    "dropdowns/multi-select",
    "dropdowns/list-box",
    "dropdowns/mention",
    "documenteditor/document-editor",
    "documenteditor/document-editor-container",
    "drawings/drawing",
    "layouts/splitter",
    "grids/excel-filter",
    "grids/grid",
    "filemanager/file-manager",
    "treegrid/treegrid",
    "splitbuttons/button-group",
    "splitbuttons/progress-button",
    "richtexteditor/rich-text-editor",
    "gantt/gantt",
    "inplace-editor/inplace-editor",
    "kanban/kanban",
    "notifications/toast",
    "pdfviewer/pdfviewer",
    "calendars/timepicker",
    "pivotview/pivotfieldlist",
    "pivotview/pivotview",
    "querybuilder/query-builder",
    "schedule/recurrence-editor",
    "spreadsheet/spreadsheet-ribbon",
    "schedule/schedule",
    "spreadsheet/spreadsheet",
    "image-editor/image-editor",
    "ribbon/ribbon"
];

const DependentStyles = [
    "base",
    "popups/popup",
    "dropdowns/drop-down-base",
    "dropdowns/drop-down-tree",
    "lists/sortable",
    "navigations/h-scroll",
    "navigations/v-scroll",
    "grids/pager",
    "grids/excel-filter",
    "lists/list-view",
    "inputs/textbox",
    "inputs/slider",
    "schedule/recurrence-editor",
    "spreadsheet/spreadsheet-ribbon",
    "pivotview/pivotfieldlist",
    "documenteditor/document-editor-container"
];

let cssRouter = function (app) {
    app.post('/themeapi/CompileTheme', async function (req, res) {
        try {
            let themeInfo = req.body;
            let scssContent = await GetSCSSContent(themeInfo);
            // Create output directory to generate the theme files.
            let outputPath = OUTPUT_DIRECTORY + GetTimestamp();
            shelljs.mkdir("-p", outputPath);

            let scssPath = `${outputPath}/${themeInfo.theme}.scss`;
            fs.writeFileSync(scssPath, scssContent, 'utf-8');
            let result = await SASSCompiler(scssPath, 'expanded');

            // Delete all existing files and directories.
            if (fs.existsSync(outputPath)) {
                shelljs.rm('-rf', outputPath);
            }
            res.send(result);
        } catch (err) {
            res.send(err.message);
        }
    });

    app.post('/themeapi/ApplyAppStyles', async function (req, res) {
        try {
            let themeInfo = req.body;
            let scssContent = await GetSCSSContent(themeInfo, true);
            // Create output directory to generate the theme files.
            let outputPath = OUTPUT_DIRECTORY + GetTimestamp();
            shelljs.mkdir('-p', outputPath);

            let scssPath = `${outputPath}/${themeInfo.theme}.scss`;
            fs.writeFileSync(scssPath, scssContent, 'utf-8');
            let result = await SASSCompiler(scssPath, 'expanded');

            // Delete all existing files and directories.
            if (fs.existsSync(outputPath)) {
                shelljs.rm('-rf', outputPath);
            }
            res.send(result);
        } catch (err) {
            res.send(err.message);
        }
    });

    app.post('/themeapi/ExportTheme', async function (req, res) {
        try {
            let themeInfo = req.body;
            let fileName = themeInfo.file;
            let themeName = themeInfo.theme;
            let timeStamp = GetTimestamp();
            let outputDirectory = `${ROOT_PATH}/outputs/${fileName}-${timeStamp}`;
            shelljs.mkdir('-p', `${outputDirectory}/${INDIVIDUAL_STYLES}`);
            if (themeInfo.compatibility) {
                shelljs.mkdir('-p', `${outputDirectory}/compatibility/${INDIVIDUAL_STYLES}`);
            }
            let scssContent = await GetSCSSContent(themeInfo, false, outputDirectory);

            let scssPath = `${outputDirectory}/${themeName}.scss`;
            fs.writeFileSync(scssPath, scssContent, 'utf-8');
            let result = await SASSCompiler(scssPath, 'expanded');
            let minifiedCss = await SASSCompiler(scssPath, 'compressed');
            if (themeInfo.compatibility) {
                let compatibilityDirectory = `${outputDirectory}/compatibility`;
                let sasscompatibilityContent = scssContent.replace("#{&}", ".e-lib").replace("@use 'sass:math';", "");
                fs.writeFileSync(`${compatibilityDirectory}/${themeName}.scss`, "@use 'sass:math';\n" + GetCompatibileStyle(sasscompatibilityContent), 'utf-8');
                let compatibilityResult = await SASSCompiler(`${compatibilityDirectory}/${themeName}.scss`);
                let compactMinifiedCss = await SASSCompiler(`${compatibilityDirectory}/${themeName}.scss`);
                fs.writeFileSync(`${compatibilityDirectory}/${themeName}.css`, compatibilityResult, 'utf-8');
                fs.writeFileSync(`${compatibilityDirectory}/${themeName}.min.css`, compactMinifiedCss, 'utf-8');
            }
            
            let settings = {};
            settings['theme'] = themeName;
            if (themeName == "bootstrap4" || themeName == "tailwind") {
                settings['isAdvanced'] = themeInfo.isAdvanced;
            }
            settings["properties"] = themeInfo.properties;
            settings["components"] = themeInfo.components;
            fs.writeFileSync(`${outputDirectory}/settings.json`, JSON.stringify(settings), 'utf-8');

            /* creation zip file */
            let zipPath = `${ROOT_PATH}/outputZip`;
            let zipTarget = `${zipPath}/${fileName}-${timeStamp}.zip`;
            let outputZip = `outputZip/${fileName}-${timeStamp}.zip`;
            fs.writeFileSync(`${outputDirectory}/${themeName}.css`, result, 'utf-8');
            fs.writeFileSync(`${outputDirectory}/${themeName}.min.css`, minifiedCss, 'utf-8');
            fs.writeFileSync(`${outputDirectory}/${themeName}.scss`, scssContent, 'utf-8');
            shelljs.mkdir('-p', zipPath);
            var customizedStyle = ["material", "material-dark", "tailwind", "tailwind-dark"];
            for(let customTheme of customizedStyle) {
                if (customTheme === themeName) {
                    shelljs.mkdir('-p', outputDirectory + '/customized');
                    var getSourcePath = ['', '.min'];
                    for(var i=0; i < getSourcePath.length; i++) {
                        var sourcepath = outputDirectory + `/${customTheme}`+ getSourcePath[i] + `.css`;
                        var destination = `${outputDirectory}` + `/customized/${customTheme}`+ getSourcePath[i] + `.css`;
                        var customStyle = fs.readFileSync(sourcepath, 'utf8');
                        var urlregex = getSourcePath[i] === '' ? /@import url\("https:\/\/fonts\.googleapis\.com\S*"\);/ : /@import"https:\/\/fonts\.googleapis\.com\S*";/;
                        customStyle = customStyle.replace(urlregex, "").trim();
                        fs.writeFileSync(destination, customStyle);
                    }
                }
            }
            await archiver.zip(outputDirectory, zipTarget);
            if (fs.existsSync(outputDirectory)) {
                shelljs.rm('-rf', outputDirectory);
            }
            res.send(outputZip);
        } catch (err) {
            res.send(err.message);
        }

    });
}
module.exports = cssRouter;

async function SASSCompiler(path, option) {
    let result = sass.compile(path, { style: option });
    return result.css;
}

async function GetSCSSContent(themeInfo, ignoreBase = false, outputDir = null) {
    let propertyChanges = "";
    let themeName = themeInfo.theme;
    let dependency = themeInfo.dependencies;
    let propertyKeys = Object.keys(themeInfo.properties);
    let templateContent='';
    if(themeName == "material3" || themeName == "material3-dark") {
        templateContent = GetFileContent(`${RESOURCE_PATH}/base/${themeName}.scss`);
        for (let key of propertyKeys) {
            let value = themeInfo.properties[key];
            if (value.indexOf('rgba') !== -1) {
                value = value.replace('rgba(', '').slice(0, -3);
                var regex =new RegExp(key.substring(1)+'\:\\s*(\\d+),\\s*(\\d+),\\s*(\\d+);')
                if(templateContent.match(regex)) {
                    templateContent = templateContent.replace(regex, key.substring(1) + ": " + value + ";");
                }
            }
            propertyChanges += `${key}: ${value};\n`;
        }
    }
    else {
        for (let key of propertyKeys) {
            let value = themeInfo.properties[key];
            propertyChanges += `${key}: ${value};\n`;
        }
        let templateName = (themeName === "bootstrap4" || themeName === "tailwind") && themeInfo.isAdvanced ? `${themeName}_advanced` : themeName;
        templateName = themeInfo.isCustomTheme ? "custom/" + themeName : templateName;
        templateContent = GetFileContent(`${TEMPLATE_PATH}/${templateName}.txt`);
        templateContent = templateContent.replace("{{:common}}", propertyChanges);
    }
    if (themeName == "fusion") {
        templateContent += GetFileContent(`${RESOURCE_PATH}/all${themeName}.scss`);
    }
    else {
        for (let sourcePath of SourcePath) {
            if (themeName == "material3" || themeName == "material3-dark") {
                if (dependency.indexOf(sourcePath) > -1 && sourcePath !== "base") {
                    let themeFile = `${themeName}.scss`;
                    let sourceDirectory = `${RESOURCE_PATH}/${sourcePath}`;
                    if (sourcePath === "base") {
                        if (themeName.startsWith("material") && ignoreBase) {
                            templateContent += "$is-roboto-loaded: 'false'!default;\n";
                        }
                    }
                    if (outputDir !== null && outputDir !== "") {
                        let importContent = "";
                        if (!fs.existsSync(`${outputDir}/${INDIVIDUAL_STYLES}/${sourcePath.split("/")[0]}`)) {
                            shelljs.mkdir('-p', `${outputDir}/${INDIVIDUAL_STYLES}/${sourcePath.split("/")[0]}`);
    
                        }
                        if (DependentStyles.indexOf(sourcePath) < 0) {
                            importContent = GetSCSSImport(themeInfo.individualDeps, sourcePath);
                        }
                        let content = GetFileContent(`${sourceDirectory}/${themeFile}`);
                        let fileContent, path;
                        if (sourcePath === "base") {
                            fileContent = propertyChanges + content;
                            path = sourcePath + "/" + sourcePath;
                        } else {
                            fileContent = content;
                            path = sourcePath;
                        }
    
                        let math = "";
                        if (fileContent.indexOf(`@use 'sass:math';`) > -1) {
                            fileContent = fileContent.replace(`@use 'sass:math';`, "");
                            math = `@use 'sass:math';\n`;
                        }
    
                        fs.writeFileSync(`${outputDir}/${INDIVIDUAL_STYLES}/${path}.scss`, math + importContent + "\n" + fileContent, 'utf-8');
                        if (themeInfo.compatibility) {
                            let sassCompatibility = fileContent.replace("#{&}", ".e-lib");
                            shelljs.mkdir('-p', `${outputDir}/compatibility/${INDIVIDUAL_STYLES}/${sourcePath.split("/")[0]}`);
                            fs.writeFileSync(`${outputDir}/compatibility/${INDIVIDUAL_STYLES}/${path}.scss`, math + importContent + "\n" + GetCompatibileStyle(sassCompatibility), 'utf-8');
                        }
                    }
                    templateContent += GetFileContent(`${sourceDirectory}/${themeFile}`);
                    templateContent = templateContent.replace(`@use 'sass:math';`, "");
                }
            }
            else {
                if (dependency.indexOf(sourcePath) > -1) {
                    let themeFile = `${themeName}.scss`;
                    let sourceDirectory = `${RESOURCE_PATH}/${sourcePath}`;
                    if (sourcePath === "base") {
                        templateContent += GetFileContent(`${sourceDirectory}/definition/${themeFile}`);
                        if (themeName.startsWith("material") && ignoreBase) {
                            templateContent += "$is-roboto-loaded: 'false'!default;\n";
                        }
                    }
    
                    if (outputDir !== null && outputDir !== "") {
                        let importContent = "";
                        if (!fs.existsSync(`${outputDir}/${INDIVIDUAL_STYLES}/${sourcePath.split("/")[0]}`)) {
                            shelljs.mkdir('-p', `${outputDir}/${INDIVIDUAL_STYLES}/${sourcePath.split("/")[0]}`);
    
                        }
                        if (DependentStyles.indexOf(sourcePath) < 0) {
                            importContent = GetSCSSImport(themeInfo.individualDeps, sourcePath);
                        }
                        let content = GetFileContent(`${sourceDirectory}/${themeFile}`);
                        let fileContent, path;
                        if (sourcePath === "base") {
                            fileContent = propertyChanges + content;
                            path = sourcePath + "/" + sourcePath;
                        } else {
                            fileContent = content;
                            path = sourcePath;
                        }
    
                        let math = "";
                        if (fileContent.indexOf(`@use 'sass:math';`) > -1) {
                            fileContent = fileContent.replace(`@use 'sass:math';`, "");
                            math = `@use 'sass:math';\n`;
                        }
    
                        fs.writeFileSync(`${outputDir}/${INDIVIDUAL_STYLES}/${path}.scss`, math + importContent + "\n" + fileContent, 'utf-8');
                        if (themeInfo.compatibility) {
                            let sassCompatibility = fileContent.replace("#{&}", ".e-lib");
                            shelljs.mkdir('-p', `${outputDir}/compatibility/${INDIVIDUAL_STYLES}/${sourcePath.split("/")[0]}`);
                            fs.writeFileSync(`${outputDir}/compatibility/${INDIVIDUAL_STYLES}/${path}.scss`, math + importContent + "\n" + GetCompatibileStyle(sassCompatibility), 'utf-8');
                        }
                    }
                    templateContent += GetFileContent(`${sourceDirectory}/${themeFile}`);
                    templateContent = templateContent.replace(`@use 'sass:math';`, "");
                }
            }
        }
    }
    return `@use 'sass:math';\n` + templateContent;
}

function GetFileContent(filePath) {
    let fileContent = "";
    if (fs.existsSync(filePath)) {
        fileContent = fs.readFileSync(filePath, 'utf-8');
    }

    return fileContent.replace('﻿', '');
}

function GetSCSSImport(individualDeps, filepath) {
    let importPath = "";
    for (let sourcePath of SourcePath) {
        if (sourcePath === "base") {
            importPath += `@import "../${sourcePath}/${sourcePath}.scss";\n`;
        }
        else if (individualDeps[filepath.split("/")[1]].indexOf(sourcePath) > -1 && filepath !== sourcePath) {
            importPath += `@import "../${sourcePath}.scss";\n`;
        }
    }
    return importPath;
}

function GetCompatibileStyle(templateContent) {
    return `$css: '.e-css'!default;
$imported-modules: () !default;
.e-lib {
 @at-root {
${templateContent}
 }
 & .e-js [class^='e-'], & .e-js [class*=' e-'] {
    box-sizing: content-box;
 }
}
`;
}

function GetTimestamp() {
    return Math.floor(Math.random() * Date.now());
}
