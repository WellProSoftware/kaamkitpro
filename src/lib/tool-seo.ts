import type { Metadata } from "next";

export type ToolSeo = {
  title: string;
  description: string;
  keywords: string[];
};

const toolSeo: Record<string, ToolSeo> = {
  "age-calculator": {
    title: "Age Calculator Online",
    description:
      "Calculate your exact age in years, months and days from your date of birth with this free online age calculator.",
    keywords: ["age calculator", "calculate age", "date of birth calculator"],
  },
  base64: {
    title: "Base64 Encoder & Decoder Online",
    description:
      "Encode text to Base64 or decode Base64 strings online with this free browser-based tool.",
    keywords: ["base64 encoder", "base64 decoder", "base64 converter"],
  },
  "bmi-calculator": {
    title: "BMI Calculator Online",
    description:
      "Calculate Body Mass Index using height and weight with this free online BMI calculator.",
    keywords: ["BMI calculator", "body mass index calculator", "BMI online"],
  },
  "case-converter": {
    title: "Case Converter Online",
    description:
      "Convert text to uppercase, lowercase, title case and other common text formats online.",
    keywords: ["case converter", "uppercase converter", "lowercase converter"],
  },
  "character-counter": {
    title: "Character Counter Online",
    description:
      "Count characters in your text with or without spaces using this free online character counter.",
    keywords: ["character counter", "character count", "count characters online"],
  },
  "color-converter": {
    title: "Color Converter: HEX to RGB",
    description:
      "Convert colors between HEX and RGB formats with this free online color converter.",
    keywords: ["color converter", "hex to rgb", "rgb to hex"],
  },
  "css-formatter": {
    title: "CSS Formatter Online",
    description:
      "Format and organize CSS code into a cleaner and more readable structure online.",
    keywords: ["CSS formatter", "format CSS", "CSS beautifier"],
  },
  "emi-calculator": {
    title: "EMI Calculator Online",
    description:
      "Calculate monthly loan EMI, total interest and total payment using this free EMI calculator.",
    keywords: ["EMI calculator", "loan EMI calculator", "monthly EMI calculator"],
  },
  "gst-calculator": {
    title: "GST Calculator Online",
    description:
      "Calculate GST amount, inclusive price and exclusive price quickly with this free GST calculator.",
    keywords: ["GST calculator", "GST calculation", "GST inclusive calculator"],
  },
  "hash-generator": {
    title: "Hash Generator Online",
    description:
      "Generate SHA-256, SHA-384 and SHA-512 hashes from text directly in your browser.",
    keywords: ["hash generator", "SHA-256 generator", "SHA hash generator"],
  },
  "hashtag-generator": {
    title: "Hashtag Generator for Social Media",
    description:
      "Generate relevant hashtag ideas for Instagram, YouTube and other social media content.",
    keywords: ["hashtag generator", "Instagram hashtags", "social media hashtags"],
  },
  "html-formatter": {
    title: "HTML Formatter Online",
    description:
      "Format and organize HTML code for cleaner, easier reading and editing.",
    keywords: ["HTML formatter", "HTML beautifier", "format HTML online"],
  },
  "image-compressor": {
    title: "Image Compressor Online",
    description:
      "Compress JPG, PNG and WebP images online to reduce file size while maintaining useful quality.",
    keywords: ["image compressor", "compress image", "reduce image size"],
  },
  "image-converter": {
    title: "Image Converter Online",
    description:
      "Convert images between common formats directly in your browser with this free online image converter.",
    keywords: ["image converter", "convert image", "JPG PNG converter"],
  },
  "image-cropper": {
    title: "Image Cropper Online",
    description:
      "Crop images online to the size and shape you need with this free browser-based image cropper.",
    keywords: ["image cropper", "crop image online", "photo cropper"],
  },
  "image-resizer": {
    title: "Image Resizer Online",
    description:
      "Resize images to custom dimensions online while keeping control over the output size.",
    keywords: ["image resizer", "resize image", "photo resizer"],
  },
  "instagram-caption-generator": {
    title: "Instagram Caption Generator",
    description:
      "Generate Instagram caption ideas for posts, reels and social media content.",
    keywords: ["Instagram caption generator", "Instagram captions", "caption ideas"],
  },
  "jpg-to-pdf": {
    title: "JPG to PDF Converter Online",
    description:
      "Convert JPG, JPEG and PNG images into PDF documents online for free.",
    keywords: ["JPG to PDF", "image to PDF", "JPEG to PDF"],
  },
  "js-formatter": {
    title: "JavaScript Formatter Online",
    description:
      "Format and organize JavaScript code for improved readability and easier editing.",
    keywords: ["JavaScript formatter", "JS formatter", "JavaScript beautifier"],
  },
  "json-formatter": {
    title: "JSON Formatter & Validator Online",
    description:
      "Format, validate and clean JSON data with this free online JSON formatter.",
    keywords: ["JSON formatter", "JSON validator", "format JSON online"],
  },
  "keyword-density-checker": {
    title: "Keyword Density Checker Online",
    description:
      "Check keyword frequency and density in your content with this free online SEO tool.",
    keywords: ["keyword density checker", "keyword density", "SEO keyword checker"],
  },
  "meta-description-generator": {
    title: "Meta Description Generator",
    description:
      "Create concise, search-friendly meta description ideas for your website pages.",
    keywords: ["meta description generator", "SEO description generator", "meta description"],
  },
  "meta-tag-generator": {
    title: "Meta Tag Generator Online",
    description:
      "Generate useful HTML meta tags for your website pages with this free SEO tool.",
    keywords: ["meta tag generator", "SEO meta tags", "HTML meta tags"],
  },
  "og-preview-generator": {
    title: "Open Graph Preview Generator",
    description:
      "Preview Open Graph title, description and image information for social media sharing.",
    keywords: ["OG preview", "Open Graph preview", "social media preview"],
  },
  password: {
    title: "Password Generator Online",
    description:
      "Generate strong random passwords with customizable length and character options.",
    keywords: ["password generator", "strong password generator", "random password"],
  },
  "pdf-compressor": {
    title: "PDF Compressor Online",
    description:
      "Reduce PDF file size online with this free browser-based PDF compression tool.",
    keywords: ["PDF compressor", "compress PDF", "reduce PDF size"],
  },
  "pdf-merge": {
    title: "Merge PDF Files Online",
    description:
      "Merge multiple PDF files into one document online for free with KaamKitPro.",
    keywords: ["merge PDF", "PDF merger", "combine PDF files"],
  },
  "pdf-split": {
    title: "Split PDF Online",
    description:
      "Split a PDF into separate pages online with this free browser-based PDF splitter.",
    keywords: ["split PDF", "PDF splitter", "separate PDF pages"],
  },
  "pdf-to-jpg": {
    title: "PDF to JPG Converter Online",
    description:
      "Convert PDF pages into JPG images online with this free browser-based converter.",
    keywords: ["PDF to JPG", "PDF converter", "convert PDF to image"],
  },
  "qr-code-generator": {
    title: "QR Code Generator Online",
    description:
      "Create custom QR codes from text or links with this free online QR code generator.",
    keywords: ["QR code generator", "create QR code", "QR code maker"],
  },
  "remove-extra-spaces": {
    title: "Remove Extra Spaces from Text",
    description:
      "Remove repeated and unnecessary spaces from text with this free online text cleaning tool.",
    keywords: ["remove extra spaces", "remove spaces from text", "text cleaner"],
  },
  "sip-calculator": {
    title: "SIP Calculator Online",
    description:
      "Estimate SIP investment growth, total investment and potential returns with this free calculator.",
    keywords: ["SIP calculator", "SIP return calculator", "mutual fund SIP calculator"],
  },
  "sitemap-generator": {
    title: "XML Sitemap Generator Online",
    description:
      "Generate an XML sitemap structure for your website URLs with this free SEO tool.",
    keywords: ["sitemap generator", "XML sitemap generator", "SEO sitemap"],
  },
  "slug-generator": {
    title: "URL Slug Generator",
    description:
      "Create clean, readable and SEO-friendly URL slugs from titles or text.",
    keywords: ["slug generator", "URL slug generator", "SEO URL slug"],
  },
  "timestamp-converter": {
    title: "Unix Timestamp Converter",
    description:
      "Convert Unix timestamps to readable dates and times with this free online converter.",
    keywords: ["timestamp converter", "Unix timestamp converter", "epoch converter"],
  },
  "url-encoder-decoder": {
    title: "URL Encoder & Decoder Online",
    description:
      "Encode or decode URL text quickly and safely in your browser.",
    keywords: ["URL encoder", "URL decoder", "percent encoding"],
  },
  "uuid-generator": {
    title: "UUID Generator Online",
    description:
      "Generate random UUIDs instantly with this free online UUID generator.",
    keywords: ["UUID generator", "random UUID", "UUID v4 generator"],
  },
  "word-counter": {
    title: "Word Counter Online",
    description:
      "Count words, characters and paragraphs instantly with this free online word counter.",
    keywords: ["word counter", "word count", "character counter"],
  },
  "youtube-description-generator": {
    title: "YouTube Description Generator",
    description:
      "Create structured YouTube video description ideas for videos, channels and content.",
    keywords: ["YouTube description generator", "video description generator", "YouTube SEO"],
  },
  "youtube-title-generator": {
    title: "YouTube Title Generator",
    description:
      "Create catchy YouTube title ideas for videos, channels and content.",
    keywords: ["YouTube title generator", "YouTube titles", "video title ideas"],
  },
  "image-brightness": {
    title: "Image Brightness Tool",
    description: "Adjust the brightness of an image and review the result before downloading it.",
    keywords: ["image brightness tool","brighten image online","adjust photo brightness"],
  },
  "image-flip": {
    title: "Image Flip Tool",
    description: "Mirror an image horizontally or vertically with this free online image utility.",
    keywords: ["image flip tool","flip image online","mirror image"],
  },
  "image-grayscale": {
    title: "Image Grayscale Converter",
    description: "Convert an image to grayscale for monochrome graphics, documents and photo projects.",
    keywords: ["grayscale image converter","black and white image","convert image to grayscale"],
  },
  "image-rotate": {
    title: "Image Rotate Tool",
    description: "Rotate an image to the required orientation and check the result before saving.",
    keywords: ["rotate image online","image rotation tool","turn photo"],
  },
  "line-sorter": {
    title: "Text Line Sorter",
    description: "Sort a line-by-line text list into a consistent order for easier review and reuse.",
    keywords: ["line sorter","sort lines online","alphabetical text sorter"],
  },
  "pdf-extract-text": {
    title: "PDF Text Extractor",
    description: "Extract selectable text from PDF documents for searching, reviewing and reuse.",
    keywords: ["PDF text extractor","extract text from PDF","PDF to text"],
  },
  "pdf-metadata": {
    title: "PDF Metadata Viewer",
    description: "Review descriptive PDF properties such as title, author and creation details when available.",
    keywords: ["PDF metadata viewer","PDF properties","view PDF metadata"],
  },
  "pdf-page-number": {
    title: "PDF Page Number Tool",
    description: "Add page numbers to a PDF and review placement before using or printing the document.",
    keywords: ["add page numbers to PDF","PDF page numbering","number PDF pages"],
  },
  "pdf-protect": {
    title: "PDF Protection Guide",
    description: "Understand PDF passwords, permissions and security limits before sharing a document.",
    keywords: ["PDF protection","protect PDF","PDF password security"],
  },
  "pdf-rotate": {
    title: "PDF Rotate Tool",
    description: "Rotate PDF pages to correct sideways or upside-down documents before sharing or printing.",
    keywords: ["rotate PDF","PDF page rotation","turn PDF pages"],
  },
  "pdf-watermark": {
    title: "PDF Watermark Guide",
    description: "Learn how PDF watermarks label drafts, samples and documents for review or distribution.",
    keywords: ["PDF watermark","add watermark to PDF","watermark PDF document"],
  },
  "percentage-calculator": {
    title: "Percentage Calculator",
    description: "Calculate a percentage of a value, compare shares and estimate percentage increases or decreases.",
    keywords: ["percentage calculator","percentage increase calculator","calculate percent"],
  },
  "remove-duplicate-lines": {
    title: "Remove Duplicate Lines",
    description: "Clean a line-based text list by identifying and removing repeated entries.",
    keywords: ["remove duplicate lines","duplicate line remover","deduplicate text list"],
  },
  "text-diff-checker": {
    title: "Text Diff Checker",
    description: "Compare two text versions and review additions, removals and changes side by side.",
    keywords: ["text diff checker","compare text online","text difference tool"],
  },
  "csv-to-json": {
    title: "CSV to JSON Converter",
    description: "Convert compatible CSV table data into JSON for APIs, scripts and data workflows.",
    keywords: ["CSV to JSON","CSV JSON converter","convert CSV data"],
  },
  "json-to-csv": {
    title: "JSON to CSV Converter",
    description: "Convert compatible JSON records into CSV for spreadsheets, reports and data review.",
    keywords: ["JSON to CSV","JSON CSV converter","convert JSON to spreadsheet"],
  },

};

export function getToolSeo(slug: string): ToolSeo | undefined {
  return toolSeo[slug];
}

export function createToolSeoMetadata(slug: string): Metadata | undefined {
  const seo = getToolSeo(slug);

  if (!seo) {
    return undefined;
  }

  return {
    title: seo.title,
    description: seo.description,
    keywords: [
      ...seo.keywords,
      "KaamKitPro",
      "free online tool",
      "online tools",
    ],
    alternates: {
      canonical: `https://kaamkitpro.com/tools/${slug}`,
    },
    openGraph: {
      title: `${seo.title} | KaamKitPro`,
      description: seo.description,
      type: "website",
      siteName: "KaamKitPro",
      url: `https://kaamkitpro.com/tools/${slug}`,
    },
    twitter: {
      card: "summary",
      title: `${seo.title} | KaamKitPro`,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
