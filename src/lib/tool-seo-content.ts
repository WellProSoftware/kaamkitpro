export type ToolSeoContent = {
  title: string;
  description: string;
  howToUse: string[];
  benefits: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  relatedTools: Array<{
    href: string;
    label: string;
  }>;
};

const commonBenefits = [
  "Free to use for everyday digital tasks.",
  "Works directly in your browser without installing desktop software.",
  "Designed with a simple interface for quick results.",
  "Your files or text can be processed directly in your browser for supported tools.",
];

const content: Record<string, ToolSeoContent> = {  "age-calculator": {
    title: "Free Age Calculator Online",
    description:
      "Use the KaamKitPro age calculator to find your age from your date of birth. The calculator can show your age in years, months and days, making it useful when you need an exact age calculation.",
    howToUse: [
      "Enter your date of birth.",
      "Enter the date on which you want to calculate your age.",
      "Review your age in years, months and days.",
    ],
    benefits: commonBenefits,
    faq: [
      {
        question: "How does an age calculator work?",
        answer:
          "An age calculator compares your date of birth with a selected date and calculates the difference in years, months and days.",
      },
      {
        question: "Can I calculate my age for a past or future date?",
        answer:
          "Yes. You can use the calculator with a selected date when you need to determine your age on a particular day.",
      },
    ],
    relatedTools: [
      { href: "/tools/bmi-calculator", label: "BMI Calculator" },
      { href: "/tools/sip-calculator", label: "SIP Calculator" },
    ],
  },

  "bmi-calculator": {
    title: "BMI Calculator Online",
    description:
      "Calculate Body Mass Index using your height and weight with the KaamKitPro BMI calculator. BMI is a commonly used screening measure based on height and weight.",
    howToUse: [
      "Enter your weight.",
      "Enter your height using the available units.",
      "Calculate your BMI and review the result.",
    ],
    benefits: commonBenefits,
    faq: [
      {
        question: "What does BMI mean?",
        answer:
          "BMI stands for Body Mass Index. It is a screening measure calculated from a person's weight and height.",
      },
      {
        question: "Is BMI a medical diagnosis?",
        answer:
          "No. BMI is a screening measure and should not be treated as a diagnosis or a complete assessment of health.",
      },
    ],
    relatedTools: [
      { href: "/tools/age-calculator", label: "Age Calculator" },
    ],
  },

  "gst-calculator": {
    title: "Online GST Calculator",
    description:
      "Calculate GST amounts and understand GST-inclusive or GST-exclusive prices with the KaamKitPro GST calculator.",
    howToUse: [
      "Enter the amount.",
      "Enter or select the applicable GST rate.",
      "Choose the required GST calculation mode.",
      "Review the calculated tax and total amount.",
    ],
    benefits: commonBenefits,
    faq: [
      {
        question: "What is GST?",
        answer:
          "GST stands for Goods and Services Tax, an indirect tax applied to many goods and services in India.",
      },
      {
        question: "Can this calculator calculate GST-inclusive prices?",
        answer:
          "Yes. The tool supports calculations for GST-inclusive and GST-exclusive amounts according to the options provided.",
      },
    ],
    relatedTools: [
      { href: "/tools/sip-calculator", label: "SIP Calculator" },
    ],
  },

  "image-compressor": {
    title: "Image Compressor Online",
    description:
      "Compress images online to reduce file size for websites, sharing and storage. KaamKitPro processes supported images directly in your browser.",
    howToUse: [
      "Select an image from your device.",
      "Choose the available compression settings.",
      "Process the image.",
      "Download the compressed result.",
    ],
    benefits: commonBenefits,
    faq: [
      {
        question: "Why should I compress images?",
        answer:
          "Smaller image files can use less storage and bandwidth and can be easier to upload or share.",
      },
      {
        question: "Will compression always reduce image quality?",
        answer:
          "Lossy compression can reduce quality, while the amount of visible change depends on the image and compression settings.",
      },
    ],
    relatedTools: [
      { href: "/tools/image-resizer", label: "Image Resizer" },
      { href: "/tools/image-converter", label: "Image Converter" },
      { href: "/tools/image-cropper", label: "Image Cropper" },
    ],
  },

  "image-converter": {
    title: "Image Converter Online",
    description:
      "Convert supported image files between common formats directly in your browser with KaamKitPro.",
    howToUse: [
      "Select the image you want to convert.",
      "Choose the desired output format.",
      "Convert the image.",
      "Download the converted file.",
    ],
    benefits: commonBenefits,
    faq: [
      {
        question: "What is an image converter?",
        answer:
          "An image converter changes an image from one supported file format to another.",
      },
      {
        question: "Why convert an image format?",
        answer:
          "Different formats can be useful for compatibility, quality, compression or specific website and software requirements.",
      },
    ],
    relatedTools: [
      { href: "/tools/image-compressor", label: "Image Compressor" },
      { href: "/tools/image-resizer", label: "Image Resizer" },
      { href: "/tools/jpg-to-pdf", label: "JPG to PDF" },
    ],
  },

  "image-cropper": {
    title: "Image Cropper Online",
    description:
      "Crop images online to remove unwanted areas or focus on the part of a picture you need.",
    howToUse: [
      "Upload or select an image.",
      "Choose the crop area.",
      "Apply the crop.",
      "Download the cropped image.",
    ],
    benefits: commonBenefits,
    faq: [
      {
        question: "What does an image cropper do?",
        answer:
          "An image cropper removes unwanted portions of an image while keeping the selected area.",
      },
      {
        question: "Can cropping reduce image dimensions?",
        answer:
          "Yes. Cropping normally produces an output containing only the selected portion of the original image.",
      },
    ],
    relatedTools: [
      { href: "/tools/image-resizer", label: "Image Resizer" },
      { href: "/tools/image-compressor", label: "Image Compressor" },
      { href: "/tools/image-converter", label: "Image Converter" },
    ],
  },

  "image-resizer": {
    title: "Image Resizer Online",
    description:
      "Resize images to custom dimensions using the KaamKitPro image resizer. Useful for websites, social media, documents and digital content.",
    howToUse: [
      "Select an image.",
      "Enter the required dimensions.",
      "Apply the resize operation.",
      "Download the resized image.",
    ],
    benefits: commonBenefits,
    faq: [
      {
        question: "What is image resizing?",
        answer:
          "Image resizing changes the width and height of an image while keeping the image content.",
      },
      {
        question: "Does resizing affect image quality?",
        answer:
          "Changing dimensions can affect sharpness and quality, especially when an image is enlarged significantly.",
      },
    ],
    relatedTools: [
      { href: "/tools/image-compressor", label: "Image Compressor" },
      { href: "/tools/image-cropper", label: "Image Cropper" },
      { href: "/tools/image-converter", label: "Image Converter" },
    ],
  },

  "jpg-to-pdf": {
    title: "JPG to PDF Converter Online",
    description:
      "Convert JPG, JPEG and supported image files into PDF documents directly in your browser. Multiple images can be combined into a single PDF.",
    howToUse: [
      "Select the images you want to convert.",
      "Arrange the images in the required order.",
      "Create the PDF.",
      "Download the generated document.",
    ],
    benefits: commonBenefits,
    faq: [
      {
        question: "Can I convert multiple JPG images to one PDF?",
        answer:
          "Yes. The tool supports selecting multiple images and combining them into a PDF.",
      },
      {
        question: "Can I change the image order?",
        answer:
          "Yes. Use the ordering controls provided by the tool before creating the PDF.",
      },
    ],
    relatedTools: [
      { href: "/tools/pdf-merge", label: "PDF Merge" },
      { href: "/tools/pdf-compressor", label: "PDF Compressor" },
      { href: "/tools/pdf-to-jpg", label: "PDF to JPG" },
    ],
  },

  "pdf-compressor": {
    title: "PDF Compressor Online",
    description:
      "Reduce PDF file size with KaamKitPro's browser-based PDF compression utility. It is useful when a PDF needs to be easier to upload, share or store.",
    howToUse: [
      "Select a PDF file.",
      "Start the compression process.",
      "Review the generated PDF.",
      "Download the compressed file.",
    ],
    benefits: commonBenefits,
    faq: [
      {
        question: "Why compress a PDF?",
        answer:
          "A smaller PDF can be easier to upload, email, share and store.",
      },
      {
        question: "Does PDF compression always make files much smaller?",
        answer:
          "The reduction depends on the structure and contents of the PDF. Some PDFs have more compressible data than others.",
      },
    ],
    relatedTools: [
      { href: "/tools/pdf-merge", label: "PDF Merge" },
      { href: "/tools/pdf-split", label: "PDF Split" },
      { href: "/tools/jpg-to-pdf", label: "JPG to PDF" },
    ],
  },

  "pdf-merge": {
    title: "Merge PDF Files Online",
    description:
      "Combine multiple PDF files into one document with the KaamKitPro PDF merger. You can arrange files before creating the final PDF.",
    howToUse: [
      "Select the PDF files you want to combine.",
      "Arrange the files in the required order.",
      "Remove any file you do not want to include.",
      "Merge the PDFs and download the result.",
    ],
    benefits: commonBenefits,
    faq: [
      {
        question: "Can I merge multiple PDF files?",
        answer:
          "Yes. Select multiple PDF documents and combine them into one PDF.",
      },
      {
        question: "Can I change the order before merging?",
        answer:
          "Yes. Use the available ordering controls to arrange the documents before merging.",
      },
    ],
    relatedTools: [
      { href: "/tools/pdf-split", label: "PDF Split" },
      { href: "/tools/pdf-compressor", label: "PDF Compressor" },
      { href: "/tools/jpg-to-pdf", label: "JPG to PDF" },
    ],
  },

  "pdf-split": {
    title: "Split PDF Online",
    description:
      "Split a PDF into separate page files using KaamKitPro. This is useful when you need individual PDF pages from a larger document.",
    howToUse: [
      "Select a PDF document.",
      "Start the split operation.",
      "Review the generated page files.",
      "Download the pages you need.",
    ],
    benefits: commonBenefits,
    faq: [
      {
        question: "What does splitting a PDF mean?",
        answer:
          "Splitting separates pages from a PDF into individual PDF documents.",
      },
      {
        question: "Can every page be saved separately?",
        answer:
          "The KaamKitPro splitter can create separate PDF files for the pages in the selected document.",
      },
    ],
    relatedTools: [
      { href: "/tools/pdf-merge", label: "PDF Merge" },
      { href: "/tools/pdf-compressor", label: "PDF Compressor" },
      { href: "/tools/pdf-to-jpg", label: "PDF to JPG" },
    ],
  },

  "pdf-to-jpg": {
    title: "PDF to JPG Converter Online",
    description:
      "Convert PDF pages into JPG images directly in your browser. This can be useful when you need image versions of pages for sharing or editing.",
    howToUse: [
      "Select a PDF file.",
      "Allow the tool to process the document pages.",
      "Review the generated JPG images.",
      "Download the images you need.",
    ],
    benefits: commonBenefits,
    faq: [
      {
        question: "Can PDF pages be converted into JPG images?",
        answer:
          "Yes. Each PDF page can be rendered as an image using the browser-based converter.",
      },
      {
        question: "Does converting PDF to JPG edit the original PDF?",
        answer:
          "No. The conversion creates image files from the PDF pages and does not modify the original document.",
      },
    ],
    relatedTools: [
      { href: "/tools/jpg-to-pdf", label: "JPG to PDF" },
      { href: "/tools/pdf-merge", label: "PDF Merge" },
      { href: "/tools/pdf-split", label: "PDF Split" },
    ],
  },

  "sip-calculator": {
    title: "Online SIP Calculator",
    description:
      "Estimate the potential future value of regular SIP investments using the KaamKitPro SIP calculator. Enter investment amount, expected return and duration to explore an estimate.",
    howToUse: [
      "Enter the regular investment amount.",
      "Enter the expected annual return.",
      "Enter the investment duration.",
      "Review the estimated investment value and returns.",
    ],
    benefits: commonBenefits,
    faq: [
      {
        question: "What is SIP?",
        answer:
          "SIP stands for Systematic Investment Plan and generally refers to investing a fixed amount at regular intervals.",
      },
      {
        question: "Are SIP calculator results guaranteed?",
        answer:
          "No. Results are estimates based on the assumptions entered and actual investment returns can vary.",
      },
    ],
    relatedTools: [
      { href: "/tools/gst-calculator", label: "GST Calculator" },
    ],
  },


};

export function getToolSeoContent(
  slug: string
): ToolSeoContent | undefined {
  return content[slug];
}
