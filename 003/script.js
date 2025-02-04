/**
 * Make "Top" a regular button, and hide "Bottom"
 */
communityIdeas[communityIdeas.length] = (() => {
    const baseurl = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf("/"));
    let linkTop, linkBottom, linkInner, jumpNav, linkTopParent;
    let o = {
        name: "Change top button to text",
        load: () => {
            linkTop = document.querySelector("a.jump-top");
            linkBottom = document.querySelector("a.jump-bottom");
            jumpNav = document.querySelector("#jump-nav");
            if (linkTop) {
                linkTopParent = linkTop.parentNode;
                linkInner = linkTop.innerHTML;
                return true;
            } else {
                return false;
            }
        },
        activate: () => {
            let li = document.createElement("li");
            jumpNav.insertBefore(li, jumpNav.firstElementChild);
            li.appendChild(linkTop);
            linkTop.innerHTML = "Top";
            linkBottom.style.display = "none";
        },
        deactivate: () => {
            linkTop.parentNode.parentNode.removeChild(linkTop.parentNode);
            linkTopParent.insertBefore(linkTop, linkBottom);
            linkTop.innerHTML = linkInner;
            linkBottom.style.display = null;
        },
    };
    return o;
})();
