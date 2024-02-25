# Zak Yeomanson's PowerShell Portfolio

Hello! 👋 I'm Zak Yeomanson <br>
This is a personally designed website that simulates a terminal interface in the web. I use this simulation as an interface for my portfolio, providing a unique experience.

The interface allows users to enter commands using the Enter key and view them as part of the terminal history. By entering commands, you may navigate my portfolio or have fun trying the commands I've implemented.

Some of the commands ping an external API, hosted on AWS, which call internal lambdas. The code for these resources can be found in `/cloud-resources`

## Features

- Custom Terminal UI with a blinking caret
- Input field for command entry
- Display area for previous commands
- `help` command -> View existing commands
- `cd` command -> Change directory
- `projects` command -> View my recent projects on Github
- Help button (brings up help modal once pressed)

## Planned Features

- New commands:
  - `experience` -> Show my work history & experience
  - `links` -> Links to GitHub, LinkedIn, etc.
  - `mkdir` -> Make a directory
  - `open` -> Open a URL
- Command aliases (multiple command names for a single command)
- Terminal themes
- Swap operating systems e.g: Ubuntu, MacOS
- Swap from block caret to line caret

## Usage & Installation

If you wish to load this project locally, you must run the following commands:

```
git clone https://github.com/ZakYeo/website_portfolio.git
cd website_portfolio
npm install
npm start
```
