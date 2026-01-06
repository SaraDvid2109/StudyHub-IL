# AI Usage Log

## Introduction

This document records the use of artificial intelligence tools during the development of the StudyHub-IL project. Each team is required to document 3-5 significant cases where AI tools were used as part of the course requirements.

## Principles of AI Usage in the Project

- **Full Control**: Students maintain complete control and understanding of all AI-generated outputs
- **Review**: All code or deliverables created by AI underwent thorough review and validation
- **Learning**: AI usage served as a learning tool for new technologies and methodologies
- **Quality**: All outputs were tested and found to meet project standards

---

## Case 1: Azure Blob Storage File Storage Setup

### Problem/Task
There was a need to migrate the file storage system from local server storage to a cloud storage solution. The challenge was understanding how to interface with Azure Blob Storage, manage file uploads and downloads, and store metadata in the database.

### AI Tool Used
- **GitHub Copilot** - for code completion and function generation
- **ChatGPT-4** - for architectural advice and understanding Azure SDK

### Main Prompt
```
"I need to implement Azure Blob Storage for file uploads in a Node.js/Express application.
Requirements:
- Upload PDF and DOCX files (max 10MB)
- Store file metadata in PostgreSQL database
- Generate secure download URLs
- Handle errors gracefully
- Use environment variables for credentials

Please provide:
1. Azure Storage initialization code
2. Upload endpoint with validation
3. Download URL generation
4. Error handling"
```

### How AI Advanced the Project
- **Code Generation**: Complete code for Azure Storage Client initialization with error handling was generated
- **Upload Functions**: Functions for uploading files with validation of file types and size were created
- **Security**: Added code for sanitizing filenames and preventing collisions using timestamps
- **Documentation**: Comprehensive documentation (`AZURE_STORAGE.md`) was created for setup and usage
- **Time Savings**: Saved approximately 8 hours of work in understanding the API and writing code

**Files Created/Modified**:
- `server/src/lib/azureStorage.js`
- `server/src/routes/summaries.js`
- `AZURE_STORAGE.md`
- `README_HE.md` (added setup instructions)

---

## Case 2: Forum System with Security Protections

### Problem/Task
There was a need to create a forum for discussions between students with the ability to comment, rate, and search posts. The main challenge was ensuring the system was protected against XSS (Cross-Site Scripting), SQL Injection, and other vulnerabilities.

### AI Tool Used
- **GitHub Copilot** - for writing API code and validation functions
- **Claude/ChatGPT** - for security review and best practice recommendations

### Main Prompt
```
"Create a forum system API with the following security requirements:
- Input sanitization to prevent XSS attacks
- SQL injection prevention using Prisma ORM
- Authentication and authorization checks
- Rate limiting on API endpoints
- Validation of all user inputs

Features needed:
- Create/edit/delete posts
- Comments and replies
- Upvote/downvote system
- Search and filter
- User permissions (author can edit/delete own posts)

Please include comprehensive input validation and security measures."
```

### How AI Advanced the Project
- **Security Code**: Sanitization functions were created to protect against XSS
- **Validation**: Comprehensive validation for all user inputs (titles, content, comments) was created
- **Permissions**: Permission mechanism implemented to prevent users from editing or deleting others' posts
- **Tests**: Unit tests created to verify security functions
- **Security Documentation**: Created `SECURITY_SUMMARY_FORUM.md` document explaining security measures

**Added Value**:
- Forum built with security from the start
- Avoided common vulnerabilities thanks to AI recommendations
- Time saved in identifying and fixing security bugs

**Files Created/Modified**:
- `server/src/routes/forum.js`
- `server/src/middleware/validation.js`
- `server/src/lib/sanitize.js`
- `SECURITY_SUMMARY_FORUM.md`

---

## Case 3: Database Schema Migration and Updates

### Problem/Task
During development, new fields needed to be added to existing models (like `bio`, `avatarUrl` to the User model). There was an issue when users received errors about columns that didn't exist in the database.

### AI Tool Used
- **GitHub Copilot Chat** - for solving migration issues
- **ChatGPT** - for explaining Prisma migrations and best practices

### Main Prompt
```
"I'm getting an error: 'column users.bio does not exist' in PostgreSQL.
My Prisma schema has been updated with new fields but the database wasn't synced.

Current setup:
- PostgreSQL database
- Prisma ORM
- Development environment
- New fields: bio, avatarUrl, location in User model

What's the safest way to sync the database schema without losing data?
Please provide:
1. Step-by-step migration commands
2. A script to automate the process
3. Rollback strategy if something goes wrong"
```

### How AI Advanced the Project
- **Automation Scripts**: Created scripts (`sync-database.sh` and `sync-database.bat`) for quick synchronization
- **Clear Documentation**: Created `DATABASE_MIGRATION.md` explaining the migration process
- **Prisma Commands**: Explained when to use `prisma migrate dev` versus `prisma db push`
- **Error Prevention**: Documentation helped prevent future synchronization errors
- **Error Handling**: Added clear error messages with solution guidance

