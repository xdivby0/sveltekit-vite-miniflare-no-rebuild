import type { PageServerLoad } from "./$types";
import {error} from "@sveltejs/kit";

export const load: PageServerLoad = async ({platform})=>{
    if(!platform) throw error(500, "no platform");

    const x = await platform.env.DB.exec("SELECT * FROM users");
    console.log(x);

    return {
    }
}
