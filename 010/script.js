/**
 * Make Tree Apps first-class citizens
 */
communityIdeas[communityIdeas.length] = (() => {
    const baseurl = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf("/"));
    let link, button, tab;
    let o = {
        name: "Integrated tree-apps",
        load: () => {
            link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = baseurl + "/style.css";
            return document.querySelector("#familyVitals") != null;
        },
        activate: () => {
            document.head.appendChild(link);
            if (!button) {
                button = document.createElement("button");
                button.classList.add("nav-link");
                button.id = "familyTreeApps-tab";
                button.setAttribute("data-bs-toggle", "tab");
                button.setAttribute("data-bs-toggle", "tab");
                button.setAttribute("data-bs-target", "#familyTreeApps");
                button.setAttribute("role", "tab");
                button.setAttribute("aria-controls", "familyTreeApps");
                button.appendChild(document.createTextNode("Tree Apps"));

                tab = document.createElement("div");
                tab.id="familyTreeApps";
                tab.classList.add("tab-pane");
                tab.classList.add("fade");
                tab.setAttribute("role", "tabpanel");
                tab.setAttribute("tabindex", "0");
                // Argh. Surely a "selectTab" method is required?
                // Going to rely on CSS
                tab.innerHTML = "<section>This idea is not fully fleshed out, but maybe integrating some tree apps here would be good?<br/><br/>Say, using an iframe taking up either the rest of the page (as shown), or with the regular biography/footer etc below?</section>"
            }

            new bootstrap.Tab(tab);
            let e = document.querySelector("#familyDescendants");
            e.parentNode.insertBefore(tab, e.nextSiblingElement);
            e = document.querySelector("#familyDescendants-tab");
            e.parentNode.insertBefore(button, e.nextSiblingElement);
            return true;
        },
        deactivate: () => {
            document.head.removeChild(link);
            button.parentNode.removeChild(button);
            tab.parentNode.removeChild(tab);
        },
    };
    return o;
})();
