import { connectToDB } from "@utils/database.mjs";
import Prompt from "@models/prompt.mjs";

// GET
export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findOne({ _id: params.id }).populate('creator');
        if (!prompt) {
            return new Response("Prompt not found", {
                status: 404
            })
        }
        return new Response(JSON.stringify(prompt), {
            status: 200
        })
    } catch (error) {
        return new Response("Unable to read prompt", {
            status: 500
        })
    }
}

// Patch - Update

export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();
    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", {
                status: 404
            })
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {
            status: 200
        })

    } catch (error) {
        return new Response("Unable to update prompt", {
            status: 500
        })
    }
}

// Delete
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt Deleted Succesfully", {
            status: 200
        })
    } catch (error) {
        return new Response("Unable to update prompt", {
            status: 500
        })
    }
}
