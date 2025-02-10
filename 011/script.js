/**
 * Make Tree Apps first-class citizens
 */
communityIdeas[communityIdeas.length] = (() => {
    const baseurl = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf("/"));
    let link, hoverFunc;
    let o = {
        name: "Scrolling tree-app support",
        load: () => {
            link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = baseurl + "/style.css";
            hoverFunc = (e) => {
                console.log("HERE: e="+e.type);
                e.target.classList.toggle("hover", e.type == "mouseenter");
            };
            return document.body.classList.contains("tree-apps");
        },
        activate: () => {
            document.head.appendChild(link);
            document.querySelector("#footer").addEventListener("mouseenter", hoverFunc);
            document.querySelector("#footer").addEventListener("mouseleave", hoverFunc);
            document.documentElement.classList.add("main-scrolls");
            return true;

        },
        deactivate: () => {
            document.head.removeChild(link);
            document.querySelector("#footer").removeEventListener("mouseenter", hoverFunc);
            document.querySelector("#footer").removeEventListener("mouseleave", hoverFunc);
            document.documentElement.classList.remove("main-scrolls");
        },
    };
    return o;
})();
