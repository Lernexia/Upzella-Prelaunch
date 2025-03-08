// Form field types
export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "email"
  | "password"
  | "select"
  | "multiselect"
  | "checkbox"
  | "radio"
  | "date"
  | "time"
  | "file"
  | "phone"
  | "url"
  | "heading"
  | "paragraph"
  | "divider"
  | "rating";

// Base field interface
export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  helperText?: string;
  required: boolean;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
  defaultValue?: any;
  options?: any;
  multiple?: boolean;
  rows?: number;
  cols?: number;
  accept?: string;
  className?: string;
  width?: "full" | "half" | "third";
  hidden?: boolean;
}

// Form section
export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  collapsed?: boolean;
}

// Complete form structure
export interface FormTemplate {
  id: string;
  name: string;
  description?: string;
  sections: FormSection[];
  createdAt: string;
  updatedAt: string;
  settings: {
    submitButtonText: string;
    showProgressBar: boolean;
    theme: {
      primaryColor: string;
      backgroundColor: string;
      textColor: string;
      borderRadius: string;
    };
    redirectAfterSubmit?: string;
    enableCaptcha?: boolean;
    storeResponses?: boolean;
    notifyEmails?: string[];
  };
}

// Default templates
export const DEFAULT_FORM_TEMPLATES: FormTemplate[] = [
  {
    id: "standard-application",
    name: "Standard Application",
    description:
      "A standard job application form with personal information, education, work experience, and skills sections.",
    sections: [
      {
        id: "personal-info",
        title: "Personal Information",
        description: "Please provide your contact details",
        fields: [
          {
            id: "full-name",
            type: "text",
            label: "Full Name",
            placeholder: "Enter your full name",
            required: true,
            validation: {
              minLength: 2,
              maxLength: 100,
            },
            width: "full",
          },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            placeholder: "your.email@example.com",
            required: true,
            width: "half",
          },
          {
            id: "phone",
            type: "text",
            label: "Phone Number",
            placeholder: "+1 (555) 000-0000",
            required: true,
            width: "half",
          },
          {
            id: "resume",
            type: "file",
            label: "Resume/CV",
            helperText: "PDF, DOCX or TXT file (Max 5MB)",
            required: true,
            accept: ".pdf,.docx,.txt",
            width: "full",
          },
        ],
        collapsed: false,
      },
      {
        id: "education",
        title: "Education",
        description: "Share your educational background",
        fields: [
          {
            id: "highest-education",
            type: "select",
            label: "Highest Education Level",
            required: true,
            options: [
              { label: "High School", value: "high-school" },
              { label: "Bachelor's Degree", value: "bachelors" },
              { label: "Master's Degree", value: "masters" },
              { label: "PhD", value: "phd" },
              { label: "Other", value: "other" },
            ],
            width: "full",
          },
          {
            id: "institution",
            type: "text",
            label: "Institution Name",
            placeholder: "University/College Name",
            required: true,
            width: "full",
          },
          {
            id: "graduation-year",
            type: "date",
            label: "Graduation Year",
            placeholder: "Graduation Year",
            required: true,
            width: "half",
          },
          {
            id: "field-of-study",
            type: "text",
            label: "Field of Study",
            placeholder: "Computer Science, Business, etc.",
            required: false,
            width: "half",
          },
        ],
        collapsed: false,
      },
      {
        id: "experience",
        title: "Work Experience",
        fields: [
          {
            id: "current-employer",
            type: "text",
            label: "Current or Most Recent Employer",
            placeholder: "Company Name",
            required: false,
            width: "full",
          },
          {
            id: "job-title",
            type: "text",
            label: "Job Title",
            placeholder: "Your position",
            required: false,
            width: "full",
          },
          {
            id: "years-experience",
            type: "text",
            label: "Years of Experience",
            placeholder: "3",
            required: false,
            width: "half",
          },
          {
            id: "job-description",
            type: "textarea",
            label: "Brief Description of Responsibilities",
            placeholder: "Describe your key responsibilities and achievements",
            required: false,
            rows: 4,
            width: "full",
          },
        ],
        collapsed: false,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    settings: {
      submitButtonText: "Submit Application",
      showProgressBar: true,
      theme: {
        primaryColor: "#6C4EF3",
        backgroundColor: "#FFFFFF",
        textColor: "#333333",
        borderRadius: "0.5rem",
      },
    },
  },
  {
    id: "technical-interview",
    name: "Technical Role Application",
    description:
      "A detailed application form for technical positions with skills assessment and coding experience.",
    sections: [
      {
        id: "basic-info",
        title: "Basic Information",
        fields: [
          {
            id: "full-name",
            type: "text",
            label: "Full Name",
            placeholder: "Enter your full name",
            required: true,
            width: "full",
          },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            placeholder: "your.email@example.com",
            required: true,
            width: "half",
          },
          {
            id: "phone",
            type: "text",
            label: "Phone Number",
            placeholder: "+1 (555) 000-0000",
            required: true,
            width: "half",
          },
        ],
        collapsed: false,
      },
      {
        id: "tech-skills",
        title: "Technical Skills",
        description: "Please rate your proficiency in the following areas",
        fields: [
          {
            id: "programming-languages",
            type: "checkbox",
            label: "Programming Languages",
            placeholder: "Select all that apply",
            required: true,
            options: [
              { label: "1", value: "javascript" },
              { label: "2", value: "python" },
              { label: "3", value: "java" },
              { label: "4", value: "csharp" },
              { label: "5", value: "ruby" },
              { label: "6", value: "go" },
              { label: "7", value: "rust" },
              { label: "8", value: "swift" },
              { label: "9", value: "php" },
              { label: "10", value: "other" },
            ],
            multiple: true,
            width: "full",
          },
          {
            id: "frameworks",
            type: "checkbox",
            label: "Frameworks & Libraries",
            placeholder: "Select all that apply",
            required: false,
            options: [
              { label: "1", value: "react" },
              { label: "2", value: "angular" },
              { label: "3", value: "vue" },
              { label: "Node.js", value: "nodejs" },
              { label: "4", value: "django" },
              { label: "5", value: "spring" },
              { label: ".NET", value: "dotnet" },
              { label: "Flask", value: "flask" },
              { label: "Laravel", value: "laravel" },
              { label: "Other", value: "other" },
            ],
            multiple: true,
            width: "full",
          },
          {
            id: "years-coding",
            type: "checkbox",
            label: "Years of Coding Experience",
            required: true,
            options: [
              { label: "Less than 1 year", value: "<1" },
              { label: "1-2 years", value: "1-2" },
              { label: "3-5 years", value: "3-5" },
              { label: "6-10 years", value: "6-10" },
              { label: "Over 10 years", value: ">10" },
            ],
            width: "half",
          },
          {
            id: "github",
            type: "url",
            label: "GitHub Profile URL",
            placeholder: "https://github.com/yourusername",
            required: false,
            width: "half",
          },
        ],
        collapsed: false,
      },
      {
        id: "coding-challenge",
        title: "Coding Challenge",
        description: "Please solve the following problem:",
        fields: [
          {
            id: "challenge-description",
            type: "textarea",
            label:
              "Write a function to reverse a string without using built-in reverse methods.",
            required: false,
            rows: 3,
            width: "full",
          },
          {
            id: "code-solution",
            type: "textarea",
            label: "Your Solution",
            placeholder: "Paste your code here...",
            required: true,
            rows: 3,
            width: "full",
          },
          {
            id: "code-explanation",
            type: "textarea",
            label: "Explain your solution",
            placeholder:
              "Briefly explain your approach and its time/space complexity",
            required: true,
            rows: 4,
            width: "full",
          },
        ],
        collapsed: false,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    settings: {
      submitButtonText: "Submit Technical Application",
      showProgressBar: true,
      theme: {
        primaryColor: "#6C4EF3",
        backgroundColor: "#FFFFFF",
        textColor: "#333333",
        borderRadius: "0.5rem",
      },
    },
  },
  {
    id: "fullstack-python-dev-application",
    name: "Full Stack Python Developer Application",
    description:
      "A job application form for Full Stack Python Developer roles, covering personal details, education, technical skills, and work experience.",
    sections: [
      {
        id: "personal-info",
        title: "Personal Information",
        description: "Please provide your contact details",
        fields: [
          {
            id: "full-name",
            type: "text",
            label: "Full Name",
            placeholder: "Enter your full name",
            required: true,
            validation: {
              minLength: 2,
              maxLength: 100,
            },
            width: "full",
          },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            placeholder: "your.email@example.com",
            required: true,
            width: "half",
          },
          {
            id: "phone",
            type: "text",
            label: "Phone Number",
            placeholder: "+1 (555) 000-0000",
            required: true,
            width: "half",
          },
          {
            id: "resume",
            type: "file",
            label: "Resume/CV",
            helperText: "PDF, DOCX, or TXT file (Max 5MB)",
            required: true,
            accept: ".pdf,.docx,.txt",
            width: "full",
          },
          {
            id: "portfolio",
            type: "text",
            label: "Portfolio/GitHub URL",
            placeholder: "https://github.com/yourprofile",
            required: false,
            width: "full",
          },
        ],
        collapsed: false,
      },
      {
        id: "education",
        title: "Education",
        description: "Share your educational background",
        fields: [
          {
            id: "highest-education",
            type: "select",
            label: "Highest Education Level",
            required: true,
            options: [
              { label: "High School", value: "high-school" },
              { label: "Bachelor's Degree", value: "bachelors" },
              { label: "Master's Degree", value: "masters" },
              { label: "PhD", value: "phd" },
              { label: "Other", value: "other" },
            ],
            width: "full",
          },
          {
            id: "institution",
            type: "text",
            label: "Institution Name",
            placeholder: "University/College Name",
            required: true,
            width: "full",
          },
          {
            id: "graduation-year",
            type: "date",
            label: "Graduation Year",
            placeholder: "Graduation Year",
            required: true,
            width: "half",
          },
          {
            id: "field-of-study",
            type: "text",
            label: "Field of Study",
            placeholder: "Computer Science, Software Engineering, etc.",
            required: false,
            width: "half",
          },
        ],
        collapsed: false,
      },
      {
        id: "technical-skills",
        title: "Technical Skills",
        description:
          "Select the technologies and frameworks you are proficient in.",
        fields: [
          {
            id: "backend-skills",
            type: "checkbox",
            label: "Backend Technologies",
            required: true,
            options: [
              { label: "Python", value: "python" },
              { label: "Django", value: "django" },
              { label: "Flask", value: "flask" },
              { label: "FastAPI", value: "fastapi" },
            ],
            width: "full",
          },
          {
            id: "frontend-skills",
            type: "checkbox",
            label: "Frontend Technologies",
            required: true,
            options: [
              { label: "HTML", value: "html" },
              { label: "CSS", value: "css" },
              { label: "JavaScript", value: "javascript" },
              { label: "React.js", value: "react" },
              { label: "Vue.js", value: "vue" },
            ],
            width: "full",
          },
          {
            id: "database-skills",
            type: "checkbox",
            label: "Database Technologies",
            required: false,
            options: [
              { label: "PostgreSQL", value: "postgresql" },
              { label: "MySQL", value: "mysql" },
              { label: "MongoDB", value: "mongodb" },
              { label: "SQLite", value: "sqlite" },
            ],
            width: "full",
          },
        ],
        collapsed: false,
      },
      {
        id: "experience",
        title: "Work Experience",
        fields: [
          {
            id: "current-employer",
            type: "text",
            label: "Current or Most Recent Employer",
            placeholder: "Company Name",
            required: false,
            width: "full",
          },
          {
            id: "job-title",
            type: "text",
            label: "Job Title",
            placeholder: "Your position",
            required: false,
            width: "full",
          },
          {
            id: "years-experience",
            type: "text",
            label: "Years of Experience",
            placeholder: "3",
            required: false,
            width: "half",
          },
          {
            id: "job-description",
            type: "textarea",
            label: "Brief Description of Responsibilities",
            placeholder: "Describe your key responsibilities and achievements",
            required: false,
            rows: 4,
            width: "full",
          },
        ],
        collapsed: false,
      },
    ],
    createdAt: "2025-03-08T00:00:00.000Z",
    updatedAt: "2025-03-08T00:00:00.000Z",
    settings: {
      submitButtonText: "Submit Application",
      showProgressBar: true,
      theme: {
        primaryColor: "#6C4EF3",
        backgroundColor: "#FFFFFF",
        textColor: "#333333",
        borderRadius: "0.5rem",
      },
    },
  },
  {
    id: "java-developer-application",
    name: "Java Developer Application",
    description:
      "A job application form for Java Developer roles, covering personal details, education, technical skills, and work experience.",
    sections: [
      {
        id: "personal-info",
        title: "Personal Information",
        description: "Please provide your contact details",
        fields: [
          {
            id: "full-name",
            type: "text",
            label: "Full Name",
            placeholder: "Enter your full name",
            required: true,
            validation: {
              minLength: 2,
              maxLength: 100,
            },
            width: "full",
          },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            placeholder: "your.email@example.com",
            required: true,
            width: "half",
          },
          {
            id: "phone",
            type: "text",
            label: "Phone Number",
            placeholder: "+1 (555) 000-0000",
            required: true,
            width: "half",
          },
          {
            id: "resume",
            type: "file",
            label: "Resume/CV",
            helperText: "PDF, DOCX, or TXT file (Max 5MB)",
            required: true,
            accept: ".pdf,.docx,.txt",
            width: "full",
          },
          {
            id: "portfolio",
            type: "text",
            label: "Portfolio/GitHub URL",
            placeholder: "https://github.com/yourprofile",
            required: false,
            width: "full",
          },
        ],
        collapsed: false,
      },
      {
        id: "education",
        title: "Education",
        description: "Share your educational background",
        fields: [
          {
            id: "highest-education",
            type: "select",
            label: "Highest Education Level",
            required: true,
            options: [
              { label: "High School", value: "high-school" },
              { label: "Bachelor's Degree", value: "bachelors" },
              { label: "Master's Degree", value: "masters" },
              { label: "PhD", value: "phd" },
              { label: "Other", value: "other" },
            ],
            width: "full",
          },
          {
            id: "institution",
            type: "text",
            label: "Institution Name",
            placeholder: "University/College Name",
            required: true,
            width: "full",
          },
          {
            id: "graduation-year",
            type: "date",
            label: "Graduation Year",
            placeholder: "Graduation Year",
            required: true,
            width: "half",
          },
          {
            id: "field-of-study",
            type: "text",
            label: "Field of Study",
            placeholder: "Computer Science, Software Engineering, etc.",
            required: false,
            width: "half",
          },
        ],
        collapsed: false,
      },
      {
        id: "technical-skills",
        title: "Technical Skills",
        description:
          "Select the technologies and frameworks you are proficient in.",
        fields: [
          {
            id: "backend-skills",
            type: "checkbox",
            label: "Backend Technologies",
            required: true,
            options: [
              { label: "Java", value: "java" },
              { label: "Spring Boot", value: "spring-boot" },
              { label: "Hibernate", value: "hibernate" },
              { label: "Java EE", value: "java-ee" },
              { label: "Microservices", value: "microservices" },
            ],
            width: "full",
          },
          {
            id: "frontend-skills",
            type: "checkbox",
            label: "Frontend Technologies",
            required: false,
            options: [
              { label: "HTML", value: "html" },
              { label: "CSS", value: "css" },
              { label: "JavaScript", value: "javascript" },
              { label: "React.js", value: "react" },
              { label: "Angular", value: "angular" },
            ],
            width: "full",
          },
          {
            id: "database-skills",
            type: "checkbox",
            label: "Database Technologies",
            required: true,
            options: [
              { label: "MySQL", value: "mysql" },
              { label: "PostgreSQL", value: "postgresql" },
              { label: "MongoDB", value: "mongodb" },
              { label: "Oracle DB", value: "oracle-db" },
            ],
            width: "full",
          },
          {
            id: "devops-skills",
            type: "checkbox",
            label: "DevOps & Tools",
            required: false,
            options: [
              { label: "Docker", value: "docker" },
              { label: "Kubernetes", value: "kubernetes" },
              { label: "Jenkins", value: "jenkins" },
              { label: "Git", value: "git" },
              { label: "AWS", value: "aws" },
            ],
            width: "full",
          },
        ],
        collapsed: false,
      },
      {
        id: "experience",
        title: "Work Experience",
        fields: [
          {
            id: "current-employer",
            type: "text",
            label: "Current or Most Recent Employer",
            placeholder: "Company Name",
            required: false,
            width: "full",
          },
          {
            id: "job-title",
            type: "text",
            label: "Job Title",
            placeholder: "Your position",
            required: false,
            width: "full",
          },
          {
            id: "years-experience",
            type: "text",
            label: "Years of Experience",
            placeholder: "3",
            required: false,
            width: "half",
          },
          {
            id: "job-description",
            type: "textarea",
            label: "Brief Description of Responsibilities",
            placeholder: "Describe your key responsibilities and achievements",
            required: false,
            rows: 4,
            width: "full",
          },
        ],
        collapsed: false,
      },
    ],
    createdAt: "2025-03-08T00:00:00.000Z",
    updatedAt: "2025-03-08T00:00:00.000Z",
    settings: {
      submitButtonText: "Submit Application",
      showProgressBar: true,
      theme: {
        primaryColor: "#6C4EF3",
        backgroundColor: "#FFFFFF",
        textColor: "#333333",
        borderRadius: "0.5rem",
      },
    },
  },
  {
    id: "penetration-testing-engineer-application",
    name: "Penetration Testing Engineer Application",
    description:
      "A job application form for Penetration Testing Engineer roles, covering personal details, education, cybersecurity skills, certifications, and work experience.",
    sections: [
      {
        id: "personal-info",
        title: "Personal Information",
        description: "Please provide your contact details",
        fields: [
          {
            id: "full-name",
            type: "text",
            label: "Full Name",
            placeholder: "Enter your full name",
            required: true,
            validation: {
              minLength: 2,
              maxLength: 100,
            },
            width: "full",
          },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            placeholder: "your.email@example.com",
            required: true,
            width: "half",
          },
          {
            id: "phone",
            type: "text",
            label: "Phone Number",
            placeholder: "+1 (555) 000-0000",
            required: true,
            width: "half",
          },
          {
            id: "resume",
            type: "file",
            label: "Resume/CV",
            helperText: "PDF, DOCX, or TXT file (Max 5MB)",
            required: true,
            accept: ".pdf,.docx,.txt",
            width: "full",
          },
          {
            id: "portfolio",
            type: "text",
            label: "Portfolio/GitHub/Blog URL",
            placeholder: "https://github.com/yourprofile",
            required: false,
            width: "full",
          },
        ],
        collapsed: false,
      },
      {
        id: "education",
        title: "Education",
        description: "Share your educational background",
        fields: [
          {
            id: "highest-education",
            type: "select",
            label: "Highest Education Level",
            required: true,
            options: [
              { label: "High School", value: "high-school" },
              { label: "Bachelor's Degree", value: "bachelors" },
              { label: "Master's Degree", value: "masters" },
              { label: "PhD", value: "phd" },
              { label: "Other", value: "other" },
            ],
            width: "full",
          },
          {
            id: "institution",
            type: "text",
            label: "Institution Name",
            placeholder: "University/College Name",
            required: true,
            width: "full",
          },
          {
            id: "graduation-year",
            type: "date",
            label: "Graduation Year",
            placeholder: "Graduation Year",
            required: true,
            width: "half",
          },
          {
            id: "field-of-study",
            type: "text",
            label: "Field of Study",
            placeholder: "Cybersecurity, Information Security, etc.",
            required: false,
            width: "half",
          },
        ],
        collapsed: false,
      },
      {
        id: "technical-skills",
        title: "Technical Skills",
        description:
          "Select the cybersecurity tools and technologies you are proficient in.",
        fields: [
          {
            id: "pentest-tools",
            type: "checkbox",
            label: "Penetration Testing Tools",
            required: true,
            options: [
              { label: "Metasploit", value: "metasploit" },
              { label: "Burp Suite", value: "burp-suite" },
              { label: "Nmap", value: "nmap" },
              { label: "Wireshark", value: "wireshark" },
              { label: "SQLmap", value: "sqlmap" },
              { label: "Aircrack-ng", value: "aircrack-ng" },
            ],
            width: "full",
          },
          {
            id: "programming-skills",
            type: "checkbox",
            label: "Programming/Scripting Languages",
            required: false,
            options: [
              { label: "Python", value: "python" },
              { label: "Bash", value: "bash" },
              { label: "C/C++", value: "c-cpp" },
              { label: "JavaScript", value: "javascript" },
              { label: "PowerShell", value: "powershell" },
            ],
            width: "full",
          },
          {
            id: "network-security",
            type: "checkbox",
            label: "Network Security & Protocols",
            required: false,
            options: [
              { label: "TCP/IP", value: "tcp-ip" },
              { label: "Firewalls", value: "firewalls" },
              { label: "VPN", value: "vpn" },
              { label: "IDS/IPS", value: "ids-ips" },
            ],
            width: "full",
          },
          {
            id: "cloud-security",
            type: "checkbox",
            label: "Cloud Security & DevSecOps",
            required: false,
            options: [
              { label: "AWS Security", value: "aws-security" },
              { label: "Azure Security", value: "azure-security" },
              {
                label: "Container Security (Docker, Kubernetes)",
                value: "container-security",
              },
            ],
            width: "full",
          },
        ],
        collapsed: false,
      },
      {
        id: "certifications",
        title: "Certifications",
        description:
          "List relevant cybersecurity certifications you have obtained.",
        fields: [
          {
            id: "certifications",
            type: "checkbox",
            label: "Select Certifications",
            required: false,
            options: [
              {
                label: "OSCP (Offensive Security Certified Professional)",
                value: "oscp",
              },
              { label: "CEH (Certified Ethical Hacker)", value: "ceh" },
              {
                label:
                  "CISSP (Certified Information Systems Security Professional)",
                value: "cissp",
              },
              { label: "Security+", value: "security-plus" },
              {
                label: "CISM (Certified Information Security Manager)",
                value: "cism",
              },
            ],
            width: "full",
          },
        ],
        collapsed: false,
      },
      {
        id: "experience",
        title: "Work Experience",
        fields: [
          {
            id: "current-employer",
            type: "text",
            label: "Current or Most Recent Employer",
            placeholder: "Company Name",
            required: false,
            width: "full",
          },
          {
            id: "job-title",
            type: "text",
            label: "Job Title",
            placeholder: "Your position",
            required: false,
            width: "full",
          },
          {
            id: "years-experience",
            type: "text",
            label: "Years of Experience",
            placeholder: "3",
            required: false,
            width: "half",
          },
          {
            id: "job-description",
            type: "textarea",
            label: "Brief Description of Responsibilities",
            placeholder: "Describe your key responsibilities and achievements",
            required: false,
            rows: 4,
            width: "full",
          },
        ],
        collapsed: false,
      },
    ],
    createdAt: "2025-03-08T00:00:00.000Z",
    updatedAt: "2025-03-08T00:00:00.000Z",
    settings: {
      submitButtonText: "Submit Application",
      showProgressBar: true,
      theme: {
        primaryColor: "#6C4EF3",
        backgroundColor: "#FFFFFF",
        textColor: "#333333",
        borderRadius: "0.5rem",
      },
    },
  },
  {
    id: "ai-engineer-application",
    name: "AI Engineer Application",
    description:
      "A job application form for AI Engineer roles, covering personal details, education, AI/ML skills, certifications, and work experience.",
    sections: [
      {
        id: "personal-info",
        title: "Personal Information",
        description: "Please provide your contact details",
        fields: [
          {
            id: "full-name",
            type: "text",
            label: "Full Name",
            placeholder: "Enter your full name",
            required: true,
            validation: {
              minLength: 2,
              maxLength: 100,
            },
            width: "full",
          },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            placeholder: "your.email@example.com",
            required: true,
            width: "half",
          },
          {
            id: "phone",
            type: "text",
            label: "Phone Number",
            placeholder: "+1 (555) 000-0000",
            required: true,
            width: "half",
          },
          {
            id: "resume",
            type: "file",
            label: "Resume/CV",
            helperText: "PDF, DOCX, or TXT file (Max 5MB)",
            required: true,
            accept: ".pdf,.docx,.txt",
            width: "full",
          },
          {
            id: "portfolio",
            type: "text",
            label: "Portfolio/GitHub/Research Papers",
            placeholder: "https://github.com/yourprofile",
            required: false,
            width: "full",
          },
        ],
        collapsed: false,
      },
      {
        id: "education",
        title: "Education",
        description: "Share your educational background",
        fields: [
          {
            id: "highest-education",
            type: "select",
            label: "Highest Education Level",
            required: true,
            options: [
              { label: "Bachelor's Degree", value: "bachelors" },
              { label: "Master's Degree", value: "masters" },
              { label: "PhD", value: "phd" },
              { label: "Other", value: "other" },
            ],
            width: "full",
          },
          {
            id: "institution",
            type: "text",
            label: "Institution Name",
            placeholder: "University/College Name",
            required: true,
            width: "full",
          },
          {
            id: "graduation-year",
            type: "date",
            label: "Graduation Year",
            placeholder: "Graduation Year",
            required: true,
            width: "half",
          },
          {
            id: "field-of-study",
            type: "text",
            label: "Field of Study",
            placeholder: "AI, Machine Learning, Computer Science, etc.",
            required: true,
            width: "half",
          },
        ],
        collapsed: false,
      },
      {
        id: "ai-ml-skills",
        title: "AI & Machine Learning Skills",
        description:
          "Select the AI/ML tools and technologies you are proficient in.",
        fields: [
          {
            id: "ml-frameworks",
            type: "checkbox",
            label: "Machine Learning Frameworks",
            required: true,
            options: [
              { label: "TensorFlow", value: "tensorflow" },
              { label: "PyTorch", value: "pytorch" },
              { label: "Scikit-Learn", value: "scikit-learn" },
              { label: "Keras", value: "keras" },
            ],
            width: "full",
          },
          {
            id: "programming-skills",
            type: "checkbox",
            label: "Programming Languages",
            required: true,
            options: [
              { label: "Python", value: "python" },
              { label: "R", value: "r" },
              { label: "C++", value: "c++" },
              { label: "Java", value: "java" },
            ],
            width: "full",
          },
          {
            id: "deep-learning",
            type: "checkbox",
            label: "Deep Learning Topics",
            required: false,
            options: [
              { label: "Computer Vision", value: "computer-vision" },
              { label: "NLP (Natural Language Processing)", value: "nlp" },
              {
                label: "Reinforcement Learning",
                value: "reinforcement-learning",
              },
            ],
            width: "full",
          },
          {
            id: "cloud-platforms",
            type: "checkbox",
            label: "Cloud & AI Platforms",
            required: false,
            options: [
              { label: "AWS AI/ML Services", value: "aws" },
              { label: "Google Cloud AI", value: "gcp" },
              { label: "Azure AI", value: "azure" },
            ],
            width: "full",
          },
        ],
        collapsed: false,
      },
      {
        id: "certifications",
        title: "Certifications",
        description: "List relevant AI/ML certifications you have obtained.",
        fields: [
          {
            id: "certifications",
            type: "checkbox",
            label: "Select Certifications",
            required: false,
            options: [
              {
                label: "TensorFlow Developer Certificate",
                value: "tensorflow-cert",
              },
              { label: "AWS Certified Machine Learning", value: "aws-ml" },
              { label: "Google Professional ML Engineer", value: "google-ml" },
              { label: "Microsoft Azure AI Engineer", value: "azure-ai" },
            ],
            width: "full",
          },
        ],
        collapsed: false,
      },
      {
        id: "experience",
        title: "Work Experience",
        fields: [
          {
            id: "current-employer",
            type: "text",
            label: "Current or Most Recent Employer",
            placeholder: "Company Name",
            required: false,
            width: "full",
          },
          {
            id: "job-title",
            type: "text",
            label: "Job Title",
            placeholder: "Your position",
            required: false,
            width: "full",
          },
          {
            id: "years-experience",
            type: "text",
            label: "Years of Experience",
            placeholder: "3",
            required: false,
            width: "half",
          },
          {
            id: "job-description",
            type: "textarea",
            label: "Brief Description of Responsibilities",
            placeholder: "Describe your key responsibilities and achievements",
            required: false,
            rows: 4,
            width: "full",
          },
        ],
        collapsed: false,
      },
    ],
    createdAt: "2025-03-08T00:00:00.000Z",
    updatedAt: "2025-03-08T00:00:00.000Z",
    settings: {
      submitButtonText: "Submit Application",
      showProgressBar: true,
      theme: {
        primaryColor: "#6C4EF3",
        backgroundColor: "#FFFFFF",
        textColor: "#333333",
        borderRadius: "0.5rem",
      },
    },
  },
];

// Empty form template
export const EMPTY_FORM_TEMPLATE: FormTemplate = {
  id: `form-${Date.now()}`,
  name: "Untitled Form",
  description: "A new application form",
  sections: [
    {
      id: `section-${Date.now()}`,
      title: "Personal Information",
      description: "Please fill in your details",
      fields: [],
      collapsed: false,
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  settings: {
    submitButtonText: "Submit",
    showProgressBar: true,
    theme: {
      primaryColor: "#6C4EF3",
      backgroundColor: "#FFFFFF",
      textColor: "#333333",
      borderRadius: "0.5rem",
    },
  },
};
