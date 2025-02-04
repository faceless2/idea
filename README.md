# Some ideas for an unnamed website

This repository is a means of testing some ideas on an unnamed website.
The ideas are all about restyling elements or moving them around in the DOM.

## How it works
Adding the "loader" script to the page will add two elements to the document:
* a red "lightbulb" icon pinned to the bottom-left of the page
* a panel pinned to the left of the page which can be toggled open/close by clicking the lightbulb

The loader will then proceeed to load the "ideas", starting with `000/script.js`, then `001/script.js`
and so on until it hits a 404. Each idea is simply an object which has an "activate" function to apply
it to the DOM, and "deactivate" button to restored things back to how they were.

Which ideas are currently activated is stored in local storage, so they will be maintained over page
loads and navigation.

The "?" button next to each idea's name will give more detail on the idea.

The ideas are maintained in github at https://github.com/faceless2/idea, and any checkins to that
repository are immediately mirrored to https://bremford.org/idea, where the content is served from.


# How to load the loader
To load the ideas manually, open the website and paste this into the console
```
(()=>{let s = document.createElement("script"); s.src = "https://bremford.org/idea/loader.js"; document.head.appendChild(s); })()
```
Obviously this will have to be done each time the page is loaded

To load the ideas automatically, add this to the document head
```
<script src="https://bremford.oorg/idea/loader.js"></script>
```
