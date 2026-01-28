# TODO: Implement Dashboard Redirection After Authentication

- [x] Update app/auth/page.jsx to add useEffect for auth state change listener and redirect to '/dashboard' upon successful sign-in
- [x] Create auth/callback/page.jsx to handle OAuth callback and redirect to dashboard
- [x] Update signInWithGoogle to use redirectTo '/auth/callback'

# TODO: Fix Meeting Ejection Issue in AI Interview

- [x] Add error event listener to Vapi instance in app/interview/[interview_id]/start/page.jsx to capture and log errors
- [x] Fix typo in handleMessage function (conersation -> conversation)
- [x] Update cleanup function to remove error event listener
- [x] Handle 'ejected' error type specifically to generate feedback and redirect
