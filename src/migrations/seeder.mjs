import inquirer from 'inquirer';

import userSeeder from './user-seeder.mjs';
import promptSeeder from './prompt-seeder.mjs';


inquirer
    .prompt([
        {
            type: 'list',
            name: 'fileType',
            message: 'Select migration',
            choices: ['users', 'prompts'],
        },
    ])
    .then(ans1 => {
        inquirer.prompt([
            {
                name: 'recordLength',
                message: 'No of records to insert:',
            },
        ]).then(ans2 => {
            console.info(`You selected : ${ans1.fileType} with ${ans2.recordLength} records.`);

            if (ans1.fileType === 'users') {
                userSeeder(ans2.recordLength).then(res => {
                    console.info(res);
                    process.exit();
                })
            }
            if (ans1.fileType === 'prompts') {
                promptSeeder(ans2.recordLength).then(res => {
                    console.info(res);
                    process.exit();
                })
            }
        })
    });