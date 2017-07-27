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

![created by readme-kanban-board](http://i.imgur.com/Uy9NZrC.jpg)
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

## Yes that's all well and good, but what does it actually _do_?

- Finds kanban code in your README.md file
- Parses it up
- Generates a kanban board of it with HTML/CSS
- Creates a screenshot of said HTML
- Uploads that image to imgur
- Injects/updates an image link in your README.md
