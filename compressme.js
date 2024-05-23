#!/usr/bin/env node

const yargs = require("yargs");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const options = yargs
    .usage(
        "Usage: compressme -i 'input.mp4' -t [size] -e [encoder] -o 'output.mp4",
    )
    .option("i", {
        alias: "input",
        describe: "Specify input file",
        type: "string",
        demandOption: true,
    })
    .option("t", {
        alias: "target",
        describe: "Specify target size (k, m, G)",
        type: "string",
        demandOption: true,
    })
    .option("o", {
        alias: "output",
        describe: "Specify output file",
        type: "string",
    })
    .option("e", {
        alias: "encoder",
        describe: "Specify encoder type",
        type: "string",
        default: "libx264",
    })
    .argv;

let targetKb;
const target = options.target;
const sizeType = target.slice(-1).toLowerCase();

switch (sizeType) {
    case "k":
        targetKb = parseInt(target.slice(0, -1));
        break;
    case "m":
        targetKb = parseInt(target.slice(0, -1)) * 1024;
        break;
    case "g":
        targetKb = parseInt(target.slice(0, -1)) * 1024 * 1024;
        break;
    default:
        targetKb = parseInt(target);
        break;
}

const inputFile = options.input;
let outputFile = options.output;
const encoderType = options.encoder;

const fileSizeKb = (file) =>
    parseInt(execSync(`du -k "${file}"`).toString().split("\t")[0]);
const videoLength = (file) =>
    parseInt(
        execSync(
            `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${file}"`,
        ).toString().trim(),
    );

if (!fs.existsSync(inputFile)) {
    console.log("Input file does not exist, exiting...");
    process.exit(1);
}

if (targetKb > fileSizeKb(inputFile)) {
    console.log("Target file size is bigger than current file size, exiting...");
    process.exit(1);
}

const inputFileLength = videoLength(inputFile);
const targetBitrate = (targetKb * 1024 * 8) / inputFileLength;

if (!outputFile) {
    const inputDir = path.dirname(inputFile);
    const defaultOutput = path.join(
        inputDir,
        `${path.basename(inputFile, path.extname(inputFile))}-compressed${path.extname(inputFile)
        }`,
    );
    const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    readline.question(
        `Output file has not been specified. Use ${defaultOutput}? (y/n) `,
        (answer) => {
            if (answer.toLowerCase() === "y") {
                outputFile = defaultOutput;
                readline.close();
                checkAndRunFfmpeg();
            } else {
                readline.close();
                process.exit(1);
            }
        },
    );
} else {
    checkAndRunFfmpeg();
}

function checkAndRunFfmpeg() {
    if (fs.existsSync(outputFile)) {
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        readline.question(
            "Output file already exists. Overwrite it? (y/n)",
            (answer) => {
                if (answer.toLowerCase() === "y") {
                    readline.close();
                    runFfmpeg();
                } else {
                    readline.close();
                    process.exit(1);
                }
            },
        );
    } else {
        runFfmpeg();
    }
}

function runFfmpeg() {
    execSync(
        `ffmpeg -y -i "${inputFile}" -b:v ${targetBitrate} -c:v ${encoderType} "${outputFile}"`,
        { stdio: "inherit" },
    );
}
