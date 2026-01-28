# AI Recruiter App

An AI-powered voice interview platform that conducts automated job interviews using advanced speech recognition and natural language processing. Built with Next.js, Vapi.ai, and Supabase, this application leverages cutting-edge AI technologies including Meta Llama models and multiple voice agents to assess candidates through intelligent voice interactions.

## 🚀 Features

- **Voice-Powered Interviews**: AI conducts natural, conversational interviews with candidates using Vapi.ai
- **Real-time Speech Recognition**: Powered by Deepgram for accurate, low-latency transcription
- **AI-Powered Question Generation**: Uses Meta Llama models via OpenRouter to generate tailored interview questions based on job requirements, with support for multiple specialized voice agents
- **Intelligent Feedback Analysis**: Automated assessment of candidate responses with ratings for technical skills, communication, problem-solving, and experience
- **Text-to-Speech Synthesis**: Natural voice responses with Play.ht for seamless AI-human interaction
- **Interview Management**: Create, schedule, and manage customized interviews with dynamic question sets
- **Candidate Assessment Dashboard**: Comprehensive analytics and feedback reports for HR decision-making
- **Secure Authentication**: Supabase Auth for user management and data protection

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15 with React 18 for modern, server-side rendered web application
- **Styling**: Tailwind CSS for responsive, utility-first design
- **Backend**: Next.js API Routes for serverless functions
- **Database**: Supabase (PostgreSQL) for scalable data storage and real-time capabilities
- **Voice AI Platform**: Vapi.ai for orchestrating voice conversations and AI interactions
- **Speech Recognition**: Deepgram for high-accuracy, real-time speech-to-text conversion
- **Text-to-Speech**: Play.ht for natural, human-like voice synthesis
- **AI Language Model**: Meta Llama models (accessed via OpenRouter) for intelligent question generation and feedback analysis, with multiple specialized voice agents
- **Authentication**: Supabase Auth for secure user authentication and authorization
- **UI Components**: Radix UI primitives with custom styling for accessible, professional interface
- **Icons**: Lucide React for consistent, scalable iconography
- **State Management**: React Context API for global state handling
- **Additional Libraries**: Custom hooks and utility functions for enhanced functionality

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Vapi.ai account
- OpenRouter API key (for Meta Llama models)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-voice-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Vapi.ai Configuration
   NEXT_PUBLIC_VAPI=your_vapi_api_key

   # OpenRouter Configuration (for Meta Llama models)
   OPENROUTER_API_KEY=your_openrouter_api_key

   # Application URL (for sharing interview links)
   NEXT_PUBLIC_HOST_URL=http://localhost:3000
   ```

4. **Supabase Setup**
   - Create a new Supabase project
   - Run the following SQL to create the required tables:

   ```sql
   -- Interviews table
   CREATE TABLE interviews (
     id SERIAL PRIMARY KEY,
     interview_id TEXT UNIQUE NOT NULL,
     jobPosition TEXT NOT NULL,
     jobDesc TEXT,
     jobExperience TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     userEmail TEXT NOT NULL,
     questionList JSONB,
     duration TEXT
   );

   -- Interview feedback table
   CREATE TABLE interviewFeedback (
     id SERIAL PRIMARY KEY,
     userName TEXT NOT NULL,
     userEmail TEXT NOT NULL,
     interview_id TEXT NOT NULL,
     feedback JSONB,
     recommendation BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Vapi.ai Setup**
   - Create a Vapi.ai account
   - Get your API key from the dashboard
   - Configure voice settings (Play.ht) and transcription (Deepgram)

## 🚀 Running the Application

1. **Development Server**
   ```bash
   npm run dev
   ```

2. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

3. **Linting**
   ```bash
   npm run lint
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
ai-voice-agent/
├── app/                    # Next.js app directory
│   ├── (main)/            # Protected routes
│   │   ├── dashboard/     # Dashboard pages
│   │   └── scheduled-interview/  # Interview management
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── interview/         # Interview flow pages
├── components/            # Reusable UI components
├── context/               # React context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── services/              # External service configurations
└── public/                # Static assets
```

## 🔄 Interview Flow

1. **Create Interview**: HR creates an interview with job details and questions
2. **Share Link**: Interview link is generated and shared with candidates
3. **Voice Interview**: AI conducts the interview using voice interaction
4. **Generate Feedback**: System analyzes responses and provides feedback
5. **View Results**: HR can view candidate performance and feedback

## 🎯 Key Components

- **Interview Creation**: Customizable questions and job-specific interviews
- **Real-time Voice Processing**: Low-latency voice recognition and synthesis
- **Feedback Analysis**: AI-powered candidate evaluation
- **Dashboard**: Comprehensive analytics and interview management

## 🔒 Security

- Secure authentication with Supabase Auth
- API key protection for external services
- Input validation and sanitization
- Secure database queries


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the troubleshooting guide

## 🔄 Updates

Keep dependencies updated and monitor for security updates in:
- Next.js
- Supabase
- Vapi.ai SDK
- OpenRouter API (Meta Llama models)

