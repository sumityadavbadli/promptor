import { faker } from '@faker-js/faker'
import User from '../models/user.mjs';
import { connectToDB } from '../utils/database.mjs'

export const fakeUser = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
        email: faker.internet.email({ firstName, lastName }),
        username: `${firstName}${lastName}`,
        image: faker.image.avatarGitHub(),
    }
}


const userSeeder = async (length) => {
    const users = Array.from({ length: length }).map(() => fakeUser());
    try {
        await connectToDB();
        await User.insertMany(users);
        return "Records Inserted";
    } catch (error) {
        console.log(users);
        return "Unable to insert Records";
    }
}

export default userSeeder;