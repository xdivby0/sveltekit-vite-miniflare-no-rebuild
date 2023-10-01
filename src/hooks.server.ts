import {dev} from '$app/environment';
import {createD1, createR2} from '$lib/server/miniflare';
import type { D1Database } from '@miniflare/d1';
import type {Handle} from "@sveltejs/kit";
import {sequence} from '@sveltejs/kit/hooks';

const injectWranglerStuff: Handle = async ({event, resolve}) => {
    if (dev) {
        // We fake the platform for local development.
        event.platform ??= {
            env: {
                DB: await createD1({type: 'file', path: '.mf/d1-database.sqlite3'}) as D1Database,
                R2: await createR2({
                    type: "file",
                    path: ".mf/r2"
                })
            },
        };
    }
    return resolve(event);
};

export const handle = sequence(injectWranglerStuff);