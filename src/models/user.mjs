import pkg from 'mongoose';
const { Schema, model, models } = pkg;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        // match: [/^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String
    }
});
// Models provided by the mongoose library stores all the registered models

const User = models.User || model("User", UserSchema);

export default User;