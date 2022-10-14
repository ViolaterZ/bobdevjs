document.addEventListener('keydown', (e) => {
    console.log(e.key);
    if (e.key === 'F2') {
        if (document.querySelector('.bob_window')) return;

        document.body.insertAdjacentHTML(
            'afterbegin',
            `
            <div class="bob_window">
            <div class="bob_nav">
            <img src="https://cdn.jsdelivr.net/gh/violaterz/bobdevjs/penguin.png" alt="" class="bob_logo">
            <p class="bob_title">BOBS HIDEOUT</p>
            
            <button class="bob_close"><i class="fa-sharp fa-solid fa-xmark"></i></button>
            
            </div>
            <div class="bob_body">
            <h1 class="bob_body-heading"><i class="fa-solid fa-grid-horizontal"></i> Elements</h1>
            </div>
            </div>
            `
        );

        const bob_window = document.querySelector('.bob_window');
        const bob_nav = document.querySelector('.bob_nav');
        const bob_close = document.querySelector('.bob_close');
        const bob_body = document.querySelector('.bob_body');

        //#####################################################################################//
        const font_awesome_script = document.createElement('script');
        font_awesome_script.src =
            'https://cdn.jsdelivr.net/gh/ViolaterZ/fontawesome/pro.js';
        font_awesome_script.crossOrigin = 'anonymous';
        document.body.append(font_awesome_script);
        //#####################################################################################//

        function initializeDrag() {
            let pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0;
            function dragMouseDown(e) {
                e = e || window.event;
                //   e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                //   e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                bob_window.style.top = bob_window.offsetTop - pos2 + 'px';
                bob_window.style.left = bob_window.offsetLeft - pos1 + 'px';
            }

            function closeDragElement() {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;
            }

            if (bob_nav) {
                // if present, the header is where you move the DIV from:
                bob_nav.onmousedown = dragMouseDown;
            }
        }

        initializeDrag();

        const elementslist_collection = document.body.getElementsByTagName('*');
        const elementslist = [...elementslist_collection];

        elementslist.forEach((element) => {
            if (element.className.includes('bob')) return;
            if (element.tagName === 'SCRIPT') return;
            if (element.tagName === 'I') return;

            const el_style = window.getComputedStyle(element);

            const element_item = document.createElement('p');
            element_item.className = 'bob_element';

            let tagName = element.tagName;

            if (element.tagName === 'DIV')
                tagName = '<i class="fa-solid fa-square"></i>';
            else if (element.tagName === 'IMG')
                tagName = '<i class="fa-solid fa-image"></i>';
            else if (element.tagName === 'H1')
                tagName = '<i class="fa-solid fa-heading"></i>';
            else if (element.tagName === 'H2')
                tagName = '<i class="fa-solid fa-heading"></i>';
            else if (element.tagName === 'H3')
                tagName = '<i class="fa-solid fa-heading"></i>';
            else if (element.tagName === 'H4')
                tagName = '<i class="fa-solid fa-heading"></i>';
            else if (element.tagName === 'H5')
                tagName = '<i class="fa-solid fa-heading"></i>';
            else if (element.tagName === 'H6')
                tagName = '<i class="fa-solid fa-heading"></i>';
            else if (element.tagName === 'P')
                tagName = '<i class="fa-solid fa-paragraph"></i>';
            else if (element.tagName === 'NAV')
                tagName = '<i class="fa-solid fa-bars"></i>';
            else tagName = '<i class="fa-solid fa-code"></i>';

            element_item.innerHTML = `<span class="bob_element-tag" title="<${element.tagName.toLowerCase()}>">${tagName}</span><span class="bob_element-desc">classes:</span>${
                element.className ? element.classList[0] : 'No Class'
            }<span class="bob_element-desc">id:</span>${
                element.id ? element.id : 'No ID'
            }`;

            bob_body.appendChild(element_item);

            let capturedStyling = element.getAttribute('style');

            element_item.addEventListener('mouseover', () => {
                element.style =
                    'background: rgb(99, 180, 255); color: white; opacity: 1; transition: 200ms;';
            });

            element_item.addEventListener('mouseleave', () => {
                element.style = capturedStyling + '; transition: 200ms;';
            });

            element_item.addEventListener('contextmenu', (e) => {
                e.preventDefault();

                const confirmDeletion = prompt(
                    `Are you sure you want to remove <${element.tagName} class="${element.className}" id="${element.id}" />? (Y/N)`
                );

                if (confirmDeletion.toLowerCase() === `n`) return;

                element_item.remove();
                element.remove();
            });

            element_item.addEventListener('click', () => {
                document.body.insertAdjacentHTML(
                    'afterbegin',
                    `<div class="bob_styles">
        <h1 class="bob_styles-heading">Computed Styling</h1>
    </div>`
                );

                for (const style of el_style) {
                    document
                        .querySelector('.bob_styles')
                        .insertAdjacentHTML(
                            'beforeend',
                            `<p>${style} - <span class="bob_styles-value">${el_style[style]}</p>`
                        );
                }

                if (document.querySelector('.bob_styles')) {
                    document.addEventListener('keydown', (e) => {
                        if (e.key === 'Escape')
                            document.querySelector('.bob_styles').remove();
                    });
                }
            });

            bob_close.addEventListener('click', () => {
                bob_window.remove();
            })
        });

        bob_body.insertAdjacentHTML('beforeend', `<hr>`);
        bob_body.insertAdjacentHTML(
            'beforeend',
            `<p class="bob_body-about"><i class="fa-solid fa-copyright"></i> Xenon Pvt Ltd 2022 〡 🐧 BOBdevJS v1.0 BETA</p>`
        );
    }
});
