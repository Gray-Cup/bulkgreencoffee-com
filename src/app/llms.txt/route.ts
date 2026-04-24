import { createGET } from "next-llms-generator/route";

export const GET = createGET({
  generatorOptions: {
    siteUrl: "http://bulkgreencoffee.com/",
    enableRecursiveDiscovery: true,
  },
});
