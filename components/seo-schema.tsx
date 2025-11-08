import Script from "next/script"

interface SeoSchemaProps {
  type?: "WebPage" | "Product" | "Service" | "Article"
  title?: string
  description?: string
  image?: string
  url?: string
}

export function SeoSchema({
  type = "WebPage",
  title = "Titanocloud",
  description = "Cloud hosting con inteligencia artificial",
  image = "/datacenter-professional.png",
  url = "https://titanocloud.com",
}: SeoSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description: description,
    image: image,
    url: url,
    provider: {
      "@type": "Organization",
      name: "Titanocloud",
      url: "https://titanocloud.com",
    },
  }

  return (
    <Script
      id="seo-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}
