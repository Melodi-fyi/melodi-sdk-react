# melodi-sdk-react

A small sdk for adding Melodi's feedback react component to your app. The feedback widget lets you add thumbs up/thumbs down buttons anywhere in your app and a popover to record feedback from your users about your llm generated text. You can view responses in the Feedback Inbox in your Melodi account.

![Screenshot of positive feedback](https://github.com/Melodi-fyi/melodi-sdk-react/blob/main/screenshots/positive-feedback-screenshot.png) ![Screenshot of negative feedback](https://github.com/Melodi-fyi/melodi-sdk-react/blob/main/screenshots/negative-feedback-screenshot.png)

> [!NOTE]
> This library has `react` and `react-dom` (both v18.2 or higher) as peer dependencies.

## Getting started

### To add the melodi widget to your react app, follow these simple steps:

1. Install the library
   `npm install @melodi/melodi-sdk-react`

2. Get a publishable API key from your Melodi Account.

   - Log into your Melodi account and go to [settings](https://app.melodi.fyi/admin/settings).
   - Click "Create publishable api key"
   - Copy the newly created key

3. Add the MelodiAuthProvider with your api key

```
<MelodiAuthProvider apiKey="YOUR_API_KEY_HERE">
  {children}
</MelodiAuthProvider>
```

4. Add the MelodiFeedbackWidget and pass along the relevant info

```
<MelodiFeedbackWidget
  sample={{
    input: userSubmittedText,
    output: aiGeneratedText,
  }}
  userInfo={
    id: user.id,
    email: user.email
  }
/>
```

5. See feedback as it comes into your [Feedback Inbox](https://app.melodi.fyi/admin/feedback-inbox)

## MelodiFeedbackWidget props

View the type definitions [here](https://github.com/Melodi-fyi/melodi-sdk-react/blob/main/src/components/feedback/MelodiFeedbackWidget.types.ts#L16-L20). More information about each prop below.

## Company Name

The companyName prop can optionally be passed to `MelodiFeedbackWidget` and will be shown in the popover.

![Company name highlighted in feedback popover](https://github.com/Melodi-fyi/melodi-sdk-react/blob/main/screenshots/company-name-highlighted.png)

### UserInfo

The following fields can be provided on the `userInfo` prop which is passed to `MelodiFeedbackWidget`

`id`: (optional) an identifier for this user in your system.

`email`: (required if userInfo is specified) the user's email. Will be visible in the Feedback Inbox.

View the type definition [here](https://github.com/Melodi-fyi/melodi-sdk-react/blob/main/src/components/feedback/MelodiFeedbackWidget.types.ts#L11-L14)

### Sample

The following fields can be provided on the `sample` prop which is passed to `MelodiFeedbackWidget`

`ouptut`: (required) The llm generated response.

`project`: (optional) Name of the Melodi project where this feedback will be associated. A new project will be created if it is not found. There will be an error if the project has been deleted.

`projectVersion`: (optional) Name of the associated version. Only pass this if `project` is also being passed. A new version will be created if it is not found. There will be an error if this version has been deleted.

`input`: (optional) The user input that was used to generate the llm response.

`metadata`: (optional) arbitrary json object for your own metadata or context. Will be visible in the Feedback Inbox

View the type definition [here](https://github.com/Melodi-fyi/melodi-sdk-react/blob/main/src/components/feedback/MelodiFeedbackWidget.types.ts#L3-L9)
