/**
 * Count comments and sources and put the count in the links
 */
communityIdeas[communityIdeas.length] = (() => {
    const baseurl = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf("/"));
    let commentCount = 0, sourceCount = 0;
    let o = {
        name: "Count sources and comments",
        load: () => {
            sourceCount = 0;
            commentCount = 0;
            let elt = document.querySelector("#Sources");
            if (elt) {
                elt = elt.nextElementSibling;
                while (elt && !elt.classList.contains("EDIT")) {
                    if (elt.tagName == "OL" || elt.tagName == "UL") {
                        elt.querySelectorAll(":scope > li").forEach((e) => {
                            sourceCount++;
                        });
                    }
                    elt = elt.nextElementSibling;
                }
                document.querySelectorAll("#comments.container .comment").forEach((e) => {
                    commentCount++ 
                });
                return true;
            }
            return false;
        },
        activate: () => {
            document.querySelector("a[href=\"#Comments\"]").innerHTML = "Comments (" + commentCount + ")";
            document.querySelector("a[href=\"#Sources\"]").innerHTML = "Sources (" + sourceCount + ")";
        },
        deactivate: () => {
            document.querySelector("a[href=\"#Comments\"]").innerHTML = "Comments";
            document.querySelector("a[href=\"#Sources\"]").innerHTML = "Sources";
        },
    };
    return o;
})();
