import { faker } from '@faker-js/faker'
import Prompt from '../models/prompt.mjs';
import User from '../models/user.mjs';
import { connectToDB } from '../utils/database.mjs'

let usersList = [];

const getUsersList = async () => {
    if (usersList.length === 0) {
        await connectToDB();
        return usersList = await User.find({});
    } else {
        return usersList;
    }
}

const fakePrompt = async () => {
    const users = await getUsersList();
    const user = await users[Math.floor(Math.random() * users.length)];
    return {
        creator: user._id,
        prompt: faker.lorem.text(),
        tag: faker.lorem.word(5)
    }
}


const promptSeeder = async (length) => {
    const prompts = await Promise.all(Array.from({ length: length }).map(async () => {
        return await fakePrompt();
    }));

    try {
        await Prompt.insertMany(prompts);
        return "Records Inserted";
    } catch (error) {
        return "Unable to insert Records";
    }
}

export default promptSeeder;