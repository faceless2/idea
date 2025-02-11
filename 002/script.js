/**
 * Move the "Profile Manager" box to the right column
 *
 * This does some restyling of the profile manager box too, to make it fit.
 * If this suggestion was adopted that restyling could certainly be done in a simpler way
 */
communityIdeas[communityIdeas.length] = (() => {
    const baseurl = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf("/"));
    let footnote, footnoteParent, footnoteNext, rightcolumn;
    let row, problemsOrQuestionsBox, profileManagerBox, editsBox, helpCousinsBox, helpCousinsParent, helpCousinsNext, biography;

    let o = {
        name: "Move \"profile manager\" to right",
        load: () => {
            footnote = document.querySelector("aside.footnote");
            rightcolumn = document.querySelector("#main > * > * > div.col-lg-4");
            if (footnote && rightcolumn) {
                footnoteParent = footnote.parentNode;
                footnoteNext = footnote.nextSibling;

                biography = document.getElementById("Biography");
                row = footnote.querySelector("div.row");
                footnote.querySelectorAll("*").forEach((e) => {
                    if (e.tagName == "BUTTON" && e.getAttribute("data-bs-target") == "#privacyModal") {
                        problemsOrQuestionsBox = e.parentNode;
                        problemsOrQuestionsParent = problemsOrQuestionsBox.parentNode;
                        problemsOrQuestionsNext = problemsOrQuestionsBox.nextSibling;
                    } else if (e.title == "The manager cares for the profile and leads the collaboration") {
                        profileManagerBox = e.parentNode.parentNode;
                    } else if (e.firstChild && e.firstChild.nodeValue && e.firstChild && e.firstChild.nodeValue.includes(" created ")) {
                        timestampBox = e;
                    } else if (e.id == "Edits") {
                        editsBox = e.parentNode;
                    } else if (e.firstChild && e.firstChild.nodeValue && e.firstChild.nodeValue.includes(" cousins find this ")) {
                        helpCousinsBox = e.parentNode;
                    }
                });
                if (!helpCousinsBox) {
                    footnote.parentNode.querySelectorAll(".SMALL *").forEach((e) => {
                        console.log(e);
                        if (e.firstChild && e.firstChild.nodeValue && e.firstChild.nodeValue.includes(" cousins find this ")) {
                            helpCousinsBox = e.parentNode;
                        }
                    });
                }
                return problemsOrQuestionsBox && profileManagerBox && biography;
            } else {
                return false;
            }
        },
        activate: () => {
            rightcolumn.insertBefore(footnote, rightcolumn.firstElementChild);
            // Bit more involved. We need to restyle the content of this box
            // to make it nicer in a narrow column
            biography.classList.add("mt-0");
            footnote.classList.add("mb-3");
            profileManagerBox.classList.remove("col-lg-8");
            profileManagerBox.classList.add("col-lg-12");
            problemsOrQuestionsBox.classList.remove("col-lg-4");
            problemsOrQuestionsBox.classList.remove("order-lg-2");
            problemsOrQuestionsBox.querySelector("button").classList.remove("float-lg-end");
            footnote.appendChild(problemsOrQuestionsBox);
            if (helpCousinsBox && footnote.contains(helpCousinsBox)) {
                helpCousinsParent = helpCousinsBox.parentNode;
                helpCousinsNext = helpCousinsBox.nextSibling;
                helpCousinsParent.removeChild(helpCousinsBox);
                footnote.querySelector("button").parentNode.appendChild(helpCousinsBox);
            } else {
                helpCousinsParent = helpCousinsNext = null;
            }
            return true;
        },
        deactivate: () => {
            footnoteParent.insertBefore(footnote, footnoteNext);
            footnote.classList.remove("mb-3");
            biography.classList.remove("mt-0");
            row.insertBefore(problemsOrQuestionsBox, profileManagerBox);
            profileManagerBox.classList.remove("col-lg-12");
            profileManagerBox.classList.add("col-lg-8");
            problemsOrQuestionsBox.classList.add("col-lg-4");
            problemsOrQuestionsBox.classList.add("order-lg-2");
            problemsOrQuestionsBox.querySelector("button").classList.add("float-lg-end");
            problemsOrQuestionsParent.insertBefore(problemsOrQuestionsBox, problemsOrQuestionsNext);
            if (helpCousinsParent) {
                helpCousinsParent.insertBefore(helpCousinsBox, helpCousinsNextSibling);
            }
        },
    };
    return o;
})();
