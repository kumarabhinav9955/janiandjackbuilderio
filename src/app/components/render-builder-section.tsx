import { builder } from "@builder.io/sdk"; 

import { RenderBuilderContent } from "./render-builder-content"; 

  

// Replace with your Public API Key 

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!); 

  

interface RenderBuilderSectionProps { 

  model: string; 

  urlPath?: string; 

  params: any; 

} 

  

export async function RenderBuilderSection({ model, urlPath, params }: RenderBuilderSectionProps) { 

  try { 

    const sectionContent = await builder 

      // Get the page content from Builder 

      .get(model, { 

        userAttributes: { 

          // Use the page path specified in the URL to fetch the content 

          urlPath: urlPath || "/" + (params?.page?.join("/") || ""), 

        }, 

        // Set prerender to false to prevent infinite rendering loops 

        prerender: false, 

      }) 

      .toPromise(); 

  

    return sectionContent ? <RenderBuilderContent model={model} content={sectionContent} /> : <></>; 

  } catch (error) { 

    console.log("error", error); 

  } 

 

  return <></>; 

} 