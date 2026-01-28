import { BriefcaseBusinessIcon, CalendarCheckIcon, Code2Icon, LayoutDashboard, List, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react"

export const SideBarOptions=[
    {
        name:'Dashboard',
        icon:LayoutDashboard,
        path:'/dashboard'
    },
    {
        name:'Scheduled Interview',
        icon:CalendarCheckIcon,
        path:'/scheduled-interview'
    },
    {
        name:'All Interview',
        icon:List,
        path:'/all-interview'
    },
    {
        name:'Billing',
        icon:WalletCards,
        path:'/billing'
    },
    {
        name:'Settings',
        icon:Settings,
        path:'/settings'
    }
]

export const InterviewType=[
    {
        title:'Technical',
        icon:Code2Icon
    },
    {
        title:'Behavioral',
        icon:User2Icon
    },
    {
        title:'Experience',
        icon:BriefcaseBusinessIcon
    },
    {
        title:'Problem Solving',
        icon:Puzzle
    },
    
]

export const QuESTIONS_PROMPT=`you are an expert technical interviewer.based on the following inputs, generate a well-structured list of interview questions.
Job Title: {job_position}
Job Description: {job_description}
Interview Type: {interview_type}           
Interview Duration: {interview_duration}
your task :
analyze the job description to identify key responsbilities and required skills.
based on the interview type select relevant questions that assess both technical skills and cultural fit.
structure the questions in a logical order, starting with easy ones and gradually increasing the difficulty level.
ensure the total number of questions is appropriate for the given interview duration.
provide concise and clear questions that effectively evaluate the candidate's suitability for the role.
format your response in JSON format with array list of question in format: imterviewQuestions=[
{
"question":""
type:"technical/behavioral/experience/problem solving"
},{...
}]
the goal is to create a comprehensive set of interview questions that thoroughly assess the candidate's qualifications for the specified job role.`;

export const FEEDBACK_PROMPT=`{{conversation}}
Depends on this Interview Conversation between asssitant and user , Give me feedback for user interview . give me rating out of 10 for technical skills, communication , 
problem solving . experience also give me summary in 3 lines for hire or not with msg give me 
response in JSON format
{
    feedback;{
        rating;{
            technicalskills:4,
            communication:6,
            problemSolviing:5,
            experinece:7
        },
        summary:<in 3 line>
        Recommendation:'',
        RecommendationMsg:''
    }
}`