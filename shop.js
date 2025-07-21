document.addEventListener('DOMContentLoaded', function(){
    const shopLinks = document.querySelectorAll('.shop-lnks');
    const shopFilterLinks = document.querySelectorAll('.shop-lnks'); // filter buttons
    const ProductCards = document.querySelectorAll('.image-card');  // All product cards


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







    const productCards = document.querySelectorAll('.image-card'); // All your product cards
    const productModal = document.getElementById('product-detail-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');

    // Elements inside the modal to update
    const modalMainImage = document.getElementById('modal-main-image');
    const modalProductTitle = document.getElementById('modal-product-title');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalProductDescription = document.getElementById('modal-product-description');
    const thumbnailImagesContainer = productModal.querySelector('.thumbnail-images');
    const sizeOptionsContainer = productModal.querySelector('.size-options');
    const quantityInput = productModal.querySelector('.quantity-input');
    const decreaseQtyBtn = productModal.querySelector('.decrease-qty');
    const increaseQtyBtn = productModal.querySelector('.increase-qty');
    const modalProductDetailsList = document.getElementById('modal-product-details-list');

    // --- Product Data (Example - you'll expand this with your actual product data) ---
    // In a real application, this data would often come from a backend API or a structured JSON file.
    // For this example, we'll embed it directly in JS.
    const productsData = {
        "essential-white-tee": {
            title: "Essential White Tee",
            price: "$45",
            description: "A timeless essential crafted from premium organic cotton. This versatile piece features a relaxed fit and clean lines that embody our minimalist aesthetic. Perfect for layering or wearing on its own.",
            images: [
                "img/img1.jpg", // Main image
                "img/img1-thumb1.jpg", // Thumbnail 1
                "img/img1-thumb2.jpg"  // Thumbnail 2
                // Add more thumbnail paths as needed
            ],
            sizes: ["XS", "S", "M", "L", "XL"],
            details: [
                "100% Organic Cotton",
                "Relaxed Fit",
                "Pre-shrunk",
                "Machine Washable",
                "Made in Portugal"
            ]
        },
        "Cool Sking Hoodie": {
            title: "Cool Sking Hoodie",
            price: "$85",
            description: "A crisp and stylish shirt, perfect for both casual and formal occasions. Made with a durable cotton blend and a modern fit.",
            images: [
                "img/img2.png", // Main image
                "img/img2-thumb1.jpg",
                "img/img2-thumb2.jpg"
            ],
            sizes: ["S", "M", "L", "XL"],
            details: [
                "60% Cotton, 40% Polyester",
                "Regular Fit",
                "Button-down collar",
                "Machine Washable"
            ]
        },
        // Add more product objects here, matching the data-product-id you use in HTML
        "Aura-Luxe-jacket": {
            title: "Aura Luxe Jacket",
            price: "$150",
            description: "A sleek, weather-resistant jacket designed for ultimate comfort and minimalist style. Perfect for layering in any season.",
            images: [
                "img/img3.jpg",
                "img/img3-thumb1.jpg",
                "img/img3-thumb2.jpg"
            ],
            sizes: ["S", "M", "L", "XL"],
            details: [
                "Water-resistant Nylon",
                "Breathable Lining",
                "Zippered Pockets",
                "Made in USA"
            ]
        },
        "tailored-trousers": {
            title: "Tailored Trousers",
            price: "$120",
            description: "Elegant and comfortable trousers with a modern tailored fit, suitable for both office and casual wear. Crafted from stretch fabric.",
            images: [
                "img/img4.jpg",
                "img/img4-thumb1.jpg",
                "img/img4-thumb2.jpg"
            ],
            sizes: ["28", "30", "32", "34", "36"], // Example sizes for bottoms
            details: [
                "95% Polyester, 5% Spandex",
                "Slim Fit",
                "Machine Washable",
                "Designed in France"
            ]
        }
    };

    // --- Event Listeners for Opening Modal ---
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            // Get the product ID from a data attribute on the clicked card
            // You'll need to add data-product-id="essential-white-tee" to your HTML image-card divs
            const productId = this.dataset.productId;
            const product = productsData[productId];

            if (product) {
                // Populate the modal with product data
                modalMainImage.src = product.images[0]; // Set first image as main
                modalMainImage.alt = product.title;
                modalProductTitle.textContent = product.title;
                modalProductPrice.textContent = product.price;
                modalProductDescription.textContent = product.description;

                // Populate thumbnails
                thumbnailImagesContainer.innerHTML = ''; // Clear previous thumbnails
                product.images.forEach((imgPath, index) => {
                    const thumbImg = document.createElement('img');
                    thumbImg.src = imgPath;
                    thumbImg.alt = `${product.title} Thumbnail ${index + 1}`;
                    thumbImg.classList.add('thumbnail');
                    if (index === 0) {
                        thumbImg.classList.add('active-thumbnail'); // First thumbnail is active
                    }
                    thumbImg.addEventListener('click', function() {
                        modalMainImage.src = this.src; // Change main image to clicked thumbnail
                        // Remove active class from all thumbnails and add to clicked one
                        thumbnailImagesContainer.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active-thumbnail'));
                        this.classList.add('active-thumbnail');
                    });
                    thumbnailImagesContainer.appendChild(thumbImg);
                });

                // Populate sizes
                sizeOptionsContainer.innerHTML = ''; // Clear previous sizes
                product.sizes.forEach((size, index) => {
                    const sizeSpan = document.createElement('span');
                    sizeSpan.classList.add('size-option');
                    sizeSpan.dataset.size = size;
                    sizeSpan.textContent = size;
                    if (index === 0) { // Set first size as active by default
                        sizeSpan.classList.add('active-size');
                    }
                    sizeSpan.addEventListener('click', function() {
                        sizeOptionsContainer.querySelectorAll('.size-option').forEach(s => s.classList.remove('active-size'));
                        this.classList.add('active-size');
                        // You might want to store the selected size here
                    });
                    sizeOptionsContainer.appendChild(sizeSpan);
                });

                // Populate details list
                modalProductDetailsList.innerHTML = ''; // Clear previous details
                product.details.forEach(detail => {
                    const li = document.createElement('li');
                    li.textContent = detail;
                    modalProductDetailsList.appendChild(li);
                });

                // Reset quantity to 1
                quantityInput.value = 1;

                // Show the modal
                productModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // --- Event Listener for Closing Modal ---
    modalCloseBtn.addEventListener('click', function() {
        productModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore background scrolling
    });

    // --- Quantity Control ---
    decreaseQtyBtn.addEventListener('click', function() {
        let currentQty = parseInt(quantityInput.value);
        if (currentQty > parseInt(quantityInput.min)) {
            quantityInput.value = currentQty - 1;
        }
    });

    increaseQtyBtn.addEventListener('click', function() {
        let currentQty = parseInt(quantityInput.value);
        quantityInput.value = currentQty + 1;
    });

    // Optional: Add event listener for Add to Cart button
    const addToCartBtn = productModal.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', function() {
        const selectedSize = productModal.querySelector('.size-option.active-size')?.dataset.size;
        const quantity = quantityInput.value;
        const productId = productModal.querySelector('#modal-product-title').textContent.toLowerCase().replace(/ /g, '-'); // Get product ID from title for demo
        alert(`Added ${quantity} of ${productId} (Size: ${selectedSize}) to cart!`);
        // In a real app, you would add logic to push this to a cart array/object
    });

});