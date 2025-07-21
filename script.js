// https://preview--stark-style-canvas.lovable.app/
document.addEventListener('DOMContentLoaded', function(){
    const menuCon = document.querySelector('.menuCon');
    const navCon = document.querySelector('.navLnks');
    const lnk = document.querySelectorAll('.lnk');
    

    

    menuCon.addEventListener('click', function(){
        navCon.classList.toggle('open');
        menuCon.classList.toggle('open');
    });

    lnk.forEach(lnk => {
        lnk.addEventListener('click', function(){
            menuCon.classList.toggle('open');
        });
    })

    
});