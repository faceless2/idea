/**
 * Move "Help cousins"
 */
communityIdeas[communityIdeas.length] = (() => {
    const baseurl = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf("/"));
    let footnote, cousins, cousinsParent, cousinsNextSibling, button;
    let o = {
        name: "Move \"help cousins\"",
        load: () => {
            footnote = document.querySelector("aside.footnote");
            cousins = footnote.nextElementSibling;
            while (cousins && !cousins.textContent.includes("Help cousins find this profile")) {
                cousins = cousins.nextElementSibling;
            }
            if (cousins) {
                cousinsParent = cousins.parentNode;
                cousinsNextSibling = cousins.nextSibling;
            }
            button = footnote.querySelector("button.btn-utility");
            return footnote && cousins;
        },
        activate: () => {
            footnote.lastElementChild.appendChild(cousins);
            cousins.classList.add("float-lg-end");
            button.style.marginRight = 0;
            return true;
        },
        deactivate: () => {
            cousinsParent.insertBefore(cousins, cousinsNextSibling);
            cousins.classList.remove("float-lg-end");
            button.style.marginRight = null;
        },
    };
    return o;
})();
