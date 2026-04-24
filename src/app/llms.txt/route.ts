import { createGET } from "next-llms-generator/route";

export const GET = createGET({
  generatorOptions: {
    siteUrl: "http://b2b.graycup.in/",
    enableRecursiveDiscovery: true,
  },
});
