document.addEventListener('DOMContentLoaded', function(){
    const shopLinks = document.querySelectorAll('.shop-lnks');
    const shopFilterLinks = document.querySelectorAll('.shop-lnks'); // filter buttons
    const ProductCards = document.querySelectorAll('.blog-card-content2');  // All product cards


    // Function to remove 'active-shop-lnk' from all filter links
    function removeActiveClass(){
        shopLinks.forEach(link => {
            link.classList.remove('active-shop-lnk');
        });
    }

    shopLinks.forEach(link => {
        link.addEventListener('click', function(event){
            if(this.getAttribute('href') === '#'){
                event.preventDefault();
            }

            removeActiveClass();
            this.classList.add('active-shop-lnk');
        });
    });

    // Set the "All" button as active and show all products on page load
    const allLnk = document.querySelector('.shop-lnks[data-category="All"]');

    if(allLnk){
        allLnk.classList.add('active-shop-lnk');
    } else{
        //If "All" link isn't found, activate the first filter and show its products
        if(shopLinks.length > 0){
            shopLinks[0].classList.add('active-shop-lnk');
        }
    }


    function removeActiveClass(){
        shopFilterLinks.forEach(link => {
            link.classList.remove('active-shop-lnk');
        });
    }


    // Function to filter products based on category
    function filterProducts(category){
        ProductCards.forEach(card => {
            // Get the data-category from the product card
            const cardCategory = card.dataset.category; 


            if(category === 'All' || cardCategory === category){
                // Show the card
                card.style.display = 'grid';
            } else{
                // Hide the card
                card.style.display = 'none';
            }
        });
    }



    // Add click event listener to each shop filter link
    shopFilterLinks.forEach(link => {
        link.addEventListener('click', function(event){
            // Prevent default link behavior
            event.preventDefault();

            removeActiveClass();  // Remove active class from all filter links
            this.classList.add('active-shop-lnk'); // Add active class to the clicked one

            // Get the data-category from the clicked filter button
            const selectedCategory = this.dataset.category;
            // call the filter button
            filterProducts(selectedCategory); 
        });
    }); 
});