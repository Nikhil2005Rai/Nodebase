"use client";

import { createAuthClient } from "better-auth/react"

// Create the base auth client
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// Base client that talks to the Next.js auth API route
const baseClient = createAuthClient({ baseURL: BASE_URL });

// Client-safe runtime wrappers that call server endpoints handled by your
// server-side `auth` instance (which owns the polar plugin).
async function checkout(opts: { slug: string }) {
    const res = await fetch(`${BASE_URL}/api/auth/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opts),
    });

    if (!res.ok) throw new Error("Checkout failed");
    return res.json();
}

const customer = {
    async state() {
        const res = await fetch(`${BASE_URL}/api/auth/customer/state`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to load customer state");
        return res.json();
    },
    async portal() {
        const res = await fetch(`${BASE_URL}/api/auth/customer/portal`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to open billing portal");
        return res.json();
    },
};

// Export a single object named `authClient` so existing imports keep working.
// We augment the runtime object with the wrappers above and provide a
// lightweight TypeScript shape for the additional methods so callers like
// `authClient.checkout(...)` and `authClient.customer.state()` type-check.
export const authClient = (Object.assign(baseClient, { checkout, customer }) as unknown) as
    typeof baseClient & {
        checkout: (opts: { slug: string }) => Promise<any>;
        customer: { state: () => Promise<any>; portal: () => Promise<any> };
    };

export default authClient;

// Augment the client with polar plugin types
// The previous export of authClient is now replaced by the new implementation above.


// import { createAuthClient } from "better-auth/react"
// import { polarClient } from "@polar-sh/better-auth";

// export const authClient = createAuthClient({
//     plugins: [],
// });