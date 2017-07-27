# Readme Kanban Board

Write a markdown based kanban board in your **README.md** and have it converted to an image and injected in.

## Example

In your **README.md**, simply have a commented section like this, in the format:

    <!---KANBAN
    # Doing
    - This thing

    # Done
    - That thing
    - Another thing
    KANBAN--->

Which generates:

![created by readme-kanban-board](http://i.imgur.com/ajxs7fI.jpg)
<!---KANBAN
# Doing
- This thing

# Done
- That thing
- Another thing
KANBAN--->

## Install

    npm i readme-kanban-board

## Usage

Add it to package.json scripts, similar to:

    "scripts": {
      "readme-kanban-board": "readme-kanban-board"
    }

Then fire it up by running:

    npm run readme-kanban-board
