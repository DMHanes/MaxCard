document.addEventListener('DOMContentLoaded', () => {
    // Function to show the specified page
    function showPage(pageId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
            if (section.id === pageId) {
                section.classList.add('active');
            }
        });
    }

    document.getElementById('checklist-form').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
    
        // Hide all sections initially
        document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    
        // Get all checkboxes
        const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');


    // Handle navigation buttons
    document.querySelectorAll('.icon-button').forEach(button => {
        button.addEventListener('click', () => {
            const pageId = button.getAttribute('data-page');
            showPage(pageId);
        });
    });

});

// Function to update the ranked list based on selected checkboxes
function updateRanking() {
    const rankingArray = [
        'Item 5', 'Item 2', 'Item 8', 'Item 1', 'Item 3', 
        'Item 10', 'Item 4', 'Item 9', 'Item 6', 'Item 7'
    ];

    // Get all checkboxes
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    const selectedItems = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Rank selected items based on rankingArray
    const rankedItems = selectedItems
        .sort((a, b) => rankingArray.indexOf(a) - rankingArray.indexOf(b));

    // Update the ranked results section
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = ''; // Clear previous results

    if (rankedItems.length === 0) {
        rankingList.innerHTML = '<li>No items selected</li>';
    } else {
        rankedItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            rankingList.appendChild(listItem);
        });
    }
}





//Take Data from CSV
document.addEventListener('DOMContentLoaded', () => {
    // CSV data
    const csvData = `Chase Freedom Unlimited®,Wells Fargo Active Cash® Card,Capital One Venture Rewards Credit Card,Blue Cash Preferred® Card from American Express,Capital One SavorOne Cash Rewards Credit Card,Chase Sapphire Preferred® Card,U.S. Bank Visa® Platinum Card,Wells Fargo Reflect® Card,Discover it® Cash Back,Darb Card
    7623,1.89% cashback,4.63% cashback,1x points,2x points,4.47% cashback,3x points,1.47% cashback,1x points,5x points,1.44% cashback
    8931,4.87% cashback,1.17% cashback,1x points,5x points,4.67% cashback,5x points,4x points,4x points,2.53% cashback,4.81% cashback`;

    // Function to parse the CSV data
    function parseCSV(data) {
        const lines = data.trim().split('\n');
        const headers = lines[0].split(',').map(header => header.trim());

        const results = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(value => value.trim());
            const mccCode = values[0];
            if (/^\d{4}$/.test(mccCode)) { // Check if the MCC code is a 4-digit number
                const benefits = values.slice(1);
                results.push({ mccCode, benefits });
            }
        }
        return { headers, results };
    }

    const { headers, results } = parseCSV(csvData);
    const inputField = document.getElementById('mcc-code-input');
    const searchButton = document.getElementById('submit');

    searchButton.addEventListener('click', () => {
        const mccCode = inputField.value.trim();
        const result = results.find(item => item.mccCode === mccCode);

        if (result) {
            // Convert result to a query string format
            const resultParams = result.benefits
                .map((benefit, index) => `${encodeURIComponent(headers[index])}=${encodeURIComponent(benefit)}`)
                .join('&');
            
            // Redirect to functional.html with MCC code and result parameters
            window.location.href = `functional.html?MCC_Code=${mccCode}&${resultParams}`;
        } else {
            alert(`No results found for MCC Code ${mccCode}`);
        }
    });
});


//FUNCTIONAL//////////////////////////////////////////////////////////////////////////
 

document.addEventListener('DOMContentLoaded', () => {
    // Hardcoded card data
    const cardData = {
        "Chase Freedom Unlimited": ["1.89% cashback", "1.17% cashback"],
        "Wells Fargo Active Cash Card": ["4.63% cashback", "1.17% cashback"],
        "Capital One Venture Rewards Credit Card": ["1x points", "1x points"],
        "Blue Cash Preferred Cash from American Express": ["2x points", "5x points"],
        "Capital One SavorOne Cash Rewards Credit Card": ["4.47% cashback", "4.67% cashback"],
        "Chase Sapphire Preferred Card": ["3x points", "5x points"],
        "US Band Visa Platinum Card": ["1.47% cashback", "4x points"],
        "Wells Fargo Reflect Card": ["1x points", "4x points"],
        "Discover It Cash Back": ["5x points", "2.53% cashback"],
        "Darb Card": ["1.44% cashback", "4.81% cashback"]
    };

    // Loop through checkboxes and handle checked ones
    checkboxes.forEach(checkbox => {
        const elementId = checkbox.id;
        const element = document.getElementById(elementId);
        
        if (checkbox.checked) {
            // Show the page (assuming you want to do something with it)
            showPage(elementId);
        } else if (element) {
            // Remove the element if it exists and the checkbox is unchecked
            element.remove();
        }
    });
});

    // Initial call to populate data
    populateCardData();

    // Navigation functionality (if needed)
    document.querySelectorAll('.icon-button').forEach(button => {
        button.addEventListener('click', () => {
            const pageId = button.getAttribute('data-page');
            if (pageId === 'close') {
                window.close();
            } else {
                showPage(pageId); // Implement showPage function if necessary
            }
        });
    });
});

// When submit is pressed, go to functional.html

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('navigate-form').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Define the dimensions for the new popup window
        const width = 400;
        const height = 600;

        // Open functional.html in a new popup window with specific dimensions
        chrome.windows.create({
            url: chrome.runtime.getURL('functional.html'),
            type: 'popup',
            width: width,
            height: height
        });

        window.close();
    });
});

//Return to Main Menu when button is pressed
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('menu_button').addEventListener('click', () => {
        // Define the dimensions for the new popup window
        const width = 400;
        const height = 600;

        // Get the current window ID
        chrome.windows.getCurrent((currentWindow) => {
            // Open popup.html in a new popup window
            chrome.windows.create({
                url: chrome.runtime.getURL('popup.html'),
                type: 'popup',
                width: width,
                height: height
            }, () => {
                // Close the current window
                chrome.windows.remove(currentWindow.id);
            });
        });
    });
});


// Handle close button
const closeButton = document.getElementById('close-popup');
if (closeButton) {
    closeButton.addEventListener('click', () => {
        window.close(); // Close the window if it was opened by window.open()
    });
}
