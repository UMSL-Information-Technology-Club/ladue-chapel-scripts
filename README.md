# Ladue Chapel - Scripts Project

This is a Google App Scripts project for automating certain tasks in google spreadsheets for the ladue chapel church. 

### Objectives

Still figuring this out. Currently we want to:
- Programmatically create new tabs with a google sheets, named after a given organization when a google form is submitted.  
- Loop / Iterate over all of the rows in the spreadsheet, so that various operations can be done.  
- ...

### Setting Up

To develop this project locally, please use `clasp` by google.  
([see documentation](https://developers.google.com/apps-script/guides/clasp))  

`npm install --global @google/clasp`

If you don't have `node` or `npm` a.k.a. Node Package Manager installed, [see here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
- I recommend using the `nvm` method, short for Node Version Manager. It will install Node, Npm, and Npx for you.  

`clasp --version` To make sure you have it installed.  

`clasp login` To make sure you are logged in to your umsl account  

### Contributing

**If cloning the project from Google**  
`clasp clone <scriptId>` Where `<scriptId>` can be found at `file/project properties/info` in google app scripts editor.  

**If using github to work on the project**  
1. Clone the repository  
`git clone https://github.com/UMSL-Information-Technology-Club/ladue-chapel-scripts.git` (or use ssh)  

2. Either make your file changes to a new file, or create a new branch  
`git branch <new-branch-name>` to create a new branch  

3. To test your code on google scripts, use `clasp`:  
`clasp open`  will open the scripts in the Google App Scripts code editor in the browser  

4. To save / commit your changes to github:  
`git add .` and `git commit -m"<your-short-descriptive-message>"`  

**If the project has alredy been cloned from GitHub:**  
`git pull` first, and then you are ready to make changes!  


### Feedback

To be announced.
