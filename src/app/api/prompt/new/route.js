import { connectToDB } from "@utils/database.mjs";
import Prompt from "@models/prompt.mjs";

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();
    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {
            status: 201
        })
    } catch (error) {
        return new Response("Failed to create new Prompt", {
            status: 500
        })
    }


}
