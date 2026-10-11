import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { cdnAdapter } from "@vinext/cloudflare/cache/cdn-adapter";

export default defineConfig({
  // Vite does not automatically inline arbitrary process.env variables. Make
  // the staging-only SEO guard deterministic in the generated server bundle.
  define: {
    "process.env.KAAMKITPRO_STAGING": JSON.stringify(process.env.KAAMKITPRO_STAGING ?? ""),
  },
  plugins: [
    tailwindcss(),
    vinext({
      cache: { cdn: cdnAdapter() },
    }),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
