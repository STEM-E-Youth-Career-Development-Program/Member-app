(WIP)  
Commands for Mac (Terminal) and Windows (Powershell) (Use powershell, not cmd):
<ul>
    <li>tab autocompletes, so use that a lot</li>
    <li>cd (directory): navigates to directory, use cd .. to return to previous directory</li>
    <li>sudo (command) if a command requires "elevated permissions" or something</li>
    <li>chmod -R a+rwX (directory): allows ALL users to read/write/execute everything in the directory. Only use on a personal computer. If you care about security a lot feel free to recommend or find any alternatives. This is just the crudest and simplest method</li>
</ul>

Setting up GitHub:
<ol>
    <li>Message a team lead (Prajwala, Prasad) with your email so we can add you to the GitHub</li>
    <li>Download Git, google "Git" and you should see the site, default settings should be fine, Mac users need to use Homebrew. Linux users I'm assuming you know how to do this already.</li>
    <li>Open VSCode or whatever IDE you use, the rest of the tutorial will follow VSCode.</li>
    <li>Click the little person icon on the bottom left, check that you're signed in to GitHub, sign in if you're not.</li>
    <li>Go to this respository, click the green "Code" button, and copy the link under the HTTPS tab.</li>
    <li>Naviagte to the folder you want the Member-app repo to be in (the folder will be created, so don't need to create a separate Member App folder)</li>
    <li>Open terminal in the folder, and run git clone https://github.com/STEM-E-Youth-Career-Development-Program/Member-app.git</li>
    <li>Congrats. Navigate to VSCode's source control, click the three dots, and click "Pull" just to test. Restart VSCode if necessary.</li>Message a team lead (Prasad, Prajwala) with your email so we can add you to the GitHub</li>
</ol>

Instructions for initializing React Native project:
<ol>
    <li>If instructions unclear or don't work, message team leads (Prajwala and Prasad) or Google it  </li>
    <li>Install node js </li>
    <li>Install node package manager (npm) </li>
    <li>Navigate to the Member-app directory</li>
    <li>Run npm install</li>
    <li>Set up Android Emulator and install Expo Go on it (or install Expo Go on your phone, either should work unless for some reason your computer and phone are connected to different wifis)</li>
    <li>Run npm start</li>
    <li>In Expo Go, type the ip address that should show in the terminal after running npm start </li>
    <li>The app should auto update every time you change the code and save it</li>  
</ol>
