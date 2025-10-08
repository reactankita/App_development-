todolist - a tiny React Native (Expo) app for beginners

What I made for you (simple words):
- A folder called `todolist` with the code for a small app.
- The app shows a list of tasks. You can add tasks, tap to mark done, and remove them.

How to run it (step-by-step, like for beginners):

1) Install Node.js (if you don't have it):
   - Go to https://nodejs.org and download the LTS version, then install it.

2) Fix PowerShell script blocking (you saw this earlier). Open PowerShell as Administrator and run:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope LocalMachine
```

When it asks, type `Y` and press Enter. Then close that admin window.

3) From a normal PowerShell (not admin), go to the project folder and install packages:

```powershell
cd C:\Users\sutar\Desktop\lab\APP_DEV\exp5\todolist
npm install
```

4) Start the app with Expo:

```powershell
npx expo start
```

- This opens a browser with the Expo dev tools and a QR code.
- Install the Expo Go app on your phone and scan the QR code to open the app.
- Or press `a` in the terminal to try an Android emulator (if you have one), or `i` for iOS simulator on macOS.

Notes for beginners (kid-friendly):
- "npm install" downloads helpers your app needs.
- "npx expo start" runs a little server that talks to your phone or emulator.
- If anything shows an error, copy the error and ask me — I will help fix it.

Quick checklist I did for you:
- Created `App.js` with a working to-do UI.
- Created `package.json` and `app.json` for Expo.
- Added `.gitignore`.
- Wrote this `README.md` with the exact PowerShell commands you need.

If you want, I can now run the PowerShell commands here to finish setup (if you want me to), or walk you through running them step-by-step.
