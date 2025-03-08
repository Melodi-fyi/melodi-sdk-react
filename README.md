# Melodi SDK for React: Comprehensive User Guide

Melodi is a feedback and monitoring tool designed to collect and analyze user feedback on AI-generated content in your React applications. This comprehensive guide will walk you through setting up and using the Melodi SDK in your React projects.

## Table of Contents

1. [Introduction to Melodi](#1-introduction-to-melodi)
2. [Quick Start Guide](#2-quick-start-guide)
3. [Installation](#3-installation)
4. [Authentication and Configuration](#4-authentication-and-configuration)
5. [Components Overview](#5-components-overview)
6. [Implementing the Feedback Widget](#6-implementing-the-feedback-widget)
7. [Advanced Usage](#7-advanced-usage)
8. [API Reference](#8-api-reference)
9. [Troubleshooting](#9-troubleshooting)
10. [Resources](#10-resources)

## 1. Introduction to Melodi

Melodi is a specialized tool that allows you to collect feedback on AI-generated content in your applications. With Melodi's React SDK, you can easily integrate feedback collection mechanisms (like thumbs up/down buttons or flag options) into your app, enabling users to provide feedback on specific AI responses or content.

The collected feedback is organized in your Melodi dashboard, where you can analyze user sentiment, identify improvement areas, and monitor AI performance over time.

## 2. Quick Start Guide

Here's how to quickly add Melodi feedback widgets to your React application:

```jsx
import React from 'react';
import { MelodiAuthProvider, MelodiFeedbackWidget } from '@melodi/melodi-sdk-react';

function App() {
  return (
    <MelodiAuthProvider apiKey="your-melodi-api-key">
      <div className="your-ai-response-container">
        <p>This is an AI-generated response...</p>
        
        {/* Add the feedback widget */}
        <MelodiFeedbackWidget 
          associatedThread={{ externalThreadId: "conversation-123" }} 
          variant="thumbs" 
        />
      </div>
    </MelodiAuthProvider>
  );
}

export default App;
```

## 3. Installation

### Prerequisites

- React 18.2.0 or higher
- React DOM 18.2.0 or higher
- Node.js and npm/yarn

### Install the package

```bash
# Using npm
npm install @melodi/melodi-sdk-react

# Using yarn
yarn add @melodi/melodi-sdk-react
```

## 4. Authentication and Configuration

### Obtaining an API Key

1. Sign up for an account on [Melodi](https://melodi.fyi)
2. Navigate to the API Settings page in your dashboard
3. Generate a new API key for your project

### Setting Up the Auth Provider

Wrap your application (or the parts that use Melodi) with the `MelodiAuthProvider`:

```jsx
import { MelodiAuthProvider } from '@melodi/melodi-sdk-react';

function App() {
  return (
    <MelodiAuthProvider apiKey="your-melodi-api-key">
      {/* Your app components */}
    </MelodiAuthProvider>
  );
}
```

The `MelodiAuthProvider` makes your API key available to all Melodi components within its scope.

## 5. Components Overview

### MelodiAuthProvider

A context provider that shares authentication credentials with child components:

```jsx
<MelodiAuthProvider apiKey="your-api-key">
  {/* Child components */}
</MelodiAuthProvider>
```

### MelodiFeedbackWidget

The main component for collecting user feedback, with two display variants:

- **Thumbs Variant**: Displays thumbs up/down buttons
- **Flag Variant**: Displays a single flag icon for reporting issues

## 6. Implementing the Feedback Widget

### Basic Implementation

```jsx
<MelodiFeedbackWidget 
  associatedThread={{ externalThreadId: "conversation-123" }} 
  variant="thumbs" 
/>
```

### Associating Feedback with Conversations

The `associatedThread` prop is required and links the feedback to a specific conversation:

```jsx
// Option 1: Associate with an external thread ID
<MelodiFeedbackWidget 
  associatedThread={{ 
    externalThreadId: "your-thread-id",
    projectId: 123, // optional
    projectName: "Project Name" // optional
  }} 
/>

// Option 2: Associate with a specific message in a thread
<MelodiFeedbackWidget 
  associatedThread={{ 
    externalThreadId: "your-thread-id",
    externalMessageId: "your-message-id",
    projectId: 123, // optional
    projectName: "Project Name" // optional
  }} 
/>
```

### Including User Information

You can optionally include user information with feedback:

```jsx
<MelodiFeedbackWidget 
  associatedThread={{ externalThreadId: "conversation-123" }} 
  userInfo={{
    externalUserId: "user-123",
    email: "user@example.com", // optional
    name: "John Doe" // optional
  }}
  variant="thumbs" 
/>
```

### Choosing a Feedback Variant

```jsx
// Thumbs up/down variant
<MelodiFeedbackWidget 
  associatedThread={{ externalThreadId: "conversation-123" }} 
  variant="thumbs" 
/>

// Flag variant
<MelodiFeedbackWidget 
  associatedThread={{ externalThreadId: "conversation-123" }} 
  variant="flag" 
/>
```

### Adding Company Branding

```jsx
<MelodiFeedbackWidget 
  associatedThread={{ externalThreadId: "conversation-123" }} 
  companyName="Your Company Name" 
  variant="thumbs" 
/>
```

## 7. Advanced Usage

### Integration with AI Conversation Flows

```jsx
function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(generateUniqueId());
  
  const sendMessage = async (userMessage) => {
    // Add user message to state
    const newMessage = { id: generateUniqueId(), content: userMessage, sender: 'user' };
    setMessages([...messages, newMessage]);
    
    // Call your AI API
    const aiResponse = await callAIService(userMessage, conversationId);
    
    // Add AI response to state
    const aiMessage = { id: generateUniqueId(), content: aiResponse, sender: 'ai' };
    setMessages([...messages, aiMessage]);
  };
  
  return (
    <div className="chat-container">
      {messages.map(message => (
        <div key={message.id} className={`message ${message.sender}`}>
          <p>{message.content}</p>
          
          {/* Only add feedback widget to AI messages */}
          {message.sender === 'ai' && (
            <MelodiFeedbackWidget 
              associatedThread={{ 
                externalThreadId: conversationId,
                externalMessageId: message.id 
              }} 
              variant="thumbs" 
            />
          )}
        </div>
      ))}
    </div>
  );
}
```

## 8. API Reference

### MelodiAuthProvider Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| apiKey | string | Yes | Your Melodi API key |
| children | ReactNode | Yes | Child components |

### MelodiFeedbackWidget Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| associatedThread | AssociatedThreadOrIds | Yes | Thread or message information |
| variant | 'thumbs' \| 'flag' | No | Display style (default: 'thumbs') |
| companyName | string | No | Company name for branding |
| userInfo | CreateExternalUserRequest | No | User information |

#### AssociatedThreadOrIds Types

```typescript
// Thread association
type AssociatedExternalThreadId = {
  externalThreadId: string;
  projectId?: number;
  projectName?: string;
};

// Message association
type AssociatedExternalMessageId = {
  externalThreadId: string;
  externalMessageId: string;
  projectId?: number;
  projectName?: string;
};
```

#### CreateExternalUserRequest Type

```typescript
type CreateExternalUserRequest = {
  externalUserId: string;
  email?: string;
  name?: string;
};
```

## 9. Troubleshooting

### Common Issues

1. **Feedback Widget Not Showing**
   - Ensure the `MelodiAuthProvider` is properly set up with a valid API key
   - Check that the widget is placed within the AuthProvider's scope
   - Verify that `associatedThread` contains the required fields

2. **Authentication Errors**
   - Confirm your API key is valid and active
   - Ensure you're using the correct API key for your environment

3. **Styling Conflicts**
   - Melodi uses prefixed CSS classes (`melodi-`) to avoid conflicts
   - If styling issues persist, check your CSS for conflicting rules

### Debugging

The Melodi SDK doesn't log to the console by default. If you're experiencing issues, check your network requests to the Melodi API for error responses.

## 10. Resources

- [Official Documentation](https://docs.melodi.fyi)
- [GitHub Repository](https://github.com/Melodi-fyi/melodi-sdk-react)
- [API Reference](https://docs.melodi.fyi/api-reference)
- [Support](mailto:info@melodi.fyi)

---

This guide should help you get started with the Melodi SDK for React and implement feedback collection in your application. For additional support or questions, refer to the official documentation or contact Melodi's support team.
