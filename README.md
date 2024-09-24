![alt text](./public/logo.svg)
# StudySphere

StudySphere is a cutting-edge collaborative learning platform that integrates powerful AI-driven tools to enhance learning, productivity, and real-time collaboration. The platform supports students and educators through AI-based generators, a metaverse, and advanced communication tools.

To ensure modularity, maintainability, and scalability, we have decided to segregate each feature into its own dedicated folder. This allows for independent development, testing, and deployment of individual features without affecting the overall system.

Each feature is organized in the `/features` directory, allowing contributors and users to explore or test individual functionalities in isolation. This architecture is crucial for larger systems like StudySphere, where features such as AI generators, real-time collaboration tools, and metaverse components can be developed and scaled separately, ensuring that updates or fixes in one area do not disrupt others. This separation also fosters a microservices-like approach, improving collaboration and flexibility for developers who want to focus on specific components.

If you wish to try out any feature independently, head over to the `/features` directory and explore each component's self-contained functionality.

- **DemoLink**:https://studyspherehome.netlify.app
- **Video**:https://drive.google.com/drive/folders/1d9djQq_8QILIeb5w6ZcjKEMK82TH8i_m
## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Core Modules](#core-modules)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

### 🌟 AI-Powered Learning Tools
- **AI Course Generator**: Automatically generates personalized learning paths and course structures based on user inputs.
- **AI Resume Generator**: Helps users create professional, industry-standard resumes tailored to specific roles.
- **AI Exam Generator**: Generates practice exams to help students prepare effectively for real-world tests.
- **AI Mock Interview**: Simulates interview scenarios, providing real-time feedback on answers.
- **AI-Based Web Chat Platform**: Users can chat with any website by pasting a custom AI chat link in front of the website URL.
- **AI PDF Summarizer**: Extracts and summarizes key points from lengthy PDFs, making it easier to digest important information.
- **AI Note Taker and Planner**: Assists with taking notes and organizing tasks to improve productivity and time management.

### 🖊️ Real-Time Collaboration
- **Collaborative Whiteboard**: Enables group brainstorming and real-time visual learning.
- **Real-Time Collaborative Coding**: Facilitates pair programming and live coding sessions with syntax highlighting and real-time code execution.
- **Task Manager**: Organize projects and tasks, track progress, and assign deadlines.

### 🏞️ Metaverse Integration
- **Virtual Classrooms**: Attend or host lectures in an immersive metaverse environment.
- **Interactive Learning Spaces**: Explore custom virtual worlds tailored to specific educational subjects and themes.

### 🗣️ Chat and Communication
- **Real-Time Chat**: Secure chat system for communication between students, educators, and project collaborators.
- **AI-Based Web Chat**: Allows users to interact with websites and resources via an AI-powered chat interface.

### 📊 Progress Tracking and Analytics
- **Learning Analytics**: AI-driven insights to track performance, identify learning gaps, and provide recommendations.
- **Progress Dashboard**: Visualize goals, tasks, and achievements.

## Technologies

### Frontend
- **[Next.js](https://nextjs.org/)**: A React framework for building optimized, scalable, and performant web applications.
- **[TypeScript](https://www.typescriptlang.org/)**: A strongly-typed superset of JavaScript that improves code quality and scalability.
- **[shadcn/ui](https://shadcn.dev/)**: A modern, utility-first UI library for building responsive, component-based interfaces.
- **[TailwindCSS](https://tailwindcss.com/)**: A utility-first CSS framework for creating fast and customizable designs.

### Backend
- **[Node.js](https://nodejs.org/)**: A runtime that allows JavaScript to be used server-side, providing efficient, scalable applications.
- **[Prisma](https://www.prisma.io/)**: An ORM for connecting to databases and providing type-safe access to PostgreSQL.
- **[Drizzle](https://drizzle.team/)**: A lightweight ORM built to optimize database queries and simplify migrations.
- **[PostgreSQL](https://www.postgresql.org/)**: A powerful, open-source relational database system that stores and manages user data.
- **[Strapi](https://strapi.io/)**: A headless CMS for managing and delivering content via an API. It helps power StudySphere’s content and data management.

### AI Integrations
- **[OpenAI API](https://openai.com/api/)**: Powers the AI-based features like course generation, resume generation, mock interviews, and web chat interactions.
- **[Gemini API](https://www.gemini.com/)**: A secure API that enhances our AI-driven functionalities, such as handling real-time interactions with PDFs and website content.

### Authentication and Security
- **[Clerk](https://clerk.dev/)**: A user authentication and management solution that provides robust user access control for StudySphere.
- **[NextAuth](https://next-auth.js.org/)**: A complete authentication solution for Next.js applications, handling sign-in providers like Google, GitHub, etc.

### Deployment and Hosting
- **[Netlify](https://www.netlify.com/)**: Provides fast, secure, and scalable hosting for the frontend components of StudySphere.
- **[Vercel](https://vercel.com/)**: Hosts the backend services, providing serverless infrastructure for API routes, server-side rendering, and more.

### Collaboration and Real-Time Functionality
- **[Socket.io](https://socket.io/)**: Enables real-time, bidirectional communication for chat, collaborative whiteboard, and real-time coding features.
- **[WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)**: Provides full-duplex communication for instant messaging and notifications.

### 3D and Metaverse
- **[Three.js](https://threejs.org/)**: A powerful JavaScript library that enables the creation of 3D graphics for the metaverse and virtual classrooms.
- **[WebXR](https://immersiveweb.dev/)**: A framework for immersive AR/VR experiences used within the virtual spaces of StudySphere.

### Other Key Services
- **[Firebase](https://firebase.google.com/)**: Manages real-time databases and hosting for certain components like the collaborative note taker and task manager.

## Installation

To set up StudySphere on your local machine, follow these steps:

1. Clone the repository:
   ```bash
   git clonehttps://github.com/0ver-l0rd/Study.Sphere.git
   cd studysphere
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Rename a `.env.local.example` files
   - Add the necessary API keys if missing:
     ```env
     e.g
     DATABASE_URL=your_postgresql_database_url
     OPENAI_API_KEY=your_openai_api_key
     GEMINI_API_KEY=your_gemini_api_key
     NEXT_PUBLIC_API_URL=http://localhost:3000
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

Once installed, you can log in or sign up to start using StudySphere. Key actions include:

- **Generate AI-Based Content**: Create courses, resumes, exams, and mock interviews.
- **Collaborate in Real-Time**: Join study groups and collaborate on projects, tasks, or code in real-time.
- **Access the Metaverse**: Attend virtual classes or create immersive learning spaces.
- **Interact with AI-Powered Tools**: Use the AI chatbot to interact with external websites, PDFs, and learning resources.

## Core Modules

1. **AI Generators**: Create personalized course plans, resumes, exams, mock interviews, and summaries of PDFs.
2. **Real-Time Whiteboard**: A shared space for brainstorming, collaboration, and visualization.
3. **Real-Time Collaborative Coding**: Enables pair programming and live coding sessions with syntax highlighting.
4. **Metaverse Integration**: Provides virtual classrooms and interactive learning spaces for immersive learning.
5. **AI Chat Platform**: Engage in AI-driven chats with external websites and resources.
6. **Task Manager and Planner**: Manage and track study or project tasks in real-time.
7. **Progress Tracking and Analytics**: View learning progress and insights via a personalized dashboard.


## Contact

For any questions, feedback, or collaboration requests, please reach out to us at:

- **Email**: studysphere.help2024@gmail.com

- **GitHub**: [https://github.com/0ver-l0rd/Study.Sphere.git](https://github.com/0ver-l0rd/Study.Sphere.git)


