import { connectToDB } from "@utils/database.mjs";
import Prompt from "@models/prompt.mjs";

export const GET = async (req, { params }) => {

    try {
        await connectToDB();
        const res = await Prompt.find({ $text: { $search: params.searchText } }).populate('creator');
        return new Response(JSON.stringify(res), {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return new Response('Unable to fetch list of Prompts', {
            status: 500
        })
    }
}