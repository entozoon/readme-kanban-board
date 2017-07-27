# Readme Kanban Board

Write a markdown based kanban board in your **README.md** and have it converted to an image and injected in.

## Install

    npm i readme-kanban-board

## Usage

Add it to package.json scripts, similar to:

    "scripts": {
      "readme-kanban-board": "readme-kanban-board"
    }

Then fire it up by running:

    npm run readme-kanban-board


## Kanban Markdown Formatting

In your **readme.md**, simply have a commented section in this format:

    <!---KANBAN
    # Doing
    - This thing

    # Done
    - That thing
    - Another thing
    KANBAN--->