**Result**:
- Students can quickly resolve schema issues
- Smoother development process
- Fewer issues in development environment

**Files Created/Modified**:
- `sync-database.sh`
- `sync-database.bat`
- `DATABASE_MIGRATION.md`
- `README.md` (added troubleshooting instructions)

---

## Case 4: Automated Testing and Testing Guide

### Problem/Task
There were no automated tests for newly developed features. Tests needed to be created (unit tests and integration tests) to ensure code works as expected and prevent regressions (bugs) in the future.

### AI Tool Used
- **GitHub Copilot** - for creating tests
- **ChatGPT** - for understanding best practices in test writing

### Main Prompt
```
"Create comprehensive tests for a Node.js/Express API with the following endpoints:
- POST /api/summaries (file upload to Azure)
- GET /api/summaries (list all summaries)
- POST /api/forum/posts (create forum post)
- POST /api/forum/comments (add comment)

Requirements:
- Use Jest as testing framework
- Mock Azure Blob Storage
- Mock Prisma database
- Test authentication/authorization
- Test input validation
- Test error handling
- Test file upload limits

Please provide:
1. Test setup and configuration
2. Unit tests for each endpoint
3. Mock implementations
4. Testing guide documentation"
```

### How AI Advanced the Project
- **Unit Tests**: Comprehensive tests created for every API endpoint
- **Mocking**: Mock objects created to isolate external dependencies (Azure, Database)
- **Code Coverage**: Achieved over 80% code coverage in tests
- **CI/CD**: Tests automatically run on every push in GitHub Actions
- **Documentation**: Created `TESTING_GUIDE.md` with explanations on running tests

**Benefits**:
- Early bug detection in development process
- Confidence in code changes (refactoring)
- Living documentation of how the API should work

**Files Created/Modified**:
- `server/tests/summaries.test.js`
- `server/tests/forum.test.js`
- `server/tests/setup.js`
- `TESTING_GUIDE.md`

---

## Case 5: User Interface with React and TypeScript

### Problem/Task
Creating a modern and responsive user interface for the application. The challenge was understanding how to work with React 18, TypeScript, Vite, TailwindCSS, and shadcn/ui together.

### AI Tool Used
- **GitHub Copilot** - for React component code completion
- **ChatGPT** - for explaining TypeScript types and React hooks

### Main Prompt
```
"Create a modern React TypeScript component for a summaries page with:
- List view and card view toggle
- Search and filter functionality
- Sort by date/rating/downloads
- Pagination
- Loading states
- Error handling
- Responsive design (mobile-first)

Tech stack:
- React 18 with TypeScript
- TailwindCSS for styling
- shadcn/ui components
- React Query for data fetching

Please provide:
1. TypeScript interfaces for data types
2. React component with hooks (useState, useEffect)
3. Search and filter logic
4. Responsive CSS classes
5. Error boundaries"
```

### How AI Advanced the Project
- **Components**: Clean and reusable React components were created
- **TypeScript**: Correct interfaces and types were created that prevent bugs
- **UI/UX**: Modern and user-friendly design was implemented
- **Accessibility**: Generated code included ARIA labels and accessibility support
- **Learning**: Students learned best practices for writing modern React

**Features Added**:
- Summaries page with search and filter
- User profile page with editing capability
- Forum with nested comments
- File upload system with drag & drop
- Success/error notifications (toasts)

**Files Created/Modified**:
- `client/src/pages/SummariesPage.tsx`
- `client/src/pages/ProfilePage.tsx`
- `client/src/pages/ForumPage.tsx`
- `client/src/components/` (various components)

---

## Summary and Lessons Learned

### Overall Benefits from AI Usage

1. **Time Savings**: The project was completed faster thanks to AI usage
2. **Code Quality**: Generated code was organized, documented, and followed best practices
3. **Fast Learning**: Learned new technologies (Azure, Prisma, TypeScript) quickly
4. **Fewer Bugs**: AI helped identify and prevent common bugs upfront
5. **Security**: Received important security recommendations we wouldn't have thought of

### Principles Learned

- **Don't Rely Blindly on AI**: All code was carefully reviewed and tested
- **Deep Understanding**: We learned every piece of code that AI generated
- **Smart Integration**: Used AI as an assistant, not as a replacement for thinking
- **Full Control**: All architectural and technical decisions were ours

### Continued Usage

We continue to use AI in the project:
- For code review
- For writing documentation
- For solving bugs
- For learning new technologies

---

## Metadata

- **Last Updated**: January 2026
- **Project Team**: StudyHub-IL Development Team
- **AI Tools Used**: GitHub Copilot, ChatGPT-4, Claude
- **Created For**: Software Engineering Course, Hebrew University of Jerusalem

---

**Note**: This document is continuously updated as additional AI tools are used in the project.
