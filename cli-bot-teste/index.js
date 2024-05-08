import {intro, outro, spinner, confirm, multiselect, select, isCancel, cancel, text} from "@clack/prompts";
import * as p from "@clack/prompts";
import path from "path";
import fs from "fs";
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';
import { execSync } from "child_process";

// intro(`create-my-app`);
// // Do stuff
// const meaning = await text({
//   message: 'What is the meaning of life?',
//   placeholder: 'Not sure',
//   initialValue: '42',
//   validate(value) {
//     if (value.length === 0) return `Value is required!`;
//   },
// });

// const shouldContinue = await confirm({
//   message: 'Do you want to continue?',
// });

// const projectType = await select({
//   message: 'Pick a project type.',
//   options: [
//     { value: 'ts', label: 'TypeScript' },
//     { value: 'js', label: 'JavaScript' },
//     { value: 'coffee', label: 'CoffeeScript', hint: 'oh no' },
//   ],
// });

// const additionalTools = await multiselect({
//   message: 'Select additional tools.',
//   options: [
//     { value: 'eslint', label: 'ESLint', hint: 'recommended' },
//     { value: 'prettier', label: 'Prettier' },
//     { value: 'gh-action', label: 'GitHub Action' },
//   ],
//   required: false,
// });

// const s = spinner();
// s.start('Installing via npm');
// // Do installation here

// s.stop('Installed via npm');

// const group = await p.group(
//   {
//     name: () => p.text({ message: 'What is your name?' }),
//     age: () => p.text({ message: 'What is your age?' }),
//     color: ({ results }) =>
//       p.multiselect({
//         message: `What is your favorite color ${results.name}?`,
//         options: [
//           { value: 'red', label: 'Red' },
//           { value: 'green', label: 'Green' },
//           { value: 'blue', label: 'Blue' },
//         ],
//       }),
//   },
//   {
//     // On Cancel callback that wraps the group
//     // So if the user cancels one of the prompts in the group this function will be called
//     onCancel: ({ results }) => {
//       p.cancel('Operation cancelled.');
//       process.exit(0);
//     },
//   }
// );




// outro(`You're all set!`);

// p.intro('spinner start...');

// const spin = p.spinner();
// const total = 10000;
// let progress = 0;
// spin.start();

// new Promise((resolve) => {
// 	const timer = setInterval(() => {
// 		progress = Math.min(total, progress + 100);
// 		if (progress >= total) {
// 			clearInterval(timer);
// 			resolve(true);
// 		}
// 		spin.message(`Loading packages [${progress}/${total}]`); // <===
// 	}, 100);
// }).then(() => {
// 	spin.stop(`Done`);
// 	p.outro('spinner stop...');
// });


// async function main() {
// 	console.clear();

// 	await setTimeout(1000);

// 	p.intro(`${color.bgCyan(color.red(' create-app '))}`);

// 	const project = await p.group(
// 		{
// 			path: () =>
// 				p.text({
// 					message: 'Where should we create your project?',
// 					placeholder: './sparkling-solid',
// 					validate: (value) => {
// 						if (!value) return 'Please enter a path.';
// 						if (value[0] !== '.') return 'Please enter a relative path.';
// 					},
// 				}),
// 			password: () =>
// 				p.password({
// 					message: 'Provide a password',
// 					validate: (value) => {
// 						if (!value) return 'Please enter a password.';
// 						if (value.length < 5) return 'Password should have at least 5 characters.';
// 					},
// 				}),
// 			type: ({ results }) =>
// 				p.select({
// 					message: `Pick a project type within "${results.path}"`,
// 					initialValue: 'ts',
// 					maxItems: 5,
// 					options: [
// 						{ value: 'ts', label: 'TypeScript' },
// 						{ value: 'js', label: 'JavaScript' },
// 						{ value: 'rust', label: 'Rust' },
// 						{ value: 'go', label: 'Go' },
// 						{ value: 'python', label: 'Python' },
// 						{ value: 'coffee', label: 'CoffeeScript', hint: 'oh no' },
// 					],
// 				}),
// 			tools: () =>
// 				p.multiselect({
// 					message: 'Select additional tools.',
// 					initialValues: ['prettier', 'eslint'],
// 					options: [
// 						{ value: 'prettier', label: 'Prettier', hint: 'recommended' },
// 						{ value: 'eslint', label: 'ESLint', hint: 'recommended' },
// 						{ value: 'stylelint', label: 'Stylelint' },
// 						{ value: 'gh-action', label: 'GitHub Action' },
// 					],
// 				}),
// 			install: () =>
// 				p.confirm({
// 					message: 'Install dependencies?',
// 					initialValue: false,
// 				}),
// 		},
// 		{
// 			onCancel: () => {
// 				p.cancel('Operation cancelled.');
// 				process.exit(0);
// 			},
// 		}
// 	);

// 	if (project.install) {
// 		const s = p.spinner();
// 		s.start('Installing via pnpm');
// 		await setTimeout(2500);

// 		s.stop('Installed via pnpm');
// 	}

// 	let nextSteps = `cd ${project.path}        \n${project.install ? '' : 'pnpm install\n'}pnpm dev \ninstalled ${project.select}`;

// 	p.note(nextSteps, 'Done.');

// 	p.outro(`Problems? ${color.underline(color.cyan('https://example.com/issues'))}`);
// }

// main().catch(console.error);

async function main() {
  console.clear();
  await setTimeout(1000);
  
  intro. 
};