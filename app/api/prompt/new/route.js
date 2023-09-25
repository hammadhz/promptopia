import { connectDB } from "@utils/db";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectDB();
        const newPrompt = new Prompt({
            creator: userId,
            tag,
            prompt 
        })
        console.log(newPrompt);
        await newPrompt.save();
        
        return new Response(JSON.stringify(newPrompt), {
            status: 201
        })
    } catch (error) {
        console.log(error);
        return new Response("Failed", {
            status: 500
        })
    }
}