function resize() {
    document.querySelector('#banner').style.height = window.innerHeight + 'px'
    document.querySelector('#bannerimage').style.height = (window.innerHeight - 55) + 'px'
    document.querySelector('#bannerimage img').style.height = (window.innerHeight - 55) + 'px'

}
window.onresize = e => { resize() }
resize()

setInterval(e => {
    if (window.scrollY > (window.innerHeight / 3)) {
        document.querySelector('header div').style.background = '#000'
    }
    else {
        document.querySelector('header div').style.background = 'none'
    }
}, 200)

let isNavVisible = false
toggleNav()

document.querySelector('#menu').addEventListener('click', e => {
    isNavVisible = !isNavVisible
    toggleNav()
})

function toggleNav() {
    if (isNavVisible) {
        document.querySelector('nav').style.right = 0
    }
    else {
        document.querySelector('nav').style.right = '-100%'
    }
}

function quitNav() {
    isNavVisible = false
    toggleNav()
}
for (let i of document.querySelectorAll('main, footer')) {
    i.onclick = e => {
        quitNav()
    }
}



fetch('https://api.github.com/users/shpog/repos')
    .then(r => r.json())
    .then(r => {
        let e = document.querySelector('#git-projects')
        e.innerHTML = ''
        for (let i of r) {
						if(i.name != 'shpog'){
            fetch(i.languages_url)
                .then(_langs => _langs.json())
                .then(_langs => {
                    let langs = ''
                    for (let i in _langs) {
                        langs += '<span class="langs">' + i + '</span>'
                    }




                    let hp = ''
                    if (i.homepage) {
                        hp = i.homepage
                    }

                    e.innerHTML +=
                        `
<div>
<div>

<h3><a href="${(hp) ? hp : i.html_url}" target="_blank">${(i.fork) ? '<span class="fork">Forked project</span>' : ''} ${i.name}</a></h3>
<p>${(i.description) ? i.description : 'No description provided'}</p>
<p>${langs}</p>
<p>
    
    <a class="project-links" href="${i.html_url}"  target="_blank"><i class="fa-brands fa-github"></i></a>
    ${(hp) ? '<a class="project-links" href="' + hp + '" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>' : ''}
</p>
</div>
</div>
`
                })
						}
        }
    })
