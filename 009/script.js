/**
 * Move the "expand ancestor tree" buttons"
 */
communityIdeas[communityIdeas.length] = (() => {
    const baseurl = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf("/"));
    let link, placeBox, nameBox, bornBox, diedBox, copyBox, rightBox;
    let o = {
        name: "Compact: full birth/death in header",
        load: () => {
            link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = baseurl + "/style.css";
            h1 = document.querySelector("#person h1[itemprop=\"name\"]");
            document.querySelectorAll("#familyVitals p.VITALS").forEach((e) => {
                if (!nameBox) {
                    nameBox = e;
                } else if (e.textContent.startsWith("Born")) {
                    bornBox = e;
                } else if (e.textContent.startsWith("Died")) {
                    diedBox = e;
                }
            });
            copyBox = document.querySelector("#person .copy--buttons");
            rightBox = document.querySelector("#person .page--title > :first-child");
            return h1 && copyBox && rightBox;
        },
        activate: () => {
            document.head.appendChild(link);
            if (!placeBox) {
                placeBox = document.createElement("div");
            }
            h1.parentNode.insertBefore(placeBox, h1.nextElementSibling);
            rightBox.appendChild(copyBox);
            if (bornBox) {
                placeBox.appendChild(bornBox);
            }
            if (diedBox) {
                placeBox.appendChild(diedBox);
            }
            return true;
        },
        deactivate: () => {
            document.head.removeChild(link);
            placeBox.parentNode.insertBefore(copyBox, placeBox);
            placeBox.parentNode.removeChild(placeBox);
            if (diedBox) {
                nameBox.parentNode.insertBefore(diedBox, nameBox.nextSibling);
            }
            if (bornBox) {
                nameBox.parentNode.insertBefore(bornBox, nameBox.nextSibling);
            }
        },
    };
    return o;
})();
