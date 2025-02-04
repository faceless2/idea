/**
 * Move the "expand ancestor tree" buttons"
 */
communityIdeas[communityIdeas.length] = (() => {
    const baseurl = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf("/"));
    let link;
    let o = {
        name: "Move \"more ancestors\" icons",
        load: () => {
            link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = baseurl + "/style.css";
            return true;
        },
        activate: () => {
            document.head.appendChild(link);
        },
        deactivate: () => {
            document.head.removeChild(link);
        },
    };
    return o;
})();
