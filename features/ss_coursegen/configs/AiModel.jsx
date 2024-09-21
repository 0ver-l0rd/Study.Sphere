/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateCourseLayout_AI = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name,about, Duration: Category:'Programming', Topic:Python, Level:Basic, Duration:1 hours, NoOf Chapter:5, in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course": {\n    "name": "Python Programming Basics",\n    "description": "This course will introduce you to the fundamentals of Python programming, a versatile and widely used language. You will learn about data types, variables, operators, control flow, functions, and more.",\n    "chapters": [\n      {\n        "name": "Introduction to Python",\n        "about": "This chapter will cover the basics of Python, including its history, features, and how to set up your programming environment.",\n        "duration": "15 minutes"\n      },\n      {\n        "name": "Data Types and Variables",\n        "about": "This chapter will introduce you to different data types in Python, such as integers, floats, strings, and booleans, and how to use variables to store data.",\n        "duration": "20 minutes"\n      },\n      {\n        "name": "Operators and Expressions",\n        "about": "This chapter will explore various operators in Python, including arithmetic, comparison, logical, and assignment operators, and how to use them to build expressions.",\n        "duration": "20 minutes"\n      },\n      {\n        "name": "Control Flow",\n        "about": "This chapter will teach you about control flow statements, such as conditional statements (if-else) and loops (for, while), allowing your programs to make decisions and execute code repeatedly.",\n        "duration": "20 minutes"\n      },\n      {\n        "name": "Functions and Modules",\n        "about": "This chapter will cover the concept of functions, reusable blocks of code, and how to define and call them. You will also learn about modules and how to import them for additional functionality.",\n        "duration": "15 minutes"\n      }\n    ],\n    "category": "Programming",\n    "topic": "Python",\n    "level": "Basic",\n    "duration": "1 hour",\n    "noOfChapters": 5\n  }\n}\n```\n',
        },
      ],
    },
  ],
});

export const GenerateChapterContent_AI = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Explain the concept in Detail on Topic: WebHooks, Chapter:Future Trends in Webhooks, in JSON Format with list of array with field as title, explanation on give chapter in detail, Code Example(Code field in <precode> format) if applicable",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "title": "Future Trends in Webhooks",\n    "explanation": "Webhooks, while powerful, are still evolving. The future holds exciting possibilities for how webhooks can be utilized and improved. Here are some key trends to watch:",\n    "code": ""\n  },\n  {\n    "title": "Increased Security and Reliability",\n    "explanation": "As webhooks become more critical to application functionality, security and reliability will be paramount. Expect advancements in:",\n    "code": ""\n  },\n  {\n    "title": "Security and Reliability - Authentication & Encryption",\n    "explanation": "- **Stronger authentication:** More sophisticated authentication mechanisms will be employed to prevent unauthorized access and malicious use of webhooks. This could include using digital certificates, two-factor authentication, and more robust API keys.",\n    "code": ""\n  },\n  {\n    "title": "Security and Reliability - Error Handling & Retries",\n    "explanation": "- **Reliable delivery mechanisms:** Techniques like retries, dead letter queues, and webhook monitoring will be integrated to ensure that webhooks are delivered reliably, even in the face of network issues or temporary server outages.",\n    "code": ""\n  },\n  {\n    "title": "Security and Reliability - Robust Error Handling",\n    "explanation": "- **Robust error handling:**  Better error handling and reporting will allow developers to quickly identify and resolve issues with webhook delivery and processing.",\n    "code": ""\n  },\n  {\n    "title": "Webhooks as a Core Building Block",\n    "explanation": "Webhooks are poised to become a core building block for a wider range of applications and services. Expect to see them utilized for:",\n    "code": ""\n  },\n  {\n    "title": "Webhooks as a Core Building Block - Real-time Data & Event Streaming",\n    "explanation": "- **Real-time data and event streaming:** Webhooks will be increasingly used for delivering real-time data updates, enabling applications to react to events as they happen. Think of financial market data, social media updates, and sensor readings.",\n    "code": ""\n  },\n  {\n    "title": "Webhooks as a Core Building Block - Microservices Communication",\n    "explanation": "- **Microservices communication:** Webhooks will play a key role in facilitating communication between microservices, allowing them to interact seamlessly and exchange data in a loosely coupled manner.",\n    "code": ""\n  },\n  {\n    "title": "Webhooks as a Core Building Block - Serverless Architecture",\n    "explanation": "- **Serverless architecture:** Webhooks are perfectly suited for serverless environments. They allow for event-driven execution of code without the need for persistent servers, making them ideal for building scalable and cost-effective applications.",\n    "code": ""\n  },\n  {\n    "title": "Enhanced Functionality and Features",\n    "explanation": "Webhooks are becoming more feature-rich, offering new capabilities to streamline development and improve user experiences.",\n    "code": ""\n  },\n  {\n    "title": "Enhanced Functionality and Features - Webhook Management Platforms",\n    "explanation": "- **Webhook management platforms:** Expect the emergence of dedicated platforms and tools to simplify webhook management, including discovery, configuration, testing, and monitoring.",\n    "code": ""\n  },\n  {\n    "title": "Enhanced Functionality and Features - Webhook Orchestration",\n    "explanation": "- **Webhook orchestration:** Advancements in webhook orchestration will allow for the chaining of multiple webhooks, creating complex workflows and triggering events across multiple applications.",\n    "code": ""\n  },\n  {\n    "title": "Enhanced Functionality and Features - Webhook Filtering and Transformation",\n    "explanation": "- **Webhook filtering and transformation:** More sophisticated filtering and transformation capabilities will enable developers to tailor webhook payloads and target specific applications or processes.",\n    "code": ""\n  },\n  {\n    "title": "Integration with Emerging Technologies",\n    "explanation": "Webhooks will play a crucial role in bridging the gap between different technologies, facilitating seamless integration between various systems.",\n    "code": ""\n  },\n  {\n    "title": "Integration with Emerging Technologies - Blockchain & Web3",\n    "explanation": "- **Blockchain and Web3:** Webhooks will be leveraged to facilitate communication and data exchange within decentralized applications (dApps), allowing for real-time updates and events in the Web3 ecosystem.",\n    "code": ""\n  },\n  {\n    "title": "Integration with Emerging Technologies - Edge Computing",\n    "explanation": "- **Edge computing:** Webhooks will be used for pushing data and notifications to edge devices, enabling real-time responses and more efficient use of resources.",\n    "code": ""\n  },\n  {\n    "title": "Integration with Emerging Technologies - AI & Machine Learning",\n    "explanation": "- **AI and Machine Learning:** Webhooks can be integrated with AI and ML systems to trigger events based on learned patterns and predictions, enabling more intelligent and automated responses.",\n    "code": ""\n  },\n  {\n    "title": "Conclusion",\n    "explanation": "The future of webhooks is bright. As technologies evolve and applications become more interconnected, webhooks will continue to play a pivotal role in facilitating seamless communication and integration between diverse systems.",\n    "code": ""\n  }\n]\n```',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
