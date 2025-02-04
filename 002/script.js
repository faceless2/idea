/**
 * Move the "Profile Manager" box to the right column
 *
 * This does some restyling of the profile manager box too, to make it fit.
 * If this suggestion was adopted that restyling could certainly be done in a simpler way
 */
communityIdeas[communityIdeas.length] = (() => {
    const baseurl = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf("/"));
    let footnote, footnoteParent, footnoteNext, rightcolumn;
    let row, problemsOrQuestionsBox, profileManagerBox, timestampBox, accessedBox, timestampValue, helpCousinsBox, biography;

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
                problemsOrQuestionsBox = row.querySelector("div.col-lg-4:nth-child(1)");
                profileManagerBox = row.querySelector("div.col-lg-8:nth-child(2)");
                timestampBox = footnote.querySelector("p:nth-child(2)");
                timestampValue = timestampBox.innerHTML;
                accessedBox = footnote.querySelector("p:nth-child(3)");
                helpCousinsBox = accessedBox.querySelector("div");      // moved as part of feature 000
                return row && problemsOrQuestionsBox && profileManagerBox && timestampBox && accessedBox && biography;
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
            if (helpCousinsBox) {
                helpCousinsBox.classList.remove("float-lg-end");
            }
            footnote.appendChild(problemsOrQuestionsBox);
            // If the the timestamp text can be split into two lines, do so
            let v = timestampValue.split(/\|/);
            if (v.length == 2) {
                timestampBox.innerHTML = "<div>" + v[0].trim() + "</div><div>" + v[1].trim() + "</div>";
            }
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
            timestampBox.innerHTML = timestampValue;
            if (helpCousinsBox) {
                accessedBox.appendChild(helpCousinsBox);
                helpCousinsBox.classList.add("float-lg-end");
            }
        },
    };
    return o;
})();
